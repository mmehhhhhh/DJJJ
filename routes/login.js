var express = require('express');
var router = express.Router();
var users = require('../database/model/users')
var validator =require('validator')
var md5 = require('md5')


router.post("/login",(req,res,next)=>{
    let{idNum,pwd} = req.body;
    console.log(idNum)
    if(!idNum||validator.isEmpty(idNum.trim())){
        res.json({
            date:"身份证不合法",
            code:400,
            msg:'身份证不合法',
            ret:false
        })
        return
    }
    else if(!pwd){
        res.json({
            date:"密码不合法",
            code:400,
            msg:'密码不合法',
            ret:false
        })
        return
    }
    else{
        users.findOne({idNum},(err,data)=>{
            if(data == null){
                res.json({
                    date:"身份证不存在",
                    code:400,
                    msg:'身份证不存在',
                    ret:false
                })
                return
            }
            else{
                users.findOne({idNum},(err,data)=>{
                    if(pwd == data.pwd){
                        req.session.user = data;
                        res.json({
                            date:"登陆成功",
                            code:200,
                            msg:'success',
                            ret:true
                        })
                        return
                    }
                    else{
                        res.json({
                            data:'密码不正确',
                            code:400,
                            msg:'false',
                            ret:false
                        })
                    }
                })
            }

            }
        )
    }
})
module.exports =router;