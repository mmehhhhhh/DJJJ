var mongoose = require("mongoose");
var branch = new mongoose.Schema({
    branchName:{
        type:String
    }

},{versionKey:false})

module.exports = mongoose.model("branch",branch)