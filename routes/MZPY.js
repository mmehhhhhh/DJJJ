var express = require('express');
var router = express.Router();
var users = require('../database/model/users')
var MZPY = require('../database/model/MZPY')
router.post("/add",(req,res,next)=>{
    let{title,content,status}=req.body;
    MZPY.create({content,title,status},(err,backdata) =>
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
router.post("/update",(req,res,next)=>{
    let{status,id} = req.body;
    if(status == 1){
        MZPY.findOne({status:1}).then(dt=>{
            if(dt== null){
                MZPY.update({_id:id},{$set:{status}}).then(data=>{
                    res.json({
                        data:"success",
                        code:200,
                        msg:"sussess"
                    })
                })
            }
            else{
                res.json({
                    data:"当前已经有一个开启的民主评议了",
                    code:400,
                    msg:"当前已经有一个开启的民主评议了"

                })
            }
        })
    }
})



router.get("/getMZPY",(req,res,next)=>{
    console.log(111)
    MZPY.findOne({status:1}).then(data=>{
        if(data == null){
            res.json({
                data:null,
                code:200,
                msg:"当前没有开启的民主评议"
            })
            return
        }
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})


module.exports =router;