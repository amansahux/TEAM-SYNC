export const initChatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        
        socket.on("message:send", (data) => {
            console.log("Message received:", data);
            io.emit("message:new", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
