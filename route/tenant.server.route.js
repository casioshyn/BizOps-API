"use strict";
module.exports = function (app) {

var tenant = require("../controller/tenant.server.controller"); 

app.post("/api/tenant/saveLeaseList", tenant.saveLeaseList); 

app.get("/api/lease/getTenantInterestList/:id", tenant.getTenantInterestList);
app.get("/api/lease/getTenantLeaseList/:id", tenant.getTenantLeaseList);
app.get("/api/lease/check-isexisting-tenant/:id", tenant.checkExistingTenant);
app.get("/api/lease/checkAlreadySaved/:id", tenant.checkAlreadySaved);

app.get("/api/lease/getProfTenantList/:id", tenant.getProfTenantList);
app.get("/api/lease/getProfLandlordList/:id", tenant.getProfLandlordList);
app.post("/api/lease/getDetailsbyLeaseTran", tenant.getDetailsbyLeaseTran);

}