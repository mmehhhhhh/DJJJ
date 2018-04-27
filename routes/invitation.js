var express = require('express');
var router = express.Router();
var invitation = require("../database/model/invitation")
router.post("/add",(req,res,next)=>{
    let{content} = req.body;
    let userId = req.session.user._id;
    let userName = req.session.user.name;
    let userAvatar = req.session.user.img;
    invitation.create({
        content,
        userId,
        userName,
        userAvatar
    }).then(data=>{
        res.json({
            data:'success',
            code:200,
            msg:'success'
        })
    }).catch(err=>next(new Error(err)))

})
router.get("/get",(req,res,next)=>{
    let{page=1,pageSize=10,id}=req.query;
if(!id){
    invitation.find({isParent:0}).sort({_id:-1})
        .limit(pageSize).skip((page-1)*pageSize)
        .then(data=>{
            res.json({
                data,
                code:200,
                msg:'success'
            })
        })
}else{
    invitation.findOne({_id:id}).then(data=>{
        res.json({
            data,code:200,
            msg:'success'
        })
    })
}

})

router.post("/reply",(req,res,next)=>{
    let{toUserId,content,parentId} = req.body;
    let userId = req.session.user._id;
    let userName = req.session.user.name;
    let userAvatar = req.session.user.img;
invitation.findOne({$or:[{_id:parentId,userId:toUserId},{parentId,userId:toUserId}]})
    .then(dt => {
        if(dt == null){
            res.json({
                data:'非法参数',
                code:400,
                msg:'非法参数'
            })
        }
        else{

            invitation.create({isParent:1,toUserId,content,parentId,toUserName:dt.userId,toUserAvatar:dt.userAvatar,userId,userAvatar,userName})
                .then(data => {
                    res.json({
                        data:'success',
                        code:200,
                        msg:'帖子回复成功'
                    })
                })
        }
    })

})

router.get("/getReply",(req,res,next)=>{
    let{parentId,pageSize=10,page=1} = req.query;

    invitation.find({parentId})
        .limit(pageSize).
    skip((page-1)*pageSize)
        .then(data=>{
            res.json({
                data,
                code:200,
                msg:'success'

            })
        }

)
})
module.exports = router;