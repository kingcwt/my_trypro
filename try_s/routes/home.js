const Joi=require('joi');
const func= require('../service/Home');
module.exports=[
    {
        method: 'GET',
        path: '/get',
        options: {
            handler: func.a,
            description: 'get获取',
            auth:false,
            tags: ['api'], // ADD THIS TAG
            // validate: {
            //     params: {
            //         id : Joi.number()
            //             .required()
            //             .description('the id for the todo item'),
            //     }
            // }
        },
    }
]