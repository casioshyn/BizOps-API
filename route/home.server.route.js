"use strict";
module.exports = function (app) {
    var homepage = require("../controller/home.server.controller");

    app.get("/api/home/getCategory", homepage.getCategory);
    app.get("/api/home/getSubCategory", homepage.getSubCategory);
    app.get("/api/home/getSubchildCategory", homepage.getSubchildCategory);
    app.get("/api/home/getState", homepage.getState);
    app.get("/api/home/getCounty", homepage.getCounty);
    app.get("/api/home/getProduct", homepage.getProductList);
    app.get("/api/home/getBuildingTypes", homepage.BuildingTypes);
    app.get("/api/home/getBuildingSubTypes", homepage.BuildingSubTypes);    
    app.get("/api/home/getProcessMstr", homepage.getProcessMstr);

    app.get("/api/home/getLease", homepage.getLease);

    app.get("/api/home/getProfessionals", homepage.getProfessionals);
    app.get("/api/getprofessional/:id", homepage.getProfbyId);
    
    app.get("/api/home/getUserRequests/:id", homepage.getUserRequests);
    app.get("/api/home/getProfessional/:id", homepage.getProfessional);


    app.get("/api/home/getMaxListId", homepage.getMaxListId);
    app.post("/api/home/getListByTranId", homepage.getListByTranId);

    app.post("/api/home/acceptRequest", homepage.acceptRequest);
    
    app.post("/api/home/hireProfessional", homepage.hireProfessional);
    app.post("/api/home/updateProfessional", homepage.updateProfessional);
    app.post("/api/home/removeProfessional", homepage.removeProfessional);

    app.get("/api/home/getTransactions/:id", homepage.getTransactionsList);
    app.get("/api/home/getTransBusiness/:id", homepage.getTransBusinessList);    
    app.get("/api/home/getDataRoomRequest/:id", homepage.getDataRoomRequest);

    app.post("/api/home/requestDataroom", homepage.requestDataroom);
    app.post("/api/home/acceptDataroom", homepage.acceptDataroom);

};