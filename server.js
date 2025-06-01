import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./backend/lib/db.js";
import userRoutes from "./backend/routes/users.routes.js";
import productRoutes from "./backend/routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  connectDB();
});
