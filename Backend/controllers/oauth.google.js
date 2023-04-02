const googleOauthRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//import passport from configs
const {passport} = require("../configs/google.oAuth");
const { UserModel } = require("../Models/user.model");

// googleOauthRouter.get("/",(req,res)=>{
//     res.send("google auth here")
// })

//google oauth routes start
googleOauthRouter.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

googleOauthRouter.get( '/callback',
    passport.authenticate( 'google', {

       
        failureRedirect: '/login', //again redirecting to login page
        session:false //we are not using session, if you want to use session you can remove this.
}),
async (req,res)=>{
//console.log(req.user)
let Id ;
let email = req.user.email;
let userExists = await UserModel.findOne({email});
if(userExists){
    //console.log("user exists",userExists)
    Id = userExists._id;
   
}
else{
let newUser = new UserModel(req.user);
let data = await newUser.save();
Id = data._id
}




//create and send auth and refresh token
const  authToken = jwt.sign({ userId: Id }, process.env.normalKey,{ expiresIn: '1h' });
const  refreshToken = jwt.sign({ userId: Id }, process.env.refreshKey,{ expiresIn: "21 days" });
res.cookie('authToken',authToken,{expires:new Date(Date.now()+50000000)})
res.cookie("refreshToken",refreshToken);


//user saved



res.redirect("https://fun-note-365-hiqd.vercel.app/") //redirect to any page
}

);



//google oauth routes end
module.exports={googleOauthRouter}