const mongoose = require("mongoose");
const URL =
  "mongodb+srv://kalpit10:w09dHr55mb1k66EL@cluster0.vi4x2q2.mongodb.net/resumaidDB";

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db connection successfull");
});

connection.on("error", (error) => {
  console.log(error);
});
