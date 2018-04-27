var express = require('express');
var router = express.Router();
var validator = require('validator')
var users = require('../database/model/users')
var md5 = require('md5')
/* GET users listing. */
router.post('/del',(req,res)=>{
    let{id}= req.body;
    users.remove({_id:id},(err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:'false',
                ret:false
            })
            return

        }
        if(data.n == 0){
            res.json({
                data:'无效的id',
                code:400,
                msg:'无效的id',
                ret:false
            })
        }
        else{
            res.json({
                data:'success',
                code:200,
                msg:'success',
                ret:true

            })

        }
    })
})
router.post('/update',(req,res) => {
    let {sex,img,name}=req.body;
    let id=req.session.user._id

    users.update({_id:id},{$set:{sex,img,name}}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })


})

router.get('/get',(req,res)=>{

    let {id,pn} = req.query
    let params = {}
    if(!id){
        params = {}
    }
    else{
        params._id=id;
    }
    users.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data) =>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:'false',
                ret:false
            })
            return
        }
        res.json({
            data,
            code:200,
            msg:'success',
            ret:true
        })
    })
});
router.get('/getOne',(req,res)=>{

    let id = req.session.user._id

    users.find({_id:id}, (err,data) =>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:'false',
                ret:false
            })
            return
        }
        res.json({
            data,
            code:200,
            msg:'success',
            ret:true
        })
    })
});
router.post('/add',(req,res)=>{
    let{idNum,pwd,name,sex,img,type} = req.body;
    if(!idNum||validator.isEmpty(idNum.trim())){
        res.json({
            date:"身份证不合法",
            code:400,
            msg:'身份证不合法',
            ret:false
        })
        return
    }
    else if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            date:"密码不合法",
            code:400,
            msg:'密码不合法',
            ret:false
        })
        return
    }
    else if(!name||validator.isEmpty(name.trim())){
        res.json({
            date:"用户名不合法",
            code:400,
            msg:'用户名不合法',
            ret:false
        })
        return
    }
    else{
        users.findOne({idNum},(err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    msg:err,
                    ret:false
                })
                return
            }
            if(data == null) {
                pwd = pwd
                users.create({idNum, pwd, name,img})
                    , (err, createData) => {
                    res.json({
                        data:'注册成功',
                        code:200,
                        msg:'success',
                        ret:true
                    })
                }
            }
        })
    }
})
router.get("/getBranchUser",(req,res,next)=>{
    let {branchId,page=1,pageSize=10} = req.query;
    users.find({branchId:branchId}).sort({_id:-1}).limit(pageSize).skip((page-1)*pageSize).then(data=>{
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})

module.exports = router;
