import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDB from "./src/config/database.js"
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    },
});

import { initChatSocket } from "./src/socket/chat.socket.js";

// Initialize chat socket events
initChatSocket(io);


httpServer.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
});

// app.listen(config.PORT, () => {
//     console.log(`Server is running on port ${config.PORT}`)
// })
connectDB()