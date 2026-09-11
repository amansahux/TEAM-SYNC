import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false,

  auth: {
    token:,
  },
});

export default socket;