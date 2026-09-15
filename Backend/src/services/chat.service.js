import { Message } from "../models/message.model.js";

export const getMessagesService = async (channel = "general") => {
    const filter = channel ? { channel } : { channel: "general" };
    const messages = await Message.find(filter)
        .populate("sender", "name email department role avatar")
        .populate("deletedBy", "name email role")
        .sort({ createdAt: -1 })
        .limit(50);

    return { messages: messages.reverse() };
};
export const deleteMessageService = async (id) => {
    const message = await Message.findByIdAndDelete(id);
    return message;
}