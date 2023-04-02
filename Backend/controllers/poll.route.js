const express = require("express");
const { PollsModel } = require("../Models/poll.model");
const { ResponseModel } = require("../Models/response.model");

const pollRouter = express.Router();

pollRouter.get("/:code", async (req, res) => {
  try {
    const polls = await PollsModel.find({ code: req.params.code });
    res.json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
pollRouter.get("/getallpolls", async (req, res) => {
  try {
    const polls = await PollsModel.find();
    res.send(polls);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

pollRouter.get("/response/:code", async (req, res) => {
  try {
    const responses = await ResponseModel.find({ code: req.params.code });
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

pollRouter.post("/add", async (req, res) => {
  try {
    const newPoll = await new PollsModel(req.body).save();
    res.json("Poll created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

pollRouter.post("/response/add", async (req, res) => {
  try {
    const newResponse = await new ResponseModel(req.body).save();
    res.json("Response added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = {
  pollRouter,
};