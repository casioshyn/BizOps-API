"use strict";
module.exports = function (app) {
    var seller = require("../controller/seller.server.controller");
    
    app.get("/api/getImage/:id", seller.getSecImage);
    app.post("/api/createBiz", seller.userdate);
    app.get("/api/getUserBiz/:id", seller.getUserBiz);

    app.post("/api/upload", seller.uploadImage);
    app.post("/api/upload/userProfile", seller.userProfile);
    app.post("/api/upload/edit", seller.editUploadImage);
    app.post("/api/upload/multi", seller.multiUploadImage);
    app.post("/api/upload/edit/multi", seller.multiUpdateImage);
    app.delete("/api/upload/deleteSecImages/:id", seller.deleteSecImages);
    app.delete("/api/deleteAddress/:id", seller.deleteAddress);
    // app.post("/api/profile/upload", seller.profileImgUpload);
    app.get("/api/getAddress/:id", seller.getAddress);
    app.post("/api/multiAddress", seller.multiAddress);
    app.get("/api/getProcessbyCmp/:id", seller.getProcessbyCmp);
    app.post("/api/createSellerBusiness", seller.createSellerBusiness);
    app.post("/api/createSellerFinancial", seller.createSellerFinancial);
    app.post("/api/createSellerBuilding", seller.createSellerBuilding);
    app.post("/api/createSellerPremise", seller.createSellerPremise);
    app.post("/api/createSellerAgent", seller.createSellerAgent);
    app.post("/api/createSellerService", seller.createSellerService);
    app.post("/api/createSellerTerms", seller.createSellerTerms);
    app.get("/api/getbiz-user/:id", seller.getBussinessByUserID);
    app.get("/api/getbiz-agent/:id", seller.getBizAgent);
    app.get("/api/getbiz-building/:id", seller.getBizBuilding);
    app.get("/api/getbiz-financial/:id", seller.getBizFinancial);
    app.get("/api/getbiz-premises/:id", seller.getBizPremises);
    app.get("/api/getbiz-services/:id", seller.getBizServices);
    app.get("/api/getbiz-terms/:id", seller.getBizTerms);

};