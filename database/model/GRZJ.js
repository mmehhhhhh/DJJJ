var mongoose = require('mongoose');
var GRZJSchema = new mongoose.Schema({
    pic:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        default:1
    },
    userId:{
        type:String,
        index:true
    },
    MZPYId:{
        type:String,
        index:true
    },
common:[{
        userId:{   //评论人
            type:String
        },
    content:{    //评论内容 0优1良2中3差
            type:Number
    }
}]


},{versionKey:false})
module.exports = mongoose.model('GRZJ',GRZJSchema,'GRZJ')