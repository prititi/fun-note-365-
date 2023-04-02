const quizRouter = require("express").Router();
const { Room, QuizResult } = require("../Models/quizz.models");

quizRouter.post("/createQuiz", async (req, res) => {
  try {
    let quiz = req.body;
    let Roomname = quiz.roomname;
    let roomExists = await Room.findOne({ roomname: Roomname });
    // let roomExists = await Room.find();
    if (roomExists) {
      return res.status(200).send({
        msg: `${Roomname} is already in use Kindly try with some diffrent room name`,
        rooms:roomExists,
        ok: false,
      });
    }
    let quizroom = new Room(quiz);
    let result = await quizroom.save();
    res.status(200).send({
      msg: `Quiz Created Successfully with room named ${quiz.roomname}`,
      roomname:quiz.roomname,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.get("/totalquizes/:Author", async (req, res) => {
  try {
    let Author = req.params.Author;
    let roomExists = await Room.find({ Author });
    if(!roomExists){
     return res.status(200).send({
        msg: `${Author} has not created any quiz rooms yet` ,
        count:0,
        ok: false,
      });
    }
    let roomWord = roomExists.length == 1 ? "room" : "rooms";
    let message = `${Author} has created ${roomExists.length} ${roomWord}`;
    res.status(200).send({
      msg: message,
      count: roomExists.length,
      rooms:roomExists,
      ok: true
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.get("/totalquizes", async (req, res) => {
  try {
    let roomExists = await Room.find();
    if(!roomExists){
     return res.status(200).send({
        msg: `No One Has Created Any Quiz Rooms Yet` ,
        count:0,
        ok: false,
      });
    }
    let roomWord = roomExists.length == 1 ? "Room" : "Rooms";
    let message = `All Users Have Created ${roomExists.length} ${roomWord} Till Now`;
    res.status(200).send({
      msg: message,
      count: roomExists.length,
      rooms:roomExists,
      ok: true
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.get("/startQuiz/:roomname", async (req, res) => {
  try {
    let Roomname = req.params.roomname;
    let roomExists = await Room.findOne({ roomname: Roomname });
    if (!roomExists) {
      return res.status(200).send({
        msg: `${Roomname} Is Invalid Room Name, Kindly Try With Some Diffrent RoomName(CaseSensitive)`,
        ok: false,
      });
    } else {
      res.status(200).send({
        msg: `Starting your quiz in Room Name ${Roomname}`,
        quiz: roomExists,
        ok: true,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.post("/saveParticipent", async (req, res) => {
  try {
    let details = req.body;
    let participent = new QuizResult(details);
    let result = await participent.save();
    res.status(200).send({
      msg: `Participent details saved successfully`,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
    console.log(error.message)
  }
});
quizRouter.get("/getParticipent", async (req, res) => {
  try {
    let allpritcipents = await QuizResult.find();
    res.status(200).send({
      msg: `Details of all participents`,
      participents: allpritcipents,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.get("/getParticipent/:author", async (req, res) => {
  try {
    let Author=req.params.author;
    let allpritcipents = await QuizResult.find({Author});
    res.status(200).send({
      msg: `Details of all participents of Quiz Rooms Created by ${Author}`,
      participents: allpritcipents,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});
quizRouter.delete("/expireQuiz/:roomname", async (req, res) => {
  try {
    let Roomname = req.params.roomname;
    let d = await Room.findOneAndDelete({ roomname: Roomname });
    if(!d){
      return res.status(200).send({
        msg: `Quiz Room Not Found, Please Enter Correct Quiz Room Name (CaseSensitive)`,
        ok: false,
      }); 
    }
    res.status(200).send({
      msg: `Quiz Deleted`,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});

module.exports = { quizRouter };
