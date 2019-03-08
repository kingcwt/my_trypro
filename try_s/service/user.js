const tao = require('../db/tao');
const common = require('../public/common');
const r = common.r;

exports.adminReg = async (req, h) => {
    req.payload.pwd = common.aesEncrypt(req.payload.pwd);
    let result = await tao.User.find({'username': req.payload.username});
    if(!result.length){
        let res=await tao.User.create(req.payload);
        return r('用户创建成功',1)
    }else{
        return r('用户已存在，请选择其他用户名',0)
    }
};


exports.adminLog = async (req, h) => {
    req.payload.pwd = common.aesEncrypt(req.payload.pwd);
    let result = await tao.User.find({'username': req.payload.username});
    if(!result.length){
        let res=await tao.User.create(req.payload);
        return r('用户创建成功',1)
    }else{
        return r('用户已存在，请选择其他用户名',0)
    }
};