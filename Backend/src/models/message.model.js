import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
        channel: {
            type: String,
            enum: [
                "general",
                "announcements",
                "designers",
                "developers",
                "marketers",
                "managers",
            ],
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);