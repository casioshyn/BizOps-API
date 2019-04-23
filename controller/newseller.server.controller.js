"use strict";
var config=require("../config/manager/NewSellerManager");
exports.licenseUpload=function(req,res){		
	config.licenseUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.socialSecurityUpload=function(req,res){		
	config.socialSecurityUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.premiseUpload=function(req,res){		
	config.premiseUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.bankReportUpload=function(req,res){		
	config.bankReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.licenseReportUpload=function(req,res){		
	config.licenseReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.certificateReportUpload=function(req,res){		
	config.certificateReportUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.reportsDataUpload=function(req,res){		
	config.reportsDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.finsDataUpload=function(req,res){		
	config.finsDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.insuranceDataUpload=function(req,res){		
	config.insuranceDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};
exports.ndaDataUpload=function(req,res){		
	config.ndaDataUpload(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};

exports.checkListPDF=function(req,res){		
	config.checkListPDF(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};