import { getMessagesService } from "../services/chat.service.js";
import asyncHandler from "../utils/asyncHandler.js"

export const getMessages = asyncHandler(async (req, res) => {
    const { messages } = await getMessagesService();
    res.status(200).json({
        success: true,
        messages,
    });
})