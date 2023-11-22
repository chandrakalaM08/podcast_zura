const express = require("express");
const { UserModel } = require("../model/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const secretKey = process.env.secretKey;
// creating and checking for a user
userRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user already exists with the provided email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      res.status(201).send({
        msg: "User already exists, and  Logged in successfully",
        token,
        existingUser,
      });
      return;
    }

    // Create a new user if it doesn't exist
    const newUser = await UserModel.create({ email });

    res.status(201).send({
      msg: "New User Created",
      newUser,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.patch("/update", async (req, res) => {
  try {
    const { newUsername } = req.body;
    const email = req.email;
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the username
    user.username = newUsername;
    await user.save();

    res
      .status(200)
      .json({ message: "Username updated successfully", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { userRouter };
