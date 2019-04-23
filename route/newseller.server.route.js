"use strict";
module.exports=function(app){
var newseller=require("../controller/newseller.server.controller");
app.post("/api/upload/license",newseller.licenseUpload);
app.post("/api/upload/social",newseller.socialSecurityUpload);
app.post("/api/upload/prelease",newseller.premiseUpload);
app.post("/api/upload/bankRep",newseller.bankReportUpload);
app.post("/api/upload/licenseRep",newseller.licenseReportUpload);
app.post("/api/upload/certificateRep",newseller.certificateReportUpload);
app.post("/api/upload/reportsRep",newseller.reportsDataUpload);
app.post("/api/upload/finsRep",newseller.finsDataUpload);
app.post("/api/upload/insuranceRep",newseller.insuranceDataUpload);
app.post("/api/upload/ndaData",newseller.ndaDataUpload);


app.post("/api/profile/checklistPDF",newseller.checkListPDF);
};