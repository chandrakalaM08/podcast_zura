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

module.exports = { userRouter };
