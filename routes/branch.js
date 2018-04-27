var express = require('express');
var router = express.Router();
var branch = require('../database/model/branch')
router.post('/add',(req, res) => {
    let{branchName} =req.body
    branch.create({branchName},(err,backdata) =>
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
router.get('/get',(req,res,next)=>{
   branch.find().sort({_id:-1}).then(data=>{
       res.json({
           data,
           code:200,
           msg:"success",
       })
   })

})
module.exports = router;