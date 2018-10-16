const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvSchema = new Schema({
  term: { type: String, required: true },
});

const TV = mongoose.model("TV", tvSchema);

module.exports = TV;
