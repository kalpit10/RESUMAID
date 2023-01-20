const express = require("express");
const upload = require("express-fileupload");

const app = express();

app.use(upload());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  if (req.files) {
    console.log(req.files);
    let file = req.files.file;
    //for getting the file name in console folder
    let fileName = file.name;
    console.log(fileName);
    //for moving files to upload folder
    file.mv("./uploads/"+fileName, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
      }
    });
  }
});

app.listen(8000, function (req, res) {
  console.log("Server Started!");
});
