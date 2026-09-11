import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes)

// Global Error Handler Middleware
app.use(errorHandler);

export default app;