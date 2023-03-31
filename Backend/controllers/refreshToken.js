const refreshRouter = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cookieParser = require('cookie-parser')
//get
refreshRouter.post("/",async(req,res)=>{
    try {
    
        let incToken = req.headers.refreshtoken;
        //let incToken = req.cookies.refreshToken;
        
        await jwt.verify(incToken, process.env.refreshKey, function(err, decoded) {
        if(err){res.status(401).json({msg:"login please,refresh token expired"})}
        else{
        let userId =decoded.userId;
        //creating new token with this userId;
        const  token = jwt.sign({ userId}, process.env.normalKey,{ expiresIn: '1h' });

        res.cookie('authToken',token,{expires:new Date(Date.now()+50000000)})
        res.send({newToken:token});
        }
        
         });
     

    } catch (error) {console.log("err | refreshrouter | post",err)}
})



module.exports={refreshRouter};