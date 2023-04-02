const express = require("express");
const { EventModel } = require("../Models/adminpol.model");

const eventRouter = express.Router();

eventRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const events = await EventModel.findOne({ _id: id });
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

eventRouter.post("/add", async (req, res) => {
  const { name, startdate, enddate } = req.body;
  const code = Math.floor(100000 + Math.random() * 9000000);
  try {
    const event = new EventModel({ name, startdate, enddate, code });
    await event.save();
    res.send({ msg: "Event added to database" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

eventRouter.get("/", async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = {
  eventRouter
};