const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  code: String,
  response: String,
});

const ResponseModel = mongoose.model("response", responseSchema);

module.exports = {
  ResponseModel,
};