import { Message } from "../models/message.model.js";

export const getMessagesService = async () => {
    const messages = await Message.find()
        .populate("sender", "name email")
        .sort({ createdAt: -1 })
        .limit(50);

    return { messages: messages.reverse() }
};