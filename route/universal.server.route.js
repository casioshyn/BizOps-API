"use strict";
module.exports = function (app) {
    var homepage = require("../controller/universal.server.controller");

    app.post("/api/uploadFile", homepage.uploadFile);
    app.post("/api/upload_creFile", homepage.upload_creFile);
    app.post("/api/upload_bankFile", homepage.upload_bankFile);
    app.post("/api/upload_propertyFile", homepage.upload_propertyFile);
    
};