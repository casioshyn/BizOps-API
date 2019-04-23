"use strict";
module.exports=function(app){
var buyer=require("../controller/buyer.server.controller");
app.post("/api/upload/buybankRep",buyer.bankReportUpload);
app.post("/api/upload/buylicenseRep",buyer.licenseReportUpload);
app.post("/api/upload/buycertificateRep",buyer.certificateReportUpload);
app.post("/api/upload/buyfinsRep",buyer.finsDataUpload);
app.post("/api/upload/buyinsuranceRep",buyer.insuranceDataUpload);
app.post("/api/buyer/upload/uploadBuyerNDA",buyer.uploadBuyerNDA);

app.post("/api/buyerBiz",buyer.buyerBiz);
app.get("/api/buyerID/:id",buyer.getBuyerID);
// app.get("/api/saveID/:id",buyer.getSaveID);
// app.get("/api/sellerSave/:id",buyer.getsellerSave);
app.post("/api/checkBusiness",buyer.checkBusiness);
app.post("/api/alreadySaved",buyer.alreadySaved);
app.get("/api/getBuyerDetail/:id",buyer.getBuyerDetail);
app.get("/api/getBuy_ID/:id", buyer.getBuy_ID);
app.post("/api/buyerAddress", buyer.buyerAddress);



};