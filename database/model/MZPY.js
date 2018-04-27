var mongoose = require("mongoose");
var MZPY = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        default:0
    },
    content:{type:String}

},{versionKey:false})
module.exports = mongoose.model("MZPY",MZPY)