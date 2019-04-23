"use strict";

var db = require("../db");
const multer = require("multer");
const ConnectionPool = require("tedious-connection-pool");
const Request = require("tedious").Request;
const sql = require("tedious").TYPES;
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

var poolConfig = {
  min: 1,
  max: 40,
  log: true
};

const config = new ConnectionPool(poolConfig, db);

config.on("connect", err => {
  if (err) {
    console.log("ON", err);
  } else {
    console.log("database connected");
  }
});

function sendMail(cb) {
  var transporter = nodemailer.createTransport({
    name: "www.bizopsai.com",
    host: "mail.bizopsai.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@bizopsai.com",
      pass: "Info.BizOps1"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var mailOptions = {
    from: "info@bizopsai.com",
    to: ["r*,.@gmail.com"],
    subject: "Please confirm your Email account",
   // html: ` <h1>Greetings From Bizops AI<h1> `
   html: `<div style="background:#f9f9f9">
   <div style="background-color:#f9f9f9">        
 <div style="margin:0px auto;max-width:640px;background:transparent">
 <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
 <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px">
 <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
 <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
 <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center">
 <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
 <tbody><tr><td style="width:138px"></td></tr>
 </tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
       <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden">
       <div style="margin:0px auto;max-width:640px;background:#ffffff">
       <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
       <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
       <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
       <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
       <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
             
   <h2 style="font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px">Hey Puvi,</h2>
   <p>Thanks for registering for an account on Bizops AI! Before we get started, we just need to confirm that this is you. Click below to verify your email address:</p>      
           </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
           <tbody><tr>
           <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#20a8d8">
           <a href="https://40.117.214.244:3010/api/mail/verfiy/" 
           style="text-decoration:none;line-height:100%;background:#20a8d8;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px" 
           >
             Verify Email
           </a></td></tr></tbody></table></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:30px 0px"><p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%">
           </p></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
           <p>Need help? <a>Contact our support team</a>.<br>
       Want to give us feedback? Let us know what you think on our <a >feedback site</a>.</p>      
    </div></td></tr></tbody></table></div></td></tr></tbody></table></div>
       </div> 
     </div>
   </div>`
  };

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log("Message sent: " + res.response);
      cb(null, [
        {
          res: res.response
        }
      ]);
    }
  });
}

function createUser(v1, cb) {  

  var transporter = nodemailer.createTransport({
    name: "www.bizopsai.com",
    host: "mail.bizopsai.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@bizopsai.com",
      pass: "Info.BizOps1"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  }); 

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var mailOptions = {
    from: "info@bizopsai.com",
    to: v1.Email,
    subject: "Verify Email Address For Bizops AI",
   // html: `<h1> Hello </h1>`
   html: `<div style="background:#f9f9f9">
   <div style="background-color:#f9f9f9">        
 <div style="margin:0px auto;max-width:640px;background:transparent">
 <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
 <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px">
 <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
 <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
 <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center">
 <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
 <tbody><tr><td style="width:138px"></td></tr>
 </tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
       <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden">
       <div style="margin:0px auto;max-width:640px;background:#ffffff">
       <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
       <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
       <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
       <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
       <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
             
   <h2 style="font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px">
    Hey ${v1.Username},</h2>
    <p>Thanks for registering for an account on Bizops AI! Before we get started, we just need to confirm that this is you. Click below to verify your email address:</p>      
           </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
           <tbody><tr>
           <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#20a8d8">
           <a href="http://www.bizopsai.tech/#/login?email=${v1.Email}&name=${v1.Username}&pwd=${v1.Password}" 
           style="text-decoration:none;line-height:100%;background:#20a8d8;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px" 
           >
             Verify Email
           </a></td></tr></tbody></table></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:30px 0px"><p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%">
           </p></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
           <p>Need help? <a>Contact our support team</a>.<br>
       Want to give us feedback? Let us know what you think on our <a >feedback site</a>.</p>      
    </div></td></tr></tbody></table></div></td></tr></tbody></table></div>
       </div> 
     </div>
   </div>`
  };

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + res.response);
      cb(null, [
        {
          res: res.response
        }
      ]);
    }
  });
}

function userVerify(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_CreateUser";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });
        request.addParameter('FIRSTNAME', sql.VarChar, v1.Username);
        request.addParameter('EMAIL', sql.VarChar, v1.Email);
        request.addParameter('PASSWORD', sql.VarChar, v1.Password);

        connection.callProcedure(request);
    });

}

