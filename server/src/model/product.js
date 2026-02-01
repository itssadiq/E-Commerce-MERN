const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Product name is required"],
      trim: true,
      lowercase: true,
      minLength: [5, "Product name must be at least 5 characters"],
      maxLength: [50, "Maximum length is 50 characters"],
    },
    description: {
      type: String,
      require: [true, "Product description is required"],
      trim: true,
      lowercase: true,
      minLength: [20, "Product description must be at least 20 characters"],
      maxLength: [500, "Product description must be at most 500 characters"],
    },
    price: {
      type: Number,
      require: [true, "Product price is required"],
    },
    category: {
      type: String,
      lowercase: true,
      require: [true, "Product category is required"],
      trim: true,
      minLength: [5, "Product name must be at least 5 characters"],
      maxLength: [20, "Maximum length is 30 characters"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageURL: {
      type: String,
      require: [true, "Product image URL is required"],
      validate: {
        validator: (value) => {
          return validator.isURL(value);
        },
      },
    },
  },
  {
    collection: "products",
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);
module.export = {
  Product,
};
