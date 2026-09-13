import { useEffect, useState } from "react";
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
  });
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setSelectedFiles(files);
  };

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

  const handleSendMessage = async (e, contentOverride) => {
    if (e && e.preventDefault) e.preventDefault();

    const finalContent = (
      contentOverride !== undefined ? contentOverride : messageInput
    ).trim();

    // Nothing to send
    if (!finalContent && selectedFiles.length === 0) {
      return;
    }

    try {
      let attachments = [];

      // 1️⃣ Files hain → upload first
      if (selectedFiles.length > 0) {
        const response = await uploadFileMutation.mutateAsync({
          files: selectedFiles,
          channel,
        });

        attachments = response.files || [];
      }

      // 2️⃣ Ab message + uploaded files Socket.IO se bhejo
      socket.emit("message:send", {
        content: finalContent,
        channel,
        attachments,
      });

      // 3️⃣ Reset
      setMessageInput("");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
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
  };
};
