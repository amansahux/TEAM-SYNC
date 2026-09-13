import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMessages, uploadFile } from "../apis/chat.api.jsx";
import socket from "../socket/socket.jsx";
import {
  Hash,
  Radio,
  Code2,
  Palette,
  Briefcase,
  Megaphone,
} from "lucide-react";

export const useChat = (channel = "general") => {
  const queryClient = useQueryClient();
  const [messageInput, setMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const streamRef = useRef(null);

  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages", channel],
    queryFn: () => getMessages(channel),
  });

  const uploadFileMutation = useMutation({
    mutationFn: ({ files, channel }) => uploadFile(files, channel),
    onError: (err) => {
      setUploadError(err?.message || "Failed to upload files. Please try again.");
    },
    onSuccess: () => {
      setUploadError(null);
    },
  });

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setSelectedFiles((prev) => [...prev, ...files]);
    clearUploadError();
  };

  // ─── Voice Recording ───────────────────────────────────────────────

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
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100); // collect data every 100ms
      setIsRecording(true);
      setRecordingDuration(0);
      setAudioBlob(null);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setUploadError("Microphone access denied. Please allow microphone permissions.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  }, []);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
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

  const discardAudioBlob = useCallback(() => {
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

    socket.emit("join:channel", channel);

    const handleNewMessage = (newMessage) => {
      // Only add to cache if the message belongs to this channel
      if (newMessage.channel && newMessage.channel !== channel) return;

      queryClient.setQueryData(["messages", channel], (oldData) => {
        if (!oldData) return { messages: [newMessage] };
        if (Array.isArray(oldData)) return [...oldData, newMessage];
        if (oldData.messages && Array.isArray(oldData.messages)) {
          return { ...oldData, messages: [...oldData.messages, newMessage] };
        }
        if (oldData.data && Array.isArray(oldData.data)) {
          return { ...oldData, data: [...oldData.data, newMessage] };
        }
        return oldData;
      });
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.emit("leave:channel", channel);
      socket.off("message:new", handleNewMessage);
    };
  }, [queryClient, channel]);

  // ─── Send Message ──────────────────────────────────────────────────

  const handleSendMessage = async (e, contentOverride) => {
    if (e && e.preventDefault) e.preventDefault();

    const finalContent = (
      contentOverride !== undefined ? contentOverride : messageInput
    ).trim();

    // Gather all files to upload (selected files + voice blob)
    const filesToUpload = [...selectedFiles];
    if (audioBlob) {
      const voiceFile = new File(
        [audioBlob],
        `voice_message_${Date.now()}.webm`,
        { type: "audio/webm" }
      );
      filesToUpload.push(voiceFile);
    }

    // Nothing to send
    if (!finalContent && filesToUpload.length === 0) {
      return;
    }

    try {
      let attachments = [];

      if (filesToUpload.length > 0) {
        const response = await uploadFileMutation.mutateAsync({
          files: filesToUpload,
          channel,
        });

        attachments = response.files || [];
      }

      socket.emit("message:send", {
        content: finalContent,
        channel,
        attachments,
      });

      // Reset
      setMessageInput("");
      setSelectedFiles([]);
      setAudioBlob(null);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // ─── Channel Icon ──────────────────────────────────────────────────

  const getChannelIcon = (id) => {
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
  };

  return {
    isLoading,
    messages,
    isError,
    error,
    messageInput,
    setMessageInput,
    handleSendMessage,
    getChannelIcon,
    selectedFiles,
    setSelectedFiles,
    handleFileSelect,
    uploadFileMutation,
    uploadError,
    clearUploadError,
    // Voice recording
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    discardAudioBlob,
  };
};
