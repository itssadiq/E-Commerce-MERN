const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const cors = require("cors");
const { authRouter } = require("./router/auth");
const { productRouter } = require("./router/product");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(port, () => {
      console.log(`Server is running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
