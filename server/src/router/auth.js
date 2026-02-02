const express = require("express");
const { validateSignUp, validateLogin } = require("../lib/utils");
const { User } = require("../model/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    validateSignUp(req);

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist with this email");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).send({
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    res.status(400).send({ message: "BAD REQUEST", error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validateLogin(req);

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email or Password");
    }

    const passwordMatch = await user.validatePassword(password);

    if (!passwordMatch) {
      throw new Error("Invalid Email or Password");
    }

    const token = await user.getJwt();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    res
      .status(200)
      .json({ message: "User logged in successfully", data: user });
  } catch (err) {
    res.status(400).send({ message: "BAD REQUEST", error: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now() * 0),
    });

    res.json("Logout Successfully");
  } catch (err) {
    res.status(400).send({ message: "BAD REQUEST", error: err.message });
  }
});

authRouter.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).send("Please login first");
  }

  const { id } = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(id);

  const userInfo = { name: user.name, email: user.email };

  res.send(userInfo);
});

module.exports = {
  authRouter,
};
