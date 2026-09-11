import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import chatRoutes from "./routes/chat.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/chat", chatRoutes)

// Global Error Handler Middleware
app.use(errorHandler);

export default app;