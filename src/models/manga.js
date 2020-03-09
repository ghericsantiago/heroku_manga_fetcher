const mongoose = require("mongoose");

const MangaSchema = new mongoose.Schema({
  name: String,
  alternative_name: String,
  release_year: String,
  author: String,
  artist: String,
  genre: Array,
  status: String,
  reading_direction: String,
  chapters_count: Number,
  chapters: Array
});

module.exports = mongoose.model("Manga", MangaSchema);
