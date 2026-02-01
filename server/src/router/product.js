const express = require("express");
const { Product } = require("../model/product");
const productRouter = express.Router();

productRouter.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.get("/getProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.send(product);
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

module.exports = {
  productRouter,
};
