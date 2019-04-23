"use strict";
module.exports = function (app) {

var dataroom = require("../controller/dataroom.server.controller"); 

app.get("/api/dataroom/getPersonalInfo/:id", dataroom.getPersonalInfo);
app.get("/api/dataroom/getBuildingInfo/:id", dataroom.getBuildingInfo);
app.get("/api/dataroom/getBusinessInfo/:id", dataroom.getBusinessInfo);
app.get("/api/dataroom/getPremisesInfo/:id", dataroom.getPremisesInfo);
app.get("/api/dataroom/getFinancialInfo/:id", dataroom.getFinancialInfo);
app.get("/api/dataroom/getBuyerInfo/:id", dataroom.getBuyerInfo);

app.post("/api/dataroom/getBuyerInfoByTran", dataroom.getBuyerInfoByTran);

}