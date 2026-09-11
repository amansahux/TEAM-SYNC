import { useEffect } from "react";
import socket from "../../socket/socket";

const Chat = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>Chat Page</div>;
};

export default Chat;
