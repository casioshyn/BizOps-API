 "use strict";
 var express = require("express"),
 	bodyParser = require("body-parser"),
 	methodOverride = require("method-override");

 module.exports = function () {
 	var app = express();
 	app.use(bodyParser.urlencoded({
 		extended: true
 	}));

 	app.use(bodyParser.json());
 	app.use(methodOverride());
 	app.use(function (req, res, next) {

	var allowedOrigins = ['http://bizopsai.tech','http://www.bizopsai.tech','http://localhost:4200'];
	var origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		res.setHeader('Access-Control-Allow-Origin', origin);
	}		
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
	next();
 	});

 	app.use(express.static("./public"));
 	require("../route/user.server.route")(app);
 	require("../route/home.server.route")(app);
 	require("../route/universal.server.route")(app);
 	require("../route/equipment.server.route")(app);
 	require("../route/seller.server.route")(app);
	require("../route/buyer.Server.route")(app);
	require("../route/newseller.server.route")(app);	
	require("../route/service.server.route")(app);	
	require("../route/process.server.route")(app);	
	require("../route/admin.server.route")(app);
	require("../route/dataroom.server.route")(app);
	require("../route/mail.server.route")(app);
	require("../route/landlord.server.route")(app);
	require("../route/tenant.server.route")(app);
	require("../route/professional.server.route")(app);
	require("../route/seller-newdocuments.server.route")(app);
 	return app;
 };