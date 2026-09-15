import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMessages, uploadFile } from "../apis/chat.api.jsx";
import socket from "../socket/socket.jsx";
import { CHAT_CHANNELS } from "../constants/chatChannels.js";
import { getDateLabel } from "../utils/chat.utils.js";
import {
  Hash,
  Radio,
  Code2,
  Palette,
  Briefcase,
  Megaphone,
} from "lucide-react";

export const useChat = () => {
  const queryClient = useQueryClient();

  // ─── Channel State ─────────────────────────────────────────────────
  const [activeChannelId, setActiveChannelId] = useState("general");

  const currentChannel = useMemo(
    () => CHAT_CHANNELS.find((c) => c.id === activeChannelId) || CHAT_CHANNELS[0],
    [activeChannelId]
  );

  const isChannelActive = useCallback(
    (channel) => channel.id === activeChannelId,
    [activeChannelId]
  );

  const handleChannelClick = useCallback((channel) => {
    setActiveChannelId(channel.id);
    setIsChannelsOpen(false);
  }, []);

  // ─── UI State ──────────────────────────────────────────────────────
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  // ─── Refs ──────────────────────────────────────────────────────────
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // ─── Voice Recording State ─────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const streamRef = useRef(null);

  // ─── Fetch Messages ────────────────────────────────────────────────
  const {
    isLoading,
    data: messagesData,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages", activeChannelId],
    queryFn: () => getMessages(activeChannelId),
    staleTime: 5 * 60 * 1000,
  });

  // Derive message list from query data
  const messageList = useMemo(() => {
    if (!messagesData) return [];
    if (Array.isArray(messagesData)) return messagesData;
    if (messagesData.messages && Array.isArray(messagesData.messages))
      return messagesData.messages;
    if (messagesData.data && Array.isArray(messagesData.data))
      return messagesData.data;
    return [];
  }, [messagesData]);

  // Derive messages with date separators
  const messagesWithSeparators = useMemo(() => {
    const result = [];
    let lastDateLabel = null;

    messageList.forEach((msg, index) => {
      const dateLabel = getDateLabel(msg.createdAt);
      if (dateLabel && dateLabel !== lastDateLabel) {
        result.push({
          type: "separator",
          key: `sep-${index}-${dateLabel}`,
          label: dateLabel,
        });
        lastDateLabel = dateLabel;
      }
      result.push({
        type: "message",
        key: msg._id || `msg-${index}`,
        data: msg,
      });
    });

    return result;
  }, [messageList]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  // ─── Upload Mutation ───────────────────────────────────────────────
  const uploadFileMutation = useMutation({
    mutationFn: ({ files, channel }) => uploadFile(files, channel),
    onError: (err) => {
      setUploadError(
        err?.message || "Failed to upload files. Please try again."
      );
    },
    onSuccess: () => {
      setUploadError(null);
    },
  });

  const isUploading = uploadFileMutation.isPending;

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setSelectedFiles((prev) => [...prev, ...files]);
    clearUploadError();
    // Reset file input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ─── Voice Recording ──────────────────────────────────────────────

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingDuration(0);
      setAudioBlob(null);

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setUploadError(
        "Microphone access denied. Please allow microphone permissions."
      );
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  }, []);

  const cancelRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioBlob(null);
    setRecordingDuration(0);
    audioChunksRef.current = [];
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const discardRecording = useCallback(() => {
    setAudioBlob(null);
    setRecordingDuration(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ─── Socket ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join:channel", activeChannelId);

    const handleNewMessage = (incomingMessage) => {
      if (incomingMessage.channel && incomingMessage.channel !== activeChannelId) return;

      queryClient.setQueryData(["messages", activeChannelId], (oldData) => {
        if (!oldData) return { messages: [incomingMessage] };
        if (Array.isArray(oldData)) return [...oldData, incomingMessage];
        if (oldData.messages && Array.isArray(oldData.messages)) {
          return { ...oldData, messages: [...oldData.messages, incomingMessage] };
        }
        if (oldData.data && Array.isArray(oldData.data)) {
          return { ...oldData, data: [...oldData.data, incomingMessage] };
        }
        return oldData;
      });
    };

    const handleMessageEdited = (updatedMessage) => {
      if (updatedMessage.channel && updatedMessage.channel !== activeChannelId) return;

      queryClient.setQueryData(["messages", activeChannelId], (oldData) => {
        const updateItem = (item) => (item._id === updatedMessage._id ? { ...item, ...updatedMessage } : item);
        if (!oldData) return oldData;
        if (Array.isArray(oldData)) return oldData.map(updateItem);
        if (oldData.messages && Array.isArray(oldData.messages)) {
          return { ...oldData, messages: oldData.messages.map(updateItem) };
        }
        if (oldData.data && Array.isArray(oldData.data)) {
          return { ...oldData, data: oldData.data.map(updateItem) };
        }
        return oldData;
      });
    };

    const handleMessageDeleted = (payload) => {
      const { messageId, message: updatedMessage } = payload || {};
      queryClient.setQueryData(["messages", activeChannelId], (oldData) => {
        const updateItem = (item) => {
          if (item._id === messageId) {
            if (updatedMessage) {
              return { ...item, ...updatedMessage };
            }
            return {
              ...item,
              isDeleted: true,
              content: "",
              attachments: [],
            };
          }
          return item;
        };

        if (!oldData) return oldData;
        if (Array.isArray(oldData)) return oldData.map(updateItem);
        if (oldData.messages && Array.isArray(oldData.messages)) {
          return { ...oldData, messages: oldData.messages.map(updateItem) };
        }
        if (oldData.data && Array.isArray(oldData.data)) {
          return { ...oldData, data: oldData.data.map(updateItem) };
        }
        return oldData;
      });
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:edited", handleMessageEdited);
    socket.on("message:deleted", handleMessageDeleted);

    return () => {
      socket.emit("leave:channel", activeChannelId);
      socket.off("message:new", handleNewMessage);
      socket.off("message:edited", handleMessageEdited);
      socket.off("message:deleted", handleMessageDeleted);
    };
  }, [queryClient, activeChannelId]);

  // ─── Edit & Delete Message Handlers ────────────────────────────────
  const handleEditMessage = useCallback((messageId, newContent) => {
    if (!messageId || !newContent?.trim()) return;
    socket.emit("message:edit", {
      messageId,
      content: newContent.trim(),
    });
  }, []);

  const handleDeleteMessage = useCallback((messageId) => {
    if (!messageId) return;
    socket.emit("message:delete", messageId);
  }, []);

  // ─── Send Message ─────────────────────────────────────────────────

  const handleSendMessage = async (e, contentOverride) => {
    if (e && e.preventDefault) e.preventDefault();

    const finalContent = (
      contentOverride !== undefined ? contentOverride : newMessage
    ).trim();

    const filesToUpload = [...selectedFiles];
    if (audioBlob) {
      const voiceFile = new File(
        [audioBlob],
        `voice_message_${Date.now()}.webm`,
        { type: "audio/webm" }
      );
      filesToUpload.push(voiceFile);
    }

    if (!finalContent && filesToUpload.length === 0) {
      return;
    }

    try {
      let attachments = [];

      if (filesToUpload.length > 0) {
        const response = await uploadFileMutation.mutateAsync({
          files: filesToUpload,
          channel: activeChannelId,
        });

        attachments = response.files || [];
      }

      socket.emit("message:send", {
        content: finalContent,
        channel: activeChannelId,
        attachments,
      });

      // Reset
      setNewMessage("");
      setSelectedFiles([]);
      setAudioBlob(null);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Send voice recording as a message (no text)
  const sendRecording = useCallback(async () => {
    if (!audioBlob) return;
    await handleSendMessage(null, "");
  }, [audioBlob, handleSendMessage]);

  // ─── Channel Icon ─────────────────────────────────────────────────

  const getChannelIcon = useCallback((id) => {
    switch (id) {
      case "general":
        return Hash;
      case "announcements":
        return Radio;
      case "developers":
        return Code2;
      case "designers":
        return Palette;
      case "managers":
        return Briefcase;
      case "marketers":
        return Megaphone;
      default:
        return Hash;
    }
  }, []);

  const ChannelIcon = useMemo(
    () => getChannelIcon(activeChannelId),
    [activeChannelId, getChannelIcon]
  );

  // ─── Return ────────────────────────────────────────────────────────

  return {
    // Channel
    currentChannel,
    isChannelActive,
    handleChannelClick,
    getChannelIcon,
    ChannelIcon,

    // UI state
    isChannelsOpen,
    setIsChannelsOpen,
    isInfoOpen,
    setIsInfoOpen,
    lightboxImage,
    setLightboxImage,

    // Messages
    isLoading,
    isError,
    error,
    messageList,
    messagesWithSeparators,
    messagesEndRef,

    // Input
    newMessage,
    setNewMessage,
    handleSendMessage,

    // Files
    fileInputRef,
    handleFileSelect,
    selectedFiles,
    removeFile,
    isUploading,
    uploadError,
    clearUploadError,

    // Voice recording
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    discardRecording,
    sendRecording,

    // Edit & Delete
    handleEditMessage,
    handleDeleteMessage,
  };
};
