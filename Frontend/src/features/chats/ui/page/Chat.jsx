import { useEffect, useState } from "react";
import socket from "../../socket/socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [
        ...prev,
        newMessage,
      ]);
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit("message:send", {
      content: message.trim(),
    });

    setMessage("");
  };

  return (
    <div>
      <h1>Team Chat</h1>

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />

        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;