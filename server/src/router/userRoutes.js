const express = require("express");
const { User } = require("../model/auth"); // Same path as your authRouter

const { SuperAdminMiddleware } = require("../middleware/superAdmin");
const { AuthMiddleware } = require("../middleware/auth");

const userRouter = express.Router();

// 1. Get All Users (Super Admin Only)
userRouter.get(
  "/getAllUsers",
  AuthMiddleware,
  SuperAdminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find({}).select("-password"); // Exclude passwords
      res.status(200).send({ users });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error fetching users", error: error.message });
    }
  },
);

// 2. Delete User (Super Admin Only)
userRouter.delete(
  "/deleteUser/:id",
  AuthMiddleware,
  SuperAdminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Prevent Self-Deletion
      if (req.user._id.toString() === id) {
        throw new Error("You cannot delete your own Super Admin account.");
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error("User not found");
      }

      res.send({ message: "User deleted successfully", user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error deleting user", error: error.message });
    }
  },
);

// 3. Update User Role (Super Admin Only) - e.g. Make someone Admin
userRouter.patch(
  "/updateUser/:id",
  AuthMiddleware,
  SuperAdminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      // We only allow updating roles/names, not passwords here usually
      const { name, email, isAdmin, isSuperAdmin } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { name, email, isAdmin, isSuperAdmin },
        { new: true, runValidators: true },
      ).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      res.send({ message: "User updated successfully", user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error updating user", error: error.message });
    }
  },
);

module.exports = { userRouter };
