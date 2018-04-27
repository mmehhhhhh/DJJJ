var mongoose = require('mongoose');
var DYYHDSchema = new mongoose.Schema({
   talk:{
       type:String
   },
    img:{
       type:String
    },
    name:{
       type:String
    },
    talkTime:{
        type:Date,
        default:Date.now()
    },


},{versionKey:false})
module.exports = mongoose.model('DYYHD',DYYHDSchema,'DYYHD')