import { Message } from "../models/message.model.js";

export const getMessagesService = async (channel = "general") => {
    const filter = channel ? { channel } : { channel: "general" };
    const messages = await Message.find(filter)
        .populate("sender", "name email department role avatar")
        .sort({ createdAt: -1 })
        .limit(50);

    return { messages: messages.reverse() };
};