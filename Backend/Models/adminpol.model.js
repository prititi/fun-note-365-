const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: String,
  startdate: Date,
  enddate: Date,
  code: Number,
});

const EventModel = mongoose.model("event", eventSchema);

module.exports = {
  EventModel
};