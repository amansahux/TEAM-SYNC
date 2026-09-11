import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../apis/chat.api.jsx";
export const useChat = () => {
  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
  });
  return { isLoading, messages, isError, error };
};
