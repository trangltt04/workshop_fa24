import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";

const app = express();

// Middleware
app.use(cors()); // Cho phép tất cả các nguồn gốc truy cập
app.use(express.json()); // Chuyển đổi body của request thành JSON

app.use("/api", productRouter);
// app.use("/api", authRouter);
app.use("/api", categoryRouter);

// Kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/workshop");

export const viteNodeApp = app;
