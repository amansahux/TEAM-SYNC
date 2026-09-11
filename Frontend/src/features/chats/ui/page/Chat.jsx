import { useEffect } from "react";
import socket from "../../socket/socket";

const Chat = () => {
  useEffect(() => {
    const res = socket.connect();
    if (res.connected) {
      console.log("Connected to socket", res.id);
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return <div>Chat Page</div>;
};

export default Chat;
