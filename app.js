"use strict";

require('dotenv').config();
var express=require("./config/express");
var config =require("./config/db");
var app = express();

var port = process.env.PORT;
console.log(port);

var server=app.listen(3010,function(){
	//var port=server.address().port;
	console.log(`port ${port} running !!!!!`);	
});

// app.get('/', function (req, res) {
// 	res.send('BizopsAI API Working !!!')
//  });

module.export={
	app:app,
	server:server
};
