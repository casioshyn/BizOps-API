"use strict";
module.exports = function (app) {
    var user = require("../controller/user.server.controller");

    app.get("/api/homepage/user", user.getUsers);
    app.get("/api/getBiz", user.getVechicle);
    app.get("/api/getBiz/:id", user.getbizUser);
    app.get("/api/getUserlist", user.getUserList);
    app.get("/api/getInstructionList", user.getInstructionList);   
    app.get("/api/getBusChecklistDoc", user.getBusChecklistDoc); 
    app.get("/api/homepage/location", user.getLocation);
    app.get("/api/getSavedList/:id", user.getSavedList);
    app.get("/api/user/buyerInterestList/:id", user.getBuyerInterestList);
    app.get("/api/user/professionalTransaction/:id", user.getprofessionalTransaction);    
    app.get("/api/user/profTranBuyer/:id", user.getprofTranBuyer); 
    app.get("/api/checkFirstUser/:id", user.checkFirstUser);    

    app.put("/api/publishProduct", user.publishProduct);
    app.put("/api/hideProduct", user.hideProduct);

   // app.post("/api/createUser", user.createUser);
    // app.post("/api/createProfessional", user.createProfessional);
    app.post("/api/insertimage", user.insertimage);
    app.post("/api/login", user.userlogin);
    app.post("/api/user/savelist", user.saveList); 
    app.post("/api/createInstruction", user.createInstruction);
    app.post("/api/createBusinessChecklist", user.createBusinessChecklist); 
    app.post("/api/createChecklist", user.createChecklist);
    app.post("/api/checklist/doc-upload", user.uploadCheclistDoc);
    app.post("/api/create-checklist/doc-upload", user.upBusChecklistDoc);
    app.post("/api/user/removeSavedList", user.removeSavedList);
    app.post("/api/profile/pdfupload", user.uploadPDF);
    app.post("/api/home/getServices",user.getServices);
    
    
};