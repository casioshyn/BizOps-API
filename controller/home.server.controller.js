"use strict";
var config = require("../config/manager/HomeManager");

exports.getCategory = function (req, res) {
	config.getCategory(function (err, result) {
		res.send(result);
	});
};

exports.getSubCategory = function (req, res) {
	config.getSubCategory(function (err, result) {
		res.send(result);
	});
};

exports.getSubchildCategory = function (req, res) {
	config.getSubchildCategory(function (err, result) {
		res.send(result);
	});
};

exports.getState = function (req, res) {
	config.getState(function (err, result) {
		res.send(result);
	});
};

exports.getCounty = function (req, res) {
	config.getCounty(function (err, result) {
		res.send(result);
	});
};

exports.getProductList = function (req, res) {
	config.getProductList(function (err, result) {
		res.send(result);
	});
};
exports.BuildingTypes = function (req, res) {
	config.BuildingTypes(function (err, result) {
		res.send(result);
	});
};
exports.BuildingSubTypes = function (req, res) {
	config.BuildingSubTypes(function (err, result) {
		res.send(result);
	});
};

exports.getProcessMstr = function (req, res) {
	config.getProcessMstr(function (err, result) {
		res.send(result);
	});
};
exports.getLease = function (req, res) {
	config.getLease(function (err, result) {
		res.send(result);
	});
};

exports.getProfessionals = function (req, res) {
	config.getProfessionals(function (err, result) {
		res.send(result);
	});
};

exports.getProfbyId = function (req, res) {
	var v1 = req.params.id;
	config.getProfbyId(v1, function (err, result) {
		res.send(result);
	});
};

exports.getUserRequests = function (req, res) {
	var v1 = req.params.id;
	config.getUserRequests(v1, function (err, result) {
		res.send(result);
	});
};

exports.getProfessional = function (req, res) {
	var v1 = req.params.id;
	config.getProfessional(v1, function (err, result) {
		res.send(result);
	});
};
exports.getListByTranId = function (req, res) {
	var v1 = req.body;
	config.getListByTranId(v1, function (err, result) {
		res.send(result);
	});
};

exports.acceptRequest = function (req, res) {
	var v1 = req.body;
	config.acceptRequest(v1, function (err, result) {
		res.send(result);
	});
};
exports.getMaxListId = function (req, res) {	
	config.getMaxListId( function (err, result) {
		res.send(result);
	});
};

exports.hireProfessional = function (req, res) {
	var v1 = req.body;
	config.hireProfessional(v1, function (err, result) {
		res.status(200).send("1");	
	});
};

exports.updateProfessional = function (req, res) {
	var v1 = req.body;
	config.updateProfessional(v1, function (err, result) {
		res.status(200).send("1");	
	});
};
exports.removeProfessional = function (req, res) {
	var v1 = req.body;
	config.removeProfessional(v1, function (err, result) {
		res.status(200).send("1");	
	});
};

exports.getTransactionsList = function (req, res) {
	var v1 = req.params.id;
	config.getTransactionsList(v1, function (err, result) {
		res.send(result);
	});
};
exports.getTransBusinessList = function (req, res) {
	var v1 = req.params.id;
	config.getTransBusinessList(v1, function (err, result) {
		res.send(result);
	});
};

exports.getDataRoomRequest = function (req, res) {
	var v1 = req.params.id;
	config.getDataRoomRequest(v1, function (err, result) {
		res.send(result);
	});
};

exports.requestDataroom = function (req, res) {
	var v1 = req.body;
	config.requestDataroom(v1, function (err, result) {
		res.status(200).send("1");
	});
};

exports.acceptDataroom = function (req, res) {
	var v1 = req.body;
	config.acceptDataroom(v1, function (err, result) {
		res.status(200).send("1");
	});
};