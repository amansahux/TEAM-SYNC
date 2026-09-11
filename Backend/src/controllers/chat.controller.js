import { getMessagesService } from "../services/chat.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMessages = asyncHandler(async (req, res) => {
    const channel = req.query.channel || req.params.channel || "general";
    const { messages } = await getMessagesService(channel);
    res.status(200).json({
        success: true,
        messages,
    });
});