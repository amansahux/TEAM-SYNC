import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../apis/chat.api.jsx";
import socket from "../socket/socket.jsx";

export const useChat = (channel = "general") => {
  const queryClient = useQueryClient();
  const [messageInput, setMessageInput] = useState("");

  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages", channel],
    queryFn: () => getMessages(channel),
  });

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

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    socket.emit("message:send", {
      content: messageInput.trim(),
      channel: channel,
    });

    setMessageInput("");
  };

  return {
    isLoading,
    messages,
    isError,
    error,
    messageInput,
    setMessageInput,
    handleSendMessage,
  };
};
