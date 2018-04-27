var express = require('express');
var router = express.Router();
var GRZJ = require('../database/model/GRZJ')

router.post('/add',(req, res) => {
    let{pic,MZPYId} =req.body;

    let userId = req.session.user._id;
// let branchId = req.session.user.branchId;
    GRZJ.findOne({_id:userId},{MZPYId,userId}).then(dt=>{
        if(dt == null){
            console.log(111)
            GRZJ.create({pic,MZPYId,userId,common:[]},(err,data) =>
            {
                if(err){
                    res.json({
                        data:err,
                        code: 400,
                        msg: 'false',
                        ret: false
                    })
                    return
                }
                res.json({
                    data,
                    code: 200,
                    msg: 'success',
                    ret: true
                })

                return
            })
        }
        else {
            res.json({
                data:'false',
                code: 400,
                msg: '不能重复提交',
                ret: false
            })
        }
    })

})
router.get("/get",(req,res,next) => {
    let{MZPYId,branchId,page,pageSize,id}= req.query;

let params = branchId ? {MZPYId,branchId}:{MZPYId};
    if(id){
GRZJ.findOne({_id:id}).then(data=>{//管理员获取个人总结
res.json({
    data,
    code:200,
    msg:"success"
})
})
}
else{
        GRZJ.find(params).sort({_id:-1}).limit(pageSize).skip((page-1)*pageSize).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
    }
})
router.post("/update",(req,res,next)=>{//管理员修改
    let{id,status} = req.body;
    GRZJ.update({_id:id},{$set:{status}}).then(data=>{
        res.json({
            data,code:200,
            msg:"success"
        })
    })
})
//用户获取个人总结
router.get("/getOther",(req,res,next)=>{
    let{MZPYId,otherUserId} = req.query;

    GRZJ.findOne({MZPYId,userId:otherUserId,status:1}).then(data=>{
        if(data == null){
            res.json({
                data:null,
                code:200,
                msg:"该用户没有完善个人总结"
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
router.post("/addGRPL",(req,res,next)=> {
    let {id, status} = req.body;
    let userId = req.session.user._id
    GRZJ.update({_id: id}, {$set: {$push: {common: {userId, status}}}})
        .then(data => {
            res.json({
                data: "评论插入成功",
                code: 200,
                msg: "评论插入成功"
            })
        })
})
module.exports = router;