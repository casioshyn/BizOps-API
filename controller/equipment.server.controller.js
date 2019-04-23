"use strict";
var config = require("../config/manager/EquipmentManager");

exports.EquipmentDetails = function (req, res) {
	var v1 = req.params.id;
	config.EquipmentDetails(v1, function (err, result) {
		res.send(result);
	});
};
exports.deleteEquipmentDetails = function (req, res) {
	var v1 = req.params.id;
	config.deleteEquipmentDetails(v1, function (err, result) {
		res.send(result);
	});
};
exports.createEquip = function (req, res) {
	var v1 = req.body;

	console.log(v1);
	config.createEquip(v1, function (err, rows) {
		res.status(200).send("1");
	});

};