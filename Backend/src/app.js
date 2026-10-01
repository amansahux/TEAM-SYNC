import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import employeeTaskRoutes from "./routes/emplyee.task.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/employee", employeeTaskRoutes);

// Catch-all route to serve the frontend React app
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;