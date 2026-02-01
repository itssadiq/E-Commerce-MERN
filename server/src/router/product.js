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

module.exports = {
  productRouter,
};
