"use strict";
module.exports = function (app) {
    var servicepage = require("../controller/service.server.controller");    

    app.post("/api/service/getBizServices", servicepage.getBizServices);  

    app.post("/api/service/hireBizProf", servicepage.hireBizProf);
    app.post("/api/service/updateBizProf", servicepage.updateBizProf);
    app.post("/api/service/removeBizProf", servicepage.removeBizProf);

    app.post("/api/service/sellerPrincipleAgent", servicepage.sellerPrincipleAgent);
    app.post("/api/service/buyerPrincipleAgent", servicepage.buyerPrincipleAgent);
    app.post("/api/service/userProf", servicepage.userProf);
    app.get("/api/service/getuserProf", servicepage.getuserProf);

    
};