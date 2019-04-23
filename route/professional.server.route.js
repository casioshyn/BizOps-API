"use strict";
module.exports=function(app){
var professional=require("../controller/professional.server.controller");
app.post("/api/createProfessional", professional.createProfessional);
app.post("/api/profile/upload", professional.profileImgUpload);
app.post("/api/professional/profLicense",professional.profLicense);
app.post("/api/professional/driverLicense",professional.driverLicense);
app.post("/api/professional/profSocialSecurity",professional.profSocialSecurity);
app.post("/api/professionalAddress", professional.professionalAddress);
app.post("/api/professional/businessLicense",professional.businessLicense);
app.post("/api/professional/insuranceData",professional.insuranceData);
app.get("/api/getProfAddress/:id", professional.getProfAddress);
app.delete("/api/deleteProfessionalAddress/:id", professional.deleteProfessionalAddress);
app.delete("/api/deleteProfessionalImage/:id", professional.deleteProfessionalImage);
app.get("/api/getProfIdByUserIDValue/:id", professional.getProfIdByUserIDValue);
};