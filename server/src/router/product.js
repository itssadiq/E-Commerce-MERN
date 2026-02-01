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

productRouter.post("/addProduct", async (req, res) => {
  try {
    const { name, description, price, category, imageURL } = req.body;

    const product = await Product({
      name,
      description,
      price,
      category,
      imageURL,
    });

    await product.save();

    res.send({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.send({ message: "Product deleted", product });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

module.exports = {
  productRouter,
};
