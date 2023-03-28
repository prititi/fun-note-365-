require('dotenv').config();
//to avoid any error due to passport in this method | export passport from here
const passport = require('passport');
//to generate a dummy random password with uuid
const { v4: uuidv4 } = require('uuid');

var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:    process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8500/oauth/google/callback",
  
  },
 function(request, accessToken, refreshToken, profile,cb) {




     //create a new user by using user model 
   
     let email = profile._json.email;
     let password = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
     let profilePic = profile._json.profile
     //check this user is there in our db ,if present send refresh token with his id
     //if not there create a new user  and send new refresh token  with id
     //sample data below | use data from _json
     let userData ={
       name : profile._json.name,
       email:profile._json.email,
       password:uuidv4(),// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
       profilePic : profile._json.picture
     }
     //const user = new UserModel(---);
     // let {id }= user, do other things like this.
    //  console.log("__________________",userData)
     //save this user 
     //then you can do whatever you want
     //you can create auth and refresh token and send it to user so that he can use it .
     // with dummy password.
   





       return cb(null, userData); // you will get this data in req.user in route
   
    //console.log(profile)
  }
 
));



module.exports={passport};

