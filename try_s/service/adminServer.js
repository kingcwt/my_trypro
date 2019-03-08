const tao = require('../db/tao');
const common = require('../public/common');
var CryptoJS = require("crypto-js");
const r = common.r;

exports.adminReg = async (req, h) => {
    req.payload.pwd =  CryptoJS.AES.encrypt(req.payload.pwd,"AiMaGoo2016!@.")+"";
    let result = await tao.Admin.find({'username': req.payload.username});
    if(!result.length){
        let res=await tao.Admin.create(req.payload);
        return r('用户创建成功',1)
    }else{
        return r('用户已存在，请选择其他用户名',0)
    }
};
exports.adminLog = async (req, h) => {
    return {user:req.auth.credentials,"message":"success","statusCode":1}
};
exports.adminManagement_Func=async (req,h)=>{
    /*返回所有用户*/
    let result=await tao.Admin.find();
    return {"message":"success","statusCode":1,'adminArr':result.reverse()};
};
exports.adminManagement_RemoveFunc=async (req,h)=>{
    console.log(req.payload.id,'R');
    /*删除某个用户*/
    let result=await tao.Admin.deleteOne({_id:req.payload.id});
    return {"message":"删除成功","statusCode":1};
};
/*编辑某个用户 Func*/
exports.adminManagement_EditFunc=async (req,h)=>{
    let result=await tao.Admin.updateOne({_id:req.payload._id},{username:req.payload.username,desc:req.payload.desc});
    return {"message":"编辑成功","statusCode":1};
};

/*搜索某个用户*/
exports.adminManagement_SearchFunc=async (req,h)=>{
    let result=await tao.Admin.findOne({username:req.payload.username});
    console.log(result,'222');

    if(result==null){
        return {"message":"用户不存在","statusCode":0,data:result};
    }else{
        return {"message":"success","statusCode":1,data:result};
    }
};

exports.getToken = function(request,reply){
    var time = new Date().getTime();
    var admin = "";
    if(request.payload.userORadmin == "admin"){
        admin = ":admin"
    }
    var hmacPassword = CryptoJS.HmacMD5(request.payload.pwd,request.payload.pwd).toString();
    var hexPassword = hmacPassword.slice(0,16);
    var word = request.payload.url+":"+new Date().getTime();
    var parsedWord = CryptoJS.enc.Utf8.parse(word);
    var parsedKey = CryptoJS.enc.Utf8.parse(hexPassword);
    var encrypted = CryptoJS.AES.encrypt(parsedWord,parsedKey,{mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    encrypted = encrypted.toString();
    var token = "bearer "+request.payload.username+":"+encrypted+admin;
    //var token = "bearer "+request.payload.username+":"+CryptoJS.AES.encrypt(request.payload.url+":"+time,CryptoJS.HmacMD5(request.payload.pwd,request.payload.pwd).toString())+admin;
    return({"toekn":token});
};