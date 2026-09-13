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
         attachments: [
      {
        url: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        type: {
          type: String,
          required: true,
        },

        size: {
          type: Number,
        },
      },
    ],
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);