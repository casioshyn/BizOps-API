"use strict";
var config = require("../config/manager/UserManager");


exports.getUsers = function (req, res) {
	config.getUsers(function (err, result) {
		res.send(result);
	});
};


exports.getVechicle = function (req, res) {
	config.getVechicle(function (err, result) {
		res.send(result);
	});
};

exports.getUserList = function (req, res) {
	config.getUserList(function (err, result) {
		res.send(result);
	});
};

exports.getInstructionList = function (req, res) {
	config.getInstructionList(function (err, result) {
		res.send(result);
	});
};

exports.getBusChecklistDoc = function (req, res) {
	config.getBusChecklistDoc(function (err, result) {
		res.send(result);
	});
};

exports.getSavedList = function (req, res) {
	var v1 = req.params.id;
	config.getSavedList(v1, function (err, result) {
		res.send(result);
	});
};

exports.getBuyerInterestList = function (req, res) {
	var v1 = req.params.id;
	config.getBuyerInterestList(v1, function (err, result) {
		res.send(result);
	});
};

exports.getprofessionalTransaction = function (req, res) {
	var v1 = req.params.id;
	config.getprofessionalTransaction(v1, function (err, result) {
		res.send(result);
	});
};

exports.getprofTranBuyer = function (req, res) {
	var v1 = req.params.id;
	config.getprofTranBuyer(v1, function (err, result) {
		res.send(result);
	});
};

exports.checkFirstUser = function (req, res) {
	var v1 = req.params.id;
	config.checkFirstUser(v1, function (err, result) {
		res.send(result);
	});
};

exports.getbizUser = function (req, res) {
	var v1 = req.params.id;
	config.getbizUser(v1, function (err, result) {
		res.send(result);
	});

};
exports.userlogin = function (req, res) {
	var v1 = req.body;
	config.userlogin(v1, function (err, result) {
		res.send(result);
	});

};

exports.getServices = function (req, res) {
	var v1 = req.body;
	config.getServices(v1, function (err, result) {
		res.send(result);
	});

};
exports.createUser = function (req, res) {
	var v1 = req.body;
	config.createUser(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.createInstruction = function (req, res) {
	var v1 = req.body;
	config.createInstruction(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};


exports.createBusinessChecklist = function (req, res) {
	var v1 = req.body;
	config.createBusinessChecklist(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};


exports.createChecklist = function (req, res) {
	var v1 = req.body;
	config.createChecklist(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

// exports.createProfessional = function (req, res) {
// 	var v1 = req.body;

// 	config.createProfessional(v1, function (err, result) {
// 		res.status(200).send("1");
// 		//res.send(result);
// 	});
// };
exports.insertimage = function (req, res) {
	var v2 = req.body;
	// var password=req.body.password;
	console.log(v2)
	config.insertimage(v2, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});

};


exports.publishProduct = function (req, res) {
	var v1 = req.body;
	config.publishProduct(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.hideProduct = function (req, res) {
	var v1 = req.body;
	config.hideProduct(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.saveList = function (req, res) {
	var v1 = req.body;
	config.saveList(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.removeSavedList = function (req, res) {
	var v1 = req.body;	
	config.removeSavedList(v1, function (err, result) {
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.getLocation = function (req, res) {
	config.getLocation(function (err, result) {
		res.send(result);
	});

};

exports.getId = function (req, res) {
	config.getId(function (err, result) {
		res.send(result);
	});

};

exports.uploadPDF = function (req, res) {
	config.uploadPDF(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});

};

exports.uploadCheclistDoc = function (req, res) {
	config.uploadCheclistDoc(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};


exports.upBusChecklistDoc = function (req, res) {
	config.upBusChecklistDoc(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
