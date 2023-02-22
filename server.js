const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
const userRoute = require("./routes/userRoutes");
const ResumeParser = require("./resume-parser-master/src");
const Resume = require("./resume-parser-master/src/utils/Resume");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const College = require("./models/colleges");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user/", userRoute);

//FOR DEPLOYMENT
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  // for all the requests
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
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
      `./resume-parser-master/files/${req.file.filename}`,
      `./resume-parser-master/files/compiled`
    ) //input file, output dir
      .then((file) => {
        console.log("Yay! " + file);
      })
      .catch((error) => {
        console.log("parseResume failed");
        console.error(error);
      });
  }, 0);
});

//this endpoint will send the latest json file to the score.js file in react and use that file's data
app.get("/result", (req, res) => {
  // Get the list of JSON files in the directory
  const dirPath = path.join(
    __dirname,
    "resume-parser-master",
    "files",
    "compiled"
  );

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"));

  // Sort the list of files by creation time in descending order
  files.sort((a, b) => {
    return (
      fs.statSync(path.join(dirPath, b)).ctimeMs -
      fs.statSync(path.join(dirPath, a)).ctimeMs
    );
  });

  // Get the latest file name
  const latestFile = files[0];

  // Read the JSON data from the latest file
  const jsonData = JSON.parse(
    fs.readFileSync(path.join(dirPath, latestFile), "utf-8")
  );

  // Send the JSON data as the response
  res.send(jsonData);
  console.log(jsonData);
});

//------------COLLEGE DATA----------------------

app.get("/colleges", async (req, res) => {
  try {
    //ONLY FINDING COLLEGES BY NAME
    const colleges = await College.find({}, { _id: 0, name: 1 }).sort({
      name: 1,
    });
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
