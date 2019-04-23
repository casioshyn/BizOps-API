"use strict";
var config = require("../config/manager/SellerManager");

exports.getSecImage = function (req, res) {
	var v1 = req.params.id;
	config.getSecImage(v1, function (err, result) {
		res.send(result);
	});
};
exports.userdate = function (req, res) {
	var v1 = req.body;	
	config.userdate(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});

};
exports.getUserBiz = function (req, res) {
	var v1 = req.params.id;	
	config.getUserBiz(v1, function (err, result) {
		res.send(result);
	});
};


exports.getProcessbyCmp = function (req, res) {
	var v1 = req.params.id;	
	config.getProcessbyCmp(v1, function (err, result) {
		res.send(result);
	});
};

exports.uploadImage = function (req, res) {
	config.uploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.userProfile = function (req, res) {
	config.userProfile(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};


// exports.profileImgUpload = function (req, res) {
// 	config.profileImgUpload(req, res, function (err, result) {
// 		res.send("Uploaded Sucessfully");
// 	});
// };
exports.editUploadImage = function (req, res) {
	config.editUploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.multiUploadImage = function (req, res) {
	config.multiUploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});

};

exports.deleteSecImages = function (req, res) {
	var v1 = req.params.id;
	config.deleteSecImages(v1, function (err, result) {
		res.send(result);
	});
};
exports.deleteAddress = function (req, res) {
	var v1 = req.params.id;
	config.deleteAddress(v1, function (err, result) {
		res.send(result);
	});
};
exports.multiUpdateImage = function (req, res) {
	config.multiUpdateImage(req, res, function (err, result) {
		res.send("Updated Sucessfully");
	});
};
exports.multiAddress = function (req, res) {
	var v1 = req.body;	
	config.multiAddress(v1, function (err, rows) {
		// var str = rows[0][0].value;
		// res.status(200).send(str.toString());
		res.status(200).send("1");
	});

};
exports.getAddress = function (req, res) {
	var v1 = req.params.id;	
	config.getAddress(v1, function (err, result) {
		res.send(result);
	});
};
exports.createSellerBusiness = function (req, res) {
	var v1 = req.body;	
	console.log(v1);
	config.createSellerBusiness(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerFinancial = function (req, res) {
	var v1 = req.body;	
	config.createSellerFinancial(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerBuilding = function (req, res) {
	var v1 = req.body;	
	config.createSellerBuilding(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerPremise = function (req, res) {
	var v1 = req.body;	
	config.createSellerPremise(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerAgent = function (req, res) {
	var v1 = req.body;	
	config.createSellerAgent(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerService = function (req, res) {
	var v1 = req.body;	
	config.createSellerService(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.createSellerTerms = function (req, res) {
	var v1 = req.body;	
	config.createSellerTerms(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});
};
exports.getBussinessByUserID = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBussinessByUserID(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizAgent = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizAgent(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizBuilding = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizBuilding(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizFinancial = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizFinancial(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizPremises = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizPremises(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizServices = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizServices(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};
exports.getBizTerms = function (req, res) {
	var v1 = req.params.id;
	console.log(v1)
	config.getBizTerms(v1, function (err, result) {
		res.send(result);
		console.log(result);
	});
};