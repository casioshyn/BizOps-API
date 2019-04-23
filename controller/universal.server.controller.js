"use strict";
var config = require("../config/manager/UnivpageManager");


exports.uploadFile = function (req, res) {
	config.uploadFile(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.upload_creFile = function (req, res) {
	config.upload_creFile(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.upload_bankFile = function (req, res) {
	config.upload_bankFile(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.upload_propertyFile = function (req, res) {
	config.upload_propertyFile(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};