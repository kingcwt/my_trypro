const common = require('../public/common');
var CryptoJS = require("crypto-js");
const dao = require('../db/tao');
const Boom = require('boom');

exports.validateFunc =async function(request, token, callback){
    var tokens = token.split(":");
    if(tokens.length==2){
        collectionName = dao.User;
    }else if(tokens.length==3){
        collectionName = dao.Admin;
    }else{
        throw Boom.unauthorized('未知错误');
    }
    let user = await collectionName.findOne({"username":tokens[0]});
    if(user){
        var decoded;
        if (user.state===0) {
            throw Boom.unauthorized('账户被冻结');
        }
        //密码验证
        try {
            var password = CryptoJS.AES.decrypt(user.pwd,"AiMaGoo2016!@.").toString(CryptoJS.enc.Utf8);
            var passwordmd5 = CryptoJS.HmacMD5(password,password).toString();
            decoded = CryptoJS.AES.decrypt(tokens[1],passwordmd5).toString(CryptoJS.enc.Utf8).split(':');
            if(decoded.length<3){
                throw Boom.unauthorized('密码错误');
            }
        }catch (e){
            throw Boom.unauthorized('密码错误2');
            return
        }
        //对比访问的接口名是否与token中的接口名相等
        if(decoded[2].replace(/\d+/,'')!== request.url.pathname){
            throw Boom.unauthorized('路径错误');
            return
        }
        //查询之前是否访问过
        let access_record = await dao.AccessRecord.findOne({"guid":decoded[3]});
        if(access_record!=null){
            throw Boom.unauthorized('token失效,重新获取');
        }else{
            dao.AccessRecord.deleteMany({'username':user.username});
            dao.AccessRecord.create({'guid':decoded[3],'username':user.username});
        }
         return {isValid: true,credentials: user};
    }else{
        throw Boom.unauthorized('账号不存在');
    }   
};

exports.getToken = function(request,reply){
    let  admin = "";
    if(request.payload.userOrAdmin == "admin"){
        admin = ":admin"
    }
    let token = "bearer "+request.payload.username+":"+CryptoJS.AES.encrypt(request.payload.url+":"+Date.now(),CryptoJS.HmacMD5(request.payload.pwd,request.payload.pwd).toString())+admin;
    return({"toekn":token});
}