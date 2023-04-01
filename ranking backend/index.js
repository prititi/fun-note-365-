
const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const { connection, questionModel } = require("./model/questionmodel");


// server connection 

const server = http.createServer(app);
const io = socketio(server);


// const defaultNPS = io.of("/");


io.on("connection",(socket)=>{
    console.log("client connected")

    socket.on("details",async msg=>{
        console.log(msg)
        var data = await questionModel.find({room:msg.room})
            if(data.length!=0)
            {
                console.log('update');
                await questionModel.updateOne({room:msg.room},[ { $set: { "question": msg.question, 'opt1':msg.opt1,'opt2':msg.opt2,opt3:msg.opt3,opt4:msg.opt4,count1:0,count2:0,count3:0,count4:0} } ])
            }else{
                console.log("insert")
                await questionModel.insertMany(msg)
            }
        
    })

    socket.on("voter",async room=>{
        console.log(room);
        socket.join(room);
        var x = await questionModel.find({room});
        io.to(room).emit('data',x)

    })

    socket.on("send",async(res)=>{
        // console.log(res)
        var x = await questionModel.updateMany({room:res.room},res)
        console.log(x)
    })
})


const PORT = 8080;

server.listen(PORT, async ()=>{
    await connection
    console.log("server is running on port"+PORT)
});