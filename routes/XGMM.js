var express = require('express');
var router = express.Router();
var validator = require('validator')
var users = require('../database/model/users')
var md5 = require('md5')
router.post('/update',(req,res) =>{
    let{pwd} = req.body
    users.update({_id:id},{$set:{pwd}},(err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:'false',
                ret:false
            })
            return
        }
        {
            res.json({
                data:'成功',
                code:200,
                msg:'成功',
                ret:true
            })
        }
    })
})
module.exports = router;