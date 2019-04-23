"use strict";
var config=require("../config/manager/SellerNewDocumentsManager");
exports.libilReportUpload=function(req,res){		
	config.libilReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.retirePlanReportUpload=function(req,res){		
	config.retirePlanReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.keyContractReportUpload=function(req,res){		
	config.keyContractReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.federalDataUpload=function(req,res){		
	config.federalDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};