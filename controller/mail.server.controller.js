"use strict";
var config = require("../config/manager/MailManager");

exports.sendMail = function (req, res) {
	config.sendMail(function (err, result) {
		res.send(result);
	});
};

exports.createUser = function (req, res) {
	var v1 = req.body;  
	config.createUser(v1, function (err, result) {
		res.send(result);
	});
};

exports.userVerify = function (req, res) {
	var v1 = req.body;  
	config.userVerify(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.updateUserPassword = function (req, res) {
	var v1 = req.body;  
	config.updateUserPassword(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.forgotPassword = function (req, res) {
	var v1 = req.params.mail;
	config.forgotPassword(v1,function (err, result) {
		res.send(result);
	});
};

exports.requestProfessional = function (req, res) {
	var v1 = req.params.mail;
	config.requestProfessional(v1,function (err, result) {
		res.send(result);
	});
};