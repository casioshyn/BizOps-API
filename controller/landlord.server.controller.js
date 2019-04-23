"use strict";
var config = require("../config/manager/LandlordManager");


/**Upload Images Part */
exports.uploadImage = function (req, res) {
	config.uploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};

exports.multiUploadImage = function (req, res) {
	config.multiUploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};

/**Get Part  */
exports.getLeaseByUserID = function (req, res) {
	var v1 = req.params.id;
	config.getLeaseByUserID(v1, function (err, result) {
		res.send(result);
	});
};

exports.getLeaseSecImage = function (req, res) {
	var v1 = req.params.id;
	config.getLeaseSecImage(v1, function (err, result) {
		res.send(result);
	});
};


exports.getLeaseType = function (req, res) {
	var v1 = req.params.id;
	config.getLeaseType(v1, function (err, result) {
		res.send(result);
	});
};

/** Registeration Landlord */
exports.insertPersonal = function (req, res) {
	var v1 = req.body;  
	config.insertPersonal(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.businessEntity = function (req, res) {
	var v1 = req.body;  
	config.businessEntity(v1, function (err, result) {
		console.log(result);
		var str = result[0][0].value;
		res.status(200).send(str.toString());
	});
};

exports.buildingInfo = function (req, res) {
	var v1 = req.body;  
	config.buildingInfo(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.premisesInfo = function (req, res) {
	var v1 = req.body;  
	config.premisesInfo(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.InsertLeaseTerms = function (req, res) {
	var v1 = req.body;  
	config.InsertLeaseTerms(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.landlordAddress = function (req, res) {
	var v1 = req.body;	
	config.landlordAddress(v1, function (err, rows) {
		// var str = rows[0][0].value;
		// res.status(200).send(str.toString());
		res.status(200).send("1");
	});

};