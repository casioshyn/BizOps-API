"use strict";
module.exports = function (app) {

var landlord = require("../controller/landlord.server.controller"); 

app.get("/api/lease/getlist-user/:id", landlord.getLeaseByUserID);
app.get("/api/lease/getSecImages/:id", landlord.getLeaseSecImage);

app.get("/api/lease/getLeaseType/:id", landlord.getLeaseType);



app.post("/api/lease/upload/prime-image", landlord.uploadImage);
app.post("/api/lease/upload/sec-image", landlord.multiUploadImage);

app.post("/api/lease/personal-info", landlord.insertPersonal);
app.post("/api/lease/business-entity", landlord.businessEntity);
app.post("/api/lease/building-info", landlord.buildingInfo);
app.post("/api/lease/premises-info", landlord.premisesInfo);
app.post("/api/lease/lease-terms", landlord.InsertLeaseTerms);
app.post("/api/landlordAddress", landlord.landlordAddress);

}