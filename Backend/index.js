const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const helmet = require("helmet");
const morgan = require('morgan');

const { connection  } = require('./configs/connection');

// const { connection} = require('./configs/connection');

const { loginRouter } = require('./controllers/login');
const { regRouter } = require('./controllers/register');
const {userRouter}=require("./controllers/users");
const {authenticate}=require('./controllers/authenticate');
const { refreshRouter } = require('./controllers/refreshToken');
const socketFunc = require('./controllers/socket')
const { googleOauthRouter } = require('./controllers/oauth.google');
const {quizRouter}=require("./controllers/quizz.Routes")
const { eventRouter } = require('./controllers/adminpol.route');
const { paymentRouter } = require('./controllers/payment');
const { pollRouter } = require("./controllers/poll.route");
const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.use(express.static("./views/public"))
//app.use(morgan('common'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer,{cors:{origin:"*"}})
//middleWares


//routes 
app.use("/quiz",quizRouter);
app.use('/register',regRouter);
app.use("/login",loginRouter);
app.use("/refreshToken",refreshRouter);
app.use("/users",userRouter);
app.use("/events",eventRouter)
app.use("/polls",pollRouter)
//google oAuth routers
app.use("/oauth/google",googleOauthRouter);
app.use('/payment',paymentRouter);


app.get("/",async(req,res)=>{
    try{
    //console.log(req.cookies, "this is authtoken from cookies")
    //res.send(req.body)

     res.render("index.ejs")
    }catch(err){console.log(err)}
})

//socket.io 
socketFunc(io)






let users = [];

function userJoin(id, room) {
  const user = { id, room };
  users.push(user);
//   console.log(users);
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

io.on("connection", (socket) => {
  console.log("Client is Connected");
  socket.on("joinRoom", ({ room }) => {
    const user = userJoin(socket.id, room);
    // console.log(user);

    socket.join(user.room);
  });

  socket.on("response", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", msg);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log("Client Disconnected.");
  });
});





httpServer.listen(process.env.port,async()=>{
    try{
    await connection;
    console.log("connected to remote db")

    }
    catch(err){
        console.log("error | connection",err)
    }
    console.log(`server started @ http://localhost:${process.env.port}`)
})