function forgotPassword(v1, cb) {

    var transporter = nodemailer.createTransport({
      name: "www.bizopsai.com",
      host: "mail.bizopsai.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@bizopsai.com",
        pass: "Info.BizOps1"
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
    var mailOptions = {
      from: "info@bizopsai.com",
      to: v1,
      subject: "Reset your password on Bizops AI",
     // html: ` <h1>Greetings From Bizops AI<h1> `
     html: `<div style="background:#f9f9f9">
     <div style="background-color:#f9f9f9">        
   <div style="margin:0px auto;max-width:640px;background:transparent">
   <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
   <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px">
   <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
   <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
   <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center">
   <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
   <tbody><tr><td style="width:138px"></td></tr>
   </tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
         <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden">
         <div style="margin:0px auto;max-width:640px;background:#ffffff">
         <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
         <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
         <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
         <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
         <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
               
    
     <p> Click below to change your password:</p>      
             </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
             <tbody><tr>
             <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#20a8d8">
             <a href="http://http://www.bizopsai.tech/#/register?email=${v1}" 
             style="text-decoration:none;line-height:100%;background:#20a8d8;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px" 
             >
               Reset Password
             </a></td></tr></tbody></table></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:30px 0px"><p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%">
             </p></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
             <p>Need help? <a>Contact our support team</a>.<br>
            Want to give us feedback? Let us know what you think on our <a >feedback site</a>.</p>      
      </div></td></tr></tbody></table></div></td></tr></tbody></table></div>
         </div> 
       </div>
     </div>`
    };
  
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + res.response);
        cb(null, [
          {
            res: res.response
          }
        ]);
      }
    });
}
  
function updateUserPassword(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query="UPDATE [USER] SET USER_PASSWORD ='"+ v1.Password +"' WHERE USER_EMAIL='"+ v1.Email +"'";
   
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function requestProfessional(v1, cb) {
    var transporter = nodemailer.createTransport({
      name: "www.bizopsai.com",
      host: "mail.bizopsai.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@bizopsai.com",
        pass: "Info.BizOps1"
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
    var mailOptions = {
      from: "info@bizopsai.com",
      to: v1,
      subject: "Greetings From Bizops AI",
     // html: ` <h1>Greetings From Bizops AI<h1> `
     html: `<div style="background:#f9f9f9">
     <div style="background-color:#f9f9f9">        
   <div style="margin:0px auto;max-width:640px;background:transparent">
   <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
   <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px">
   <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
   <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
   <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center">
   <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
   <tbody><tr><td style="width:138px"></td></tr>
   </tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
         <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden">
         <div style="margin:0px auto;max-width:640px;background:#ffffff">
         <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
         <tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
         <div aria-labelledby="mj-column-per-100" class="m_-5892308207036482096mj-column-per-100 m_-5892308207036482096outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
         <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
         <tbody>
		 <tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left">
		 <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
               <h2 style="font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px">
             To Register As A Professional You Have To Follow These Steps, </h2>
            <p> 1.Create a user account on bizops </p> 
             </div></td></tr>
			 <tr> <td style="word-break:break-word;font-size:0px;padding:0px" align="left">
			  <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
			 <p> 2.Login into BizopsAI </p> 
			 </div></td> </tr>
			  <tr> <td style="word-break:break-word;font-size:0px;padding:0px" align="left">
			  <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
			  <p> 3.Click on Operate  </p> </div></td> </tr>
			   <tr> <td style="word-break:break-word;font-size:0px;padding:0px" align="left">
			   <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
			   <p> 4.Click on professional and register your details </p> </div></td> </tr>
			 
			 <tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
             <tbody><tr>
             <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#20a8d8">
             <a href="http://www.bizopsai.tech/#/login" 
             style="text-decoration:none;line-height:100%;background:#20a8d8;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px" 
             >
               Register on Bizopsai
             </a></td></tr></tbody></table></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:30px 0px"><p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%">
             </p></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
             <p>Need help? <a>Contact our support team</a>.<br>
            Want to give us feedback? Let us know what you think on our <a >feedback site</a>.</p>      
         </div></td></tr></tbody></table></div></td></tr></tbody></table></div>
         </div> 
       </div>
     </div>`
    };
  
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + res.response);
        cb(null, [
          {
            res: res.response
          }
        ]);
      }
    });
}

module.exports = {
  sendMail: sendMail,
  createUser: createUser,
  userVerify: userVerify,
  forgotPassword: forgotPassword,
  updateUserPassword: updateUserPassword,
  requestProfessional: requestProfessional
};
