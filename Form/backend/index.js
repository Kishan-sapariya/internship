import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
