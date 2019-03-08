'use strict';
const Joi = require('joi');
const admin=require('../service/adminServer');


module.exports=[
    /*用户注册*/
    {
        method:'POST',
        path:'/admin/reg',
        handler:admin.adminReg,
        options:{
            auth:false,
            description:'用户注册',
            tags:['api'],
            validate: {
                payload:{
                    username:Joi.string().required().description('用户名'),
                    pwd:Joi.string().required().description('密码'),
                    desc:Joi.string().description('描述')
                }
            }
        }
    },
    /*用户登录*/
    {
        method:'get',
        path:'/admin/log',
        handler:admin.adminLog,
        options:{
            auth:{
                scope: ['ADMIN']
            },
            description:'用户登录',
            tags:['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required().description('需要加token请求头')
                }).unknown()
            }
        }
    },
    /*获取所有用户列表*/
    {
        method:'get',
            path:'/admin/get/management',
        handler:admin.adminManagement_Func,
        options:{
            auth:{
                scope: ['ADMIN']
            },
            description:'用户列表',
            tags:['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required().description('需要加token请求头')
                }).unknown()
            }
        }
    },
    /*删除某个用户*/
    {
        method:'POST',
        path:'/admin/post/remove_management',
        handler:admin.adminManagement_RemoveFunc,
        options:{
            auth:{
                scope: ['ADMIN']
            },
            description:'删除某个用户',
            tags:['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required().description('需要加token请求头')
                }).unknown()
            }
        }
    },
    /*编辑某个用户*/
    {
        method:'POST',
        path:'/admin/post/edit_management',
        handler:admin.adminManagement_EditFunc,
        options:{
            auth:{
                scope: ['ADMIN']
            },
            description:'编辑某个用户',
            tags:['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required().description('需要加token请求头')
                }).unknown()
            }
        }
    },
    /*搜索用户*/
    {
        method:'POST',
        path:'/admin/post/search_management',
        handler:admin.adminManagement_SearchFunc,
        options:{
            auth:{
                scope: ['ADMIN']
            },
            description:'编辑某个用户',
            tags:['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required().description('需要加token请求头')
                }).unknown()
            }
        }
    },
    //token生成器
    {
        method:'POST',
        path:'/get/token',
        config:{
            auth:false,
            handler:admin.getToken,
            description: '获取token接口',
            notes: '获取token接口',
            tags: ['api'],
            validate: {
                payload: {
                    username: Joi.string().default('admin').description('用户名'),
                    pwd: Joi.string().default('123456').description('密码'),
                    url:Joi.string().required().description("要访问的路径"),
                    userORadmin:Joi.string().default('admin').description('管理员还是用户 admin or user')
                }
            }
        }
    },

];