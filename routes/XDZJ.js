var express = require('express');
var router = express.Router();
var XDZJ = require('../database/model/XDZJ')

router.post('/add',(req, res) => {
    let{A} =req.body
    XDZJ.create({A},(err,backdata) =>
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