import { Message } from "../models/message.model.js";

export const initChatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("message:send", async (data) => {
            const message = await Message.create({
                content: data.content,
                sender: socket.user._id,
            });
            io.emit("message:new", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
