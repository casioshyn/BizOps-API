"use strict";
var config=require("../config/manager/processManager");

exports.createBusinessProcess = function (req, res) {
	var v1 = req.body;
	config.createBusinessProcess(v1, function (err, result) {
		res.status(200).send("1");		
	});
};

exports.updateBuyerProcess = function (req, res) {
	var v1 = req.body;
	config.updateBuyerProcess(v1, function (err, result) {
		res.status(200).send("1");		
	});
};

exports.deleteProcess = function (req, res) {
	var v1 = req.params.id;	
	config.deleteProcess(v1, function (err, result) {
		res.status(200).send("1");		
	});
};

exports.getProcessbyTran = function (req, res) {   
    var v1 = req.body;  
	config.getProcessbyTran(v1, function (err, result) {
        res.send(result);	
	});
};

exports.deleteProcessbyTran = function (req, res) {
	var v1 = req.body;	
	config.deleteProcessbyTran(v1, function (err, result) {
		res.status(200).send("1");		
	});
};

// prof part

exports.getDetailsbyTran = function (req, res) {   
    var v1 = req.body;  
	config.getDetailsbyTran(v1, function (err, result) {
        res.send(result);	
	});
};

exports.getProfSellerList = function (req, res) {
	var v1 = req.params.id;
	config.getProfSellerList(v1, function (err, result) {
		res.send(result);
	});
};

exports.putOfferPrice = function (req, res) {
	var v1 = req.body;  
	config.putOfferPrice(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.getProfBuyerList = function (req, res) {
	var v1 = req.params.id;
	config.getProfBuyerList(v1, function (err, result) {
		res.send(result);
	});
};

exports.getNDA = function (req, res) {
	var v1 = req.params.id;
	config.getNDA(v1, function (err, result) {
		res.send(result);
	});
};