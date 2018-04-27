var mongoose = require('mongoose');
var ZZXXSchema = new mongoose.Schema({
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
module.exports = mongoose.model('ZZXX',ZZXXSchema,'ZZXX')