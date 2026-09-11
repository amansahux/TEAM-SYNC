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


httpServer.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
});

// app.listen(config.PORT, () => {
//     console.log(`Server is running on port ${config.PORT}`)
// })
connectDB()