"use strict";
var config = require("../config/manager/ServiceManager");

exports.getBizServices = function (req, res) {
	var v1 = req.body;
	config.getBizServices(v1, function (err, result) {
		res.send(result);
	});
};

exports.hireBizProf = function (req, res) {
	var v1 = req.body;
	config.hireBizProf(v1, function (err, result) {
		res.status(200).send("1");	
	});
};

exports.updateBizProf = function (req, res) {
	var v1 = req.body;
	config.updateBizProf(v1, function (err, result) {
		res.status(200).send("1");	
	});
};
exports.removeBizProf = function (req, res) {
	var v1 = req.body;
	config.removeBizProf(v1, function (err, result) {
		res.status(200).send("1");	
	});
};

exports.sellerPrincipleAgent = function (req, res) {
	var v1 = req.body;
	config.sellerPrincipleAgent(v1, function (err, result) {
		res.status(200).send("1");	
	});
};

exports.buyerPrincipleAgent = function (req, res) {
	var v1 = req.body;
	config.buyerPrincipleAgent(v1, function (err, result) {
		res.status(200).send("1");	
	});
};
exports.userProf = function (req, res) {
	var v1 = req.body;
	config.userProf(v1, function (err, result) {
		res.status(200).send("1");	
	});
};
exports.getuserProf = function (req, res) {
	config.getuserProf(function (err, result) {
		res.send(result);
	});
};
