"use strict";
var config=require("../config/manager/ProfessionalManager");
exports.createProfessional = function (req, res) {
	var v1 = req.body;
	config.createProfessional(v1, function (err, rows) {	
		console.log(rows);
		var str = rows[0][0].value;	
		res.status(200).send(str.toString());	
	});
};
exports.userdate = function (req, res) {
	var v1 = req.body;	
	config.userdate(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});

};
exports.profLicense=function(req,res){		
	config.profLicense(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.businessLicense=function(req,res){		
	config.businessLicense(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.insuranceData=function(req,res){		
	config.insuranceData(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.driverLicense=function(req,res){		
	config.driverLicense(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.profSocialSecurity=function(req,res){		
	config.profSocialSecurity(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.profileImgUpload = function (req, res) {
	config.profileImgUpload(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.professionalAddress = function (req, res) {
	var v1 = req.body;	
	config.professionalAddress(v1, function (err, rows) {
		// var str = rows[0][0].value;
		// res.status(200).send(str.toString());
		res.status(200).send("1");
	});

};
exports.getProfAddress = function (req, res) {
	var v1 = req.params.id;	
	config.getProfAddress(v1, function (err, result) {
		res.send(result);
	});
};
exports.getProfIdByUserIDValue = function (req, res) {
	var v1 = req.params.id;	
	config.getProfIdByUserIDValue(v1, function (err, result) {
		res.send(result);
	});
};
exports.deleteProfessionalAddress = function (req, res) {
	var v1 = req.params.id;
	config.deleteProfessionalAddress(v1, function (err, result) {
		res.send(result);
	});
};
exports.deleteProfessionalImage = function (req, res) {
	var v1 = req.params.id;
	config.deleteProfessionalImage(v1, function (err, result) {
		res.send(result);
	});
};