var express = require('express');
var router = express.Router();
var SXHB = require('../database/model/SXHB')

router.post('/add',(req, res) => {
    let{A} =req.body
    SXHB.create({A},(err,backdata) =>
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
module.exports = router;