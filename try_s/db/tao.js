const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    username: String,
    pwd:String,
    createTime:{type:String,default:new Date().getTime()},
    scope:{ type: Array, default:['ADMIN'] },
    desc:{type:String,default:'you like baby !'},
});

const AccessRecordSchema = new mongoose.Schema({
    guid: String,//字符串时间戳
    username:String
});

const AccessRecord = mongoose.model('AccessRecord', AccessRecordSchema);
const Admin = mongoose.model('Admin', AdminSchema);
module.exports={
    Admin,
    AccessRecord
};