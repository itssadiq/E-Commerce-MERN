const mongoose = require("mongoose");

const uri = process.env.URI;

const connectDB = async () => {
  await mongoose.connect(uri);
};

module.exports = connectDB;
