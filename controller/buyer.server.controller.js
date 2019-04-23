"use strict";
var config=require("../config/manager/BuyerManager");
exports.bankReportUpload=function(req,res){		
	config.bankReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.licenseReportUpload=function(req,res){		
	config.licenseReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.certificateReportUpload=function(req,res){		
	config.certificateReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.finsDataUpload=function(req,res){		
	config.finsDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.insuranceDataUpload=function(req,res){		
	config.insuranceDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};

exports.uploadBuyerNDA=function(req,res){		
	config.uploadBuyerNDA(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.buyerBiz = function (req, res) {	
	var v1 = req.body;	
	console.log(v1);
	config.buyerBiz(v1, function (err, rows) {        
        console.log(rows);
        var str = rows[0][0].value;     	
        console.log(str);
        res.status(200).send(str.toString());       
	});

};

exports.getBuyerID = function (req, res) {
	var v1 = req.params.id;
	console.log(v1);
	config.getBuyerID(v1, function (err, result) {
		res.send(result);
	});
};
exports.getBuyerDetail = function (req, res) {
	var v1 = req.params.id;
	config.getBuyerDetail(v1,function (err, result) {
		res.send(result);
	});
};
exports.checkBusiness = function (req, res) {
	console.log(v1);
	var v1 = req.body;
	config.checkBusiness(v1, function (err, result) {
		res.send(result);
	});
};
exports.alreadySaved = function (req, res) {
	var v1 = req.body;
	config.alreadySaved(v1, function (err, result) {
		res.send(result);
	});
};
exports.getBuy_ID = function (req, res) {
	var v1 = req.params.id;
	config.getBuy_ID(v1, function (err, result) {
		res.send(result);
	});
};
exports.buyerAddress = function (req, res) {
	var v1 = req.body;	
	config.buyerAddress(v1, function (err, rows) {
		// var str = rows[0][0].value;
		// res.status(200).send(str.toString());
		res.status(200).send("1");
	});

};
