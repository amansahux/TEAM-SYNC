import { verifyAccessToken } from "../utils/token.js";
import User from "../models/user.model.js";
import { Message } from "../models/message.model.js";

const parseCookies = (cookieString) => {
    if (!cookieString) return {};
    return cookieString
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
};

export const initChatSocket = (io) => {
    // Middleware for authentication
    io.use(async (socket, next) => {
        try {
            const cookies = parseCookies(socket.request.headers.cookie);
            const token = cookies.accessToken;

            if (!token) {
                return next(new Error("Authentication error: No token provided"));
            }

            const decoded = verifyAccessToken(token);
            const user = await User.findById(decoded.id);

            if (!user) {
                return next(new Error("Authentication error: User not found"));
            }

            // Attach user to socket for later use
            socket.user = user;
            next();
        } catch (error) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id, "User Info:", socket.user.name || socket.user.email);

        socket.on("join:channel", (channel) => {
            if (channel) {
                socket.join(channel);
            }
        });

        socket.on("leave:channel", (channel) => {
            if (channel) {
                socket.leave(channel);
            }
        });

        socket.on("message:send", async (data) => {
            try {
                const channel = data.channel || "general";

                // Announcements channel is restricted: only admins can send messages
                if (channel === "announcements" && socket.user.role !== "admin") {
                    socket.emit("message:error", {
                        message: "Only administrators are allowed to post in announcements.",
                    });
                    return;
                }

                const message = await Message.create({
                    content: data.content,
                    sender: socket.user._id,
                    channel: channel,
                    attachments: data.attachments || [],
                });
                await message.populate("sender", "name email department role avatar");
               io.to(channel).emit("message:new", message);
            } catch (error) {
                console.error("Error creating chat message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
