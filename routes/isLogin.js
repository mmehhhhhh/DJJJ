var express = require('express');
var router =express.Router();
var session = require('express-session')
var users = require('../database/model/users')

router.get('/isLogin',(req,res,next)=>{
    if(req.session.user==null){
        res.json({
            data:'未登录',
            code:200,
            msg:'未登录',
            ret:false
        })
    }
    else{
        res.json({
            data:req.session.user,
            code:400,
            msg:'已登录',
            ret:true
        })
    }

})

module.exports=router
