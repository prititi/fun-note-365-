const mongoose = require("mongoose");

const pollSchema = mongoose.Schema({
  code: String,
  polls: String,
});

const PollsModel = mongoose.model("poll", pollSchema);

module.exports = {
  PollsModel,
};