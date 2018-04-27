var mongoose = require("mongoose");
var invitation = new mongoose.Schema({
    isParent:{
        type:Number,
        default:0,
        index:true,
    },
    parentId:{
        type:String
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    userAvatar:{
        type:String
    },
    toUserId:{
        type:String
    },
    toUserAvatar:{
        type:String
    },
    content:{
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

},{versionKey:false,timestamp:{createAt:"createTime",updateAt:"updateTime"}})


module.exports = mongoose.model("invitation",invitation)