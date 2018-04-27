var express = require('express');
var router = express.Router();
var users = require('../database/model/users')
var validator =require('validator')
var md5 = require('md5')

router.post("/logout",(req,res)=>{
    req.session.user= null;
    res.json({
        date:"登出成功",
        code:200,
        msg:'登出成功',
        ret:false
    })
    return
})
module.exports =router;