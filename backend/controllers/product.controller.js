import express from "express";
import Product from "../models/product.model.js";

const router = express.Router();

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
    const { title, description, price, image } = req.body;
    const product = await Product.create({ title, description, price, image });
    res.json(product);
  } catch (error) {
    console.log(error);
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
