import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../apis/chat.api.jsx";
import socket from "../socket/socket.jsx";

export const useChat = () => {
  const queryClient = useQueryClient();
  const [messageInput, setMessageInput] = useState("");

  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
  });

  useEffect(() => {
    socket.connect();

    const handleNewMessage = (newMessage) => {
      queryClient.setQueryData(["messages"], (oldData) => {
        if (!oldData) return [newMessage];
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
      socket.off("message:new", handleNewMessage);
      socket.disconnect();
    };
  }, [queryClient]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    socket.emit("message:send", {
      content: messageInput.trim(),
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
