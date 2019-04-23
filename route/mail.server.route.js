"use strict";
module.exports = function (app) {

var mail = require("../controller/mail.server.controller"); 
app.get("/api/mail/sendmail", mail.sendMail);

app.post("/api/createUser", mail.createUser);
app.post("/api/mail/user-verify", mail.userVerify);

app.get("/api/mail/forgot-password/:mail", mail.forgotPassword);
app.post("/api/mail/reset-password", mail.updateUserPassword);
app.get("/api/mail/request-professional/:mail", mail.requestProfessional);

// app.post("/api/mail/send-professional", dataroom.sendtoprofessional);
}