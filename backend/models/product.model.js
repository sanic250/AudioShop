import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: String,
  price: Number,
  image: String, 
});

export default mongoose.model("Product", productSchema);
