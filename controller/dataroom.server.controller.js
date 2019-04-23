"use strict";
var config=require("../config/manager/DataroomManager");

exports.getPersonalInfo = function (req, res) {
	var v1 = req.params.id;
	config.getPersonalInfo(v1, function (err, result) {
		res.send(result);
	});
};

exports.getBuildingInfo = function (req, res) {
	var v1 = req.params.id;
	config.getBuildingInfo(v1, function (err, result) {
		res.send(result);
	});
};

exports.getBusinessInfo = function (req, res) {
	var v1 = req.params.id;
	config.getBusinessInfo(v1, function (err, result) {
		res.send(result);
	});
};

exports.getPremisesInfo = function (req, res) {
	var v1 = req.params.id;
	config.getPremisesInfo(v1, function (err, result) {
		res.send(result);
	});
};

exports.getFinancialInfo = function (req, res) {
	var v1 = req.params.id;
	config.getFinancialInfo(v1, function (err, result) {
		res.send(result);
	});
};

exports.getBuyerInfo = function (req, res) {
	var v1 = req.params.id;
	config.getBuyerInfo(v1, function (err, result) {
		res.send(result);
	});
};


exports.getBuyerInfoByTran = function (req, res) {   
    var v1 = req.body;  
	config.getBuyerInfoByTran(v1, function (err, result) {
        res.send(result);	
	});
};
