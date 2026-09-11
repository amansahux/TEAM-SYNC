import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDB from "./src/config/database.js"
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: config.CLIENT_URL,
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


httpServer.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
});

// app.listen(config.PORT, () => {
//     console.log(`Server is running on port ${config.PORT}`)
// })
connectDB()