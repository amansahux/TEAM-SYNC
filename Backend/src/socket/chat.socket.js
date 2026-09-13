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
        socket.on("message:delete", async (messageId) => {
            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    socket.emit("message:error", {
                        message: "Message not found",
                    });
                    return;
                }

                const isSender =
                    message.sender.toString() === socket.user._id.toString();

                const isAdmin = socket.user.role === "admin";

                if (!isSender && !isAdmin) {
                    socket.emit("message:error", {
                        message: "You are not allowed to delete this message.",
                    });
                    return;
                }

                message.isDeleted = true;
                message.deletedAt = new Date();
                message.deletedBy = socket.user._id;

                // Remove sensitive content/file references
                message.content = "";
                message.attachments = [];

                await message.save();

                io.to(message.channel).emit("message:deleted", {
                    messageId: message._id,
                    channel: message.channel,
                });

            } catch (error) {
                console.error("Error deleting message:", error);

                socket.emit("message:error", {
                    message: "Failed to delete message.",
                });
            }
        });
        socket.on("message:edit", async ({ messageId, content }) => {
            try {
                if (!messageId || !content?.trim()) {
                    socket.emit("message:error", {
                        message: "Message content cannot be empty.",
                    });
                    return;
                }

                const message = await Message.findById(messageId);

                if (!message) {
                    socket.emit("message:error", {
                        message: "Message not found.",
                    });
                    return;
                }

                // Deleted message cannot be edited
                if (message.isDeleted) {
                    socket.emit("message:error", {
                        message: "Deleted message cannot be edited.",
                    });
                    return;
                }

                const isSender =
                    message.sender.toString() === socket.user._id.toString();

                const isAdmin = socket.user.role === "admin";

                // Only sender or admin
                if (!isSender && !isAdmin) {
                    socket.emit("message:error", {
                        message: "You are not allowed to edit this message.",
                    });
                    return;
                }

                message.content = content.trim();
                message.isEdited = true;
                message.editedAt = new Date();

                await message.save();

                await message.populate(
                    "sender",
                    "name email department role avatar"
                );

                io.to(message.channel).emit("message:edited", message);

            } catch (error) {
                console.error("Error editing message:", error);

                socket.emit("message:error", {
                    message: "Failed to edit message.",
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
