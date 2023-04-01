const jwt = require("jsonwebtoken");
require('dotenv').config();
const cookieParser = require('cookie-parser');



const authenticate =async (req,res,next)=>{
try {
    
     let incToken = req.headers.authtoken;
     
    //let incToken = req.cookies.authToken;
    


    await jwt.verify(incToken, process.env.normalKey, function(err, decoded) {
     if(err){res.status(401).json(err);}
    else{
        //console.log(decoded);        
        req.body.userId =decoded.userId;
        
        next();
    }

     });
    
} catch (error) {
    console.log("err | authenticate | middleware",error)
}
}

module.exports={authenticate}