const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connection } = require("./databaseConnection");

const app = express();
const PORT = process.env.PORT;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is up and running!" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database sussessfully.");
  } catch (error) {
    console.log("error :", error);
    res.send({ msg: error.message });
  }
  console.log(`Server running on port ${PORT}`);
});
