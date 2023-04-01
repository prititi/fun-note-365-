const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  b: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },
  d: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
  },
  quiz: [quizSchema],
  Author: { type: String, required: true },
  timeout: { type: Number, required: true },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

const quizResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  correct_ans: {
    type: Number,
    required: true,
  },
  wrong_ans: {
    type: Number,
    required: true,
  },
  total_que: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  quizRoom: {
    type: String,
    required: true,
  },
  Author: { type: String, required: true },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

module.exports = { Room, QuizResult };
