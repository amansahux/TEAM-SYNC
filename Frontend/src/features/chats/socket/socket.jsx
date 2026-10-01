import { io } from "socket.io-client";

const socket = io(import.meta.env.DEV ? "http://localhost:3000" : "https://team-sync-live.up.railway.app", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
