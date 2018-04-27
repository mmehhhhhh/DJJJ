var express = require('express');
var router = express.Router();
var TSHD = require('../database/model/TSHD')

router.post('/add',(req, res) => {
    let{contentText,content,img,title} =req.body
    TSHD.create({contentText,content,img,title},(err,backdata) =>
    {
        if (err) {
            res.json({
                data: err,
                code: 500,
                msg: '数据插入失败',
                ret: false
            })
            return
        }
        res.json({
            data: 'success',
            code: 200,
            msg: 'success',
            ret: true
        })
    })
})
router.post('/update',(req,res) =>{
    let{id,contentText,content,img,title} = req.body
    TSHD.update({_id:id},{$set:{contentText,content,img,title,updateTime:new Date()}},(err,data)=>{
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
        else {
            res.json({
                data:'成功',
                code:200,
                msg:'成功',
                ret:true
            })
        }
    })
})
router.post('/del',(req,res)=>{
    let{id}= req.body;
    TSHD.remove({_id:id},(err,data)=>{
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
router.get('/get',(req,res)=>{
    let {id,pn} = req.query
    let params = {}

    if(!id){
        params = {}
    }
    else{
        params._id=id;
    }
    TSHD.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data) =>{
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
})
module.exports =router;