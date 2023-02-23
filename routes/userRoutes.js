const express = require("express");
const csv = require("csv-parser");
const User = require("../models/userModel");
const College = require("../models/colleges");
const FileModel = require("../models/filemodel");
const fs = require("fs");
const app = express.Router();

app.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (result) {
      res.send(result);
    } else {
      res.status(400).json("Login failed");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();

    res.send("Registration Successfull");
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/upload", async (req, res) => {
  console.log(req.files.file);
  //for file
  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath);
  const fileName = req.file.originalname;
  const newFile = new FileModel({ name: fileName, content: fileContent });
  await newFile.save();

  //for purana hisaab
  await req.files.file.mv(`${__dirname}/uploads/${req.files.file.name}`);
  res.send("Uploaded");
});

module.exports = app;
