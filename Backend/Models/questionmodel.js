const mongoose = require("mongoose");

const questionModel = mongoose.model("question",{
    room:String,
    question:String,
    opt1:String,
    opt2:String,
    opt3:String,
    opt4:String,
    count1:{type:Number,default:0},
    count2:{type:Number,default:0},
    count3:{type:Number,default:0},
    count4:{type:Number,default:0}
})

module.exports = {questionModel}