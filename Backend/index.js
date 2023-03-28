const express = require('express');
require("dotenv").config();
var cookieParser = require('cookie-parser')
const helmet = require("helmet");
const morgan = require('morgan');
const { connection ,client } = require('./configs/connection');
const { loginRouter } = require('./controllers/login');
const { regRouter } = require('./controllers/register');
const {userRouter}=require("./controllers/users");
const {authenticate}=require('./controllers/authenticate');
const { refreshRouter } = require('./controllers/refreshToken');
const { application } = require('express');
const { googleOauthRouter } = require('./controllers/oauth.google');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("./views/public"))
app.use(express.json());
//middleWares
//app.use(morgan('common'));
app.use(helmet());
app.use(cookieParser());

//routes 
app.use('/register',regRouter);
app.use("/login",loginRouter);
app.use("/refreshToken",refreshRouter);
app.use("/users",userRouter);
//google oAuth routers
app.use("/oauth/google",googleOauthRouter);



app.get("/",async(req,res)=>{
    try{
    //console.log(req.cookies, "this is authtoken from cookies")
    //res.send(req.body)

     res.render("index.ejs")
    }catch(err){console.log(err)}
})












app.listen(process.env.port,async()=>{
    try{
    await connection;
    console.log("connected to remote db")
    await client.connect();
    console.log("connected to redis")
    }
    catch(err){
        console.log("error | connection ++++++++++",err)
    }
    console.log(`server started @ http://localhost:${process.env.port}`)
})