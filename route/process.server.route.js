"use strict";
module.exports = function (app) {
var process = require("../controller/process.server.controller"); 

// post
app.post("/api/process/createBusinessProcess", process.createBusinessProcess);    
app.post("/api/process/updateBuyerProcess", process.updateBuyerProcess);

app.put("/api/process/putOfferPrice", process.putOfferPrice);
// get
app.post("/api/process/getProcessbyTran", process.getProcessbyTran);

// delete
app.post("/api/process/deleteProcessbyTran", process.deleteProcessbyTran);

app.get("/api/process/deleteProcess/:id", process.deleteProcess);

// replace prof
app.post("/api/professional/getDetailsbyTran", process.getDetailsbyTran);

app.get("/api/professional/getProfSellerList/:id", process.getProfSellerList);
app.get("/api/professional/getProfBuyerList/:id", process.getProfBuyerList);

app.get("/api/professional/getNDA/:id", process.getNDA);



}