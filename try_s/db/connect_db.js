const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hapi',{ useNewUrlParser: true }).then(()=>{
	console.log('数据库连接成功')
}).catch((err)=>{
	throw err
});