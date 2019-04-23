"use strict";
module.exports = function (app) {
    var equipment = require("../controller/equipment.server.controller");

    app.get("/api/home/getEquipments/:id", equipment.EquipmentDetails);
    app.get("/api/home/deleteEquipments/:id", equipment.deleteEquipmentDetails);
    app.post("/api/createEquip", equipment.createEquip);
};