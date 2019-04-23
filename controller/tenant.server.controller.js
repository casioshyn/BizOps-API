"use strict";
var config = require("../config/manager/TenantManager");

exports.saveLeaseList = function (req, res) {
	var v1 = req.body;
	config.saveLeaseList(v1, function (err, result) {
		res.status(200).send("1");		
	});
};

exports.getTenantInterestList = function (req, res) {
	var v1 = req.params.id;
	config.getTenantInterestList(v1, function (err, result) {
		res.send(result);
	});
}

exports.getTenantLeaseList = function (req, res) {
	var v1 = req.params.id;
	config.getTenantLeaseList(v1, function (err, result) {
		res.send(result);
	});
}

exports.checkExistingTenant = function (req, res) {
	var v1 = req.params.id;
	config.checkExistingTenant(v1, function (err, result) {
		res.send(result);
	});
}

exports.checkAlreadySaved = function (req, res) {
	var v1 = req.params.id;
	config.checkAlreadySaved(v1, function (err, result) {
		res.send(result);
	});
}

exports.getProfLandlordList = function (req, res) {
	var v1 = req.params.id;
	config.getProfLandlordList(v1, function (err, result) {
		res.send(result);
	});
}

exports.getProfTenantList = function (req, res) {
	var v1 = req.params.id;
	config.getProfTenantList(v1, function (err, result) {
		res.send(result);
	});
}

exports.getDetailsbyLeaseTran = function (req, res) {   
    var v1 = req.body;  
	config.getDetailsbyLeaseTran(v1, function (err, result) {
        res.send(result);	
	});
};