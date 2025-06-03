import express from "express";
import multer from "multer";
import Product from "../models/product.model.js";
import path from "path";

const router = express.Router();
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {

  try {
    const { title, price, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      // Użyj bezpośrednio upload z Cloudinary zamiast upload_stream
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'audio_shop',
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" }
        ]
      });
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      title,
      price,
      description,
      image: imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      title,
      description,
      price,
      image,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export default router;
