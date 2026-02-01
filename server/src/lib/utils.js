const validator = require("validator");

const validateSignUp = (req) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateLogin = (req) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = {
  validateLogin,
  validateSignUp,
};
