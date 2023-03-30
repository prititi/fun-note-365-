const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const helmet = require("helmet");
const morgan = require('morgan');
const { connection ,client } = require('./configs/connection');
const { loginRouter } = require('./controllers/login');
const { regRouter } = require('./controllers/register');
const {userRouter}=require("./controllers/users");
const {authenticate}=require('./controllers/authenticate');
const { refreshRouter } = require('./controllers/refreshToken');
const socketFunc = require('./controllers/socket')
const { googleOauthRouter } = require('./controllers/oauth.google');
const { eventRouter } = require('./controllers/adminpol.route');
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
app.use('/register',regRouter);
app.use("/login",loginRouter);
app.use("/refreshToken",refreshRouter);
app.use("/users",userRouter);
app.use("/events",eventRouter)
//google oAuth routers
app.use("/oauth/google",googleOauthRouter);



app.get("/",async(req,res)=>{
    try{
    //console.log(req.cookies, "this is authtoken from cookies")
    //res.send(req.body)

     res.render("index.ejs")
    }catch(err){console.log(err)}
})

//socket.io 
socketFunc(io)












httpServer.listen(process.env.port,async()=>{
    try{
    await connection;
    console.log("connected to remote db")
    await client.connect();
    console.log("connected to redis")
    }
    catch(err){
        console.log("error | connection",err)
    }
    console.log(`server started @ http://localhost:${process.env.port}`)
})