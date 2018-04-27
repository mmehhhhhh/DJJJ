var express = require('express');
var router = express.Router();
var DYYHD = require('../database/model/DYYHD')
var users = require('../database/model/users')
router.post('/add',(req, res) => {
    let{talk,name,img} =req.body
    DYYHD.create({talk,name,img},(err,backdata) =>
    {
        if (err) {
            req.session.user = data;
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
        return
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
    DYYHD.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data) =>{
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