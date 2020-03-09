const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  title: String,
  href: String
});

module.exports = mongoose.model("Title", TitleSchema);
