var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
    idNum:{
        type:String
    },
        name:{
            type:String
        },
        pwd:{
            type:String
        },
        img:{
            type:String
        },
        sex: {
            type: Number,
            default: 2
        },
       type:{
           type:String
       },
    branchId:{
        type:String,
        default:"5ad725edc4ba9e51c47734ed"
    },

    branchName:{
        type:String,
        default:"信息工程学院学生流动党支部（北京）"
    }
},{versionKey:false}
)
module.exports = mongoose.model('users',usersSchema,'users')