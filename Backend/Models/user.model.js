const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-type-email');

const userSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:  mongoose.SchemaTypes.Email,required:true},
    password : {type:String,min:10,required:true},
    profilePic:{type:String,default:"https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"} ,
    plan:{
         type:{type: String,enum : ['basic','medium',"advanced"],default: 'basic'},
         payment:{type:Number,default:0},
         limit:{type:Number,default:0}


        }
},{versionKey:false,timestamps:true});

userSchema.pre('save',async function(next){
    if(this.isModified('password') ){
     this.password = await bcrypt.hash(this.password,10);
    
    }
     next();
 });


 const UserModel = mongoose.model("user",userSchema);
 module.exports={UserModel};
