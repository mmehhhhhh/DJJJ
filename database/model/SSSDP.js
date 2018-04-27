var mongoose = require('mongoose');
var SSSDPSchema = new mongoose.Schema({
    contentText:{
        type:String
    },
    content:{
        type:String
    },
    img:{
        type:String
    },
    createTime:{
        type:Date,
        default:Date.now()
    },
    updateTime:{
        type:Date,
        default:Date.now()
    },
    title:{
        type:String
    }
},{versionKey:false})
module.exports = mongoose.model('SSSDP',SSSDPSchema,'SSSDP')