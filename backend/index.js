// index.js or server.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http"; // ⚡ NEW
import { initSocket } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const server = createServer(app); // ⚡ create HTTP server

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

// ⚡ Initialize socket with server
initSocket(server);

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  // connectDB(); // Don't forget your DB
});
