const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name is required"],
      minLength: [3, "Name should at least be 3 characters"],
      maxLength: [30, "Maxium 30 characters allowed"],
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Password is required"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

AuthSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

AuthSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch;
};

const User = mongoose.model("User", AuthSchema);

module.exports = {
  User,
};
