import { getMessagesService } from "../services/chat.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadFile from "../config/Storage.js";

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