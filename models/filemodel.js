const mongoose = require("mongoose");
//FOR FILEUPLOAD

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    content: { type: Buffer, required: true },
  },
  {
    timestamps: true,
  }
);

const fileModel = mongoose.model("files", fileSchema);

module.exports = fileModel;
