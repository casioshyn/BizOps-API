"use strict";
module.exports=function(app){
var sellerAdditional=require("../controller/sell_additional.server.controller");
app.post("/api/upload/libil",sellerAdditional.libilReportUpload);
app.post("/api/upload/retirePlan",sellerAdditional.retirePlanReportUpload);
app.post("/api/upload/keyConract",sellerAdditional.keyContractReportUpload);
app.post("/api/upload/federal",sellerAdditional.federalDataUpload);
};