import { getMessagesService, deleteMessageService } from "../services/chat.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import AppError from "../utils/AppError.js";
import uploadFile from "../config/storage.js";

export const getMessages = asyncHandler(async (req, res) => {
    const channel = req.query.channel || req.params.channel || "general";
    const { messages } = await getMessagesService(channel);
    res.status(200).json({
        success: true,
        messages,
    });
});

// controllers/upload.controller.js

export const uploadFileController = asyncHandler(async (req, res) => {
    let files = [];
    if (req.files && req.files.length > 0) {
        files = req.files;
    } else if (req.file) {
        files = [req.file];
    }

    if (files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No files provided",
        });
    }

    // Upload files concurrently
    const uploadedFiles = await Promise.all(
        files.map(async (file) => {
            const uploadedFile = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
            });
            
            return {
                url: uploadedFile.url,
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
            };
        })
    );

    return res.status(200).json({
        success: true,
        files: uploadedFiles, // Return array of uploaded files
    });
});

export const deleteMessage = asyncHandler(async (req, res) => {
    const { channel, messageId } = req.params;
    const user = req.user;

    // Find the message first
    const message = await Message.findById(messageId);
    if (!message) {
        return new AppError("Message not found",404);
    }

    // Only the sender or an admin can delete
    const senderId = String(message.sender);
    const currentUserId = String(user._id || user.id);
    const isAdmin = (user.role || "").toLowerCase() === "admin";

    if (senderId !== currentUserId && !isAdmin) {
        return new AppError("You are not authorized to delete this message",403);
    }

    await deleteMessageService(messageId);

    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
        messageId,
        channel,
    });
});