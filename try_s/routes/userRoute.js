'use strict';
const Joi = require('joi');
const user=require('../service/user');

module.exports=[
    {
        method:'POST',
        path:'/reg',
        handler:user.adminReg,
        options:{
            auth:false,
            description:'用户注册',
            tags:['api'],
            validate: {
                payload:{
                    username:Joi.string().required().description('用户名'),
                    pwd:Joi.string().required().description('密码'),
                }
            }
        }
    },



];
