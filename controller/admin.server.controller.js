"use strict";
var config=require("../config/manager/AdminManager");
exports.getAllBusiness = function (req, res) {
	config.getAllBusiness(function (err, result) {
		res.send(result);
	});
};
exports.getAllLeaseBusiness = function (req, res) {
	config.getAllLeaseBusiness(function (err, result) {
		res.send(result);
	});
};
exports.getAllUser = function (req, res) {
	config.getAllUser(function (err, result) {
		res.send(result);
	});
};
exports.getAllProfessionals = function (req, res) {
	config.getAllProfessionals(function (err, result) {
		res.send(result);
	});
};
exports.getAllBuyers = function (req, res) {
	config.getAllBuyers(function (err, result) {
		res.send(result);
	});
};
exports.getAllSellers = function (req, res) {
	config.getAllSellers(function (err, result) {
		res.send(result);
	});
};
exports.createBizAdmin = function (req, res) {	
	var v1 = req.body;	
	console.log(v1);
	config.createBizAdmin(v1, function (err, rows) {     
    res.status(200).send("1");       
	});
};
exports.getBizAdmin = function (req, res) {
	config.getBizAdmin(function (err, result) {
		res.send(result);
	});
};
exports.sendNotification = function (req, res) {	
	var v1 = req.body;	
	console.log(v1);
	config.sendNotification(v1, function (err, rows) {     
		res.status(200).send("1");
	});
};
exports.getNotification = function (req, res) {
	config.getNotification(function (err, result) {
		res.send(result);
	});
};
exports.getBuyerNotification = function (req, res) {
	config.getBuyerNotification(function (err, result) {
		res.send(result);
	});
};
exports.getSellerNotification = function (req, res) {
	config.getSellerNotification(function (err, result) {
		res.send(result);
	});
};
exports.getProfessionalNotification = function (req, res) {
	config.getProfessionalNotification(function (err, result) {
		res.send(result);
	});
};
exports.getAdmin = function (req, res) {
	config.getAdmin(function (err, result) {
		res.send(result);
	});

};

exports.publishLeaseProduct = function (req, res) {
	var v1 = req.body;
	config.publishLeaseProduct(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};
exports.hideLeaseProduct = function (req, res) {
	var v1 = req.body;
	config.hideLeaseProduct(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};
exports.deleteUser = function (req, res) {
	var v1 = req.params.id;
	config.deleteUser(v1,function (err, result) {
		res.status(200).send("1");
	});
};