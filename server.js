const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
const userRoute = require("./routes/userRoutes");
const ResumeParser = require("./resume-parser-master/src");
const Resume = require("./resume-parser-master/src/utils/Resume");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user/", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("resume/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "resume/build/index.html"));
  });
}

app.set("view engine", "ejs");

//---------------MULTER UPLOAD SECTION-------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //null(no errors), "destination"
    cb(null, "./resume-parser-master/files/");
  },

  filename: (req, file, cb) => {
    console.log(file);
    //we extend and grab the name of the file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//single means single file, for multiple files we say upload.arrays
//upload.single("Input tag name to be passed in which you are uploading the file")
app.post("/upload", upload.single("File"), (req, res) => {
  res.send("File Uploaded");
  setTimeout(() => {
    ResumeParser.parseResumeFile(
      `./resume-parser-master/files/${req.file.filename}`, `./resume/src/pages/compiled`
      //`./resume-parser-master/files/compiled`
    ) //input file, output dir
      .then((file) => {
        console.log("Yay! " + file);
      })
      .catch((error) => {
        console.log("parseResume failed");
        console.error(error);
      });
  }, 1000);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));