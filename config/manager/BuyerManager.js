"use strict";

var db = require("../db");
const multer = require('multer');
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
const sql = require('tedious').TYPES;
var poolConfig = {
    min: 1,
    max: 40,
    log: true
};
const config = new ConnectionPool(poolConfig, db);

config.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    var request = new Request('select 42', function (err, rowCount) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('rowCount: ' + rowCount);
        //release the connection back to the pool when finished
        connection.release();
    });

    request.on('row', function (columns) {
        console.log('value: ' + columns[0].value);
    });
    connection.execSql(request);

});

config.on('connect', err => {
    if (err) {
        console.log('ON', err);
    }
    else {
        console.log("database connected");
    }
});

//  const DIR = 'C:\\inetpub\\wwwroot\\assets\\img';
//  const Secdir = 'C:\\inetpub\\wwwroot\\assets\\img';
// const bankDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
// const licDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
// const certfiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
// const finDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
// const insDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';

const bankDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const licDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const finDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';

const buyer_nda = 'C:\\inetpub\\wwwroot\\assets\\img';

var up_filename = "";
let bankReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, bankDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let licenseReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, licDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let certificateReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, certfiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let finsDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, finDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let insDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, insDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

let buyerNDA = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, buyer_nda);
    },
    filename: (req, file, cb) => {      
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

var bankReportPic = multer({ storage: bankReportStorage }).single('buy-bankPDF');
var licenseReportPic = multer({ storage: licenseReportStorage }).single('buy-licenseRep');
var certificatePic = multer({ storage: certificateReportStorage }).single('buy-certificateRep');
var finsPic = multer({ storage: finsDataStorage }).single('buy-finState');
var insurancePic = multer({ storage: insDataStorage }).single('buy-insurance');

var upload_BuyerNDA = multer({ storage: buyerNDA }).single('buyer-NDA');


function bankReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        bankReportPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.name;
                ID = req.body.id;
                
                var query = "SP_CreateBankReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('BANK_REPORT', sql.VarChar, up_filename);
                request.addParameter('BANK_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);    
                        
        });
    });
}

function licenseReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        licenseReportPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.name;
                ID = req.body.id;
                
                var query = "SP_CreateLicenseReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}

function certificateReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        certificatePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.name;
                ID = req.body.id;
               

                var query = "INSERT INTO BUYER_CERTIFICATE_REPORT VALUES ('"+ID+"','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(rows);
                        cb(null, rowCount);
                    }
                    connection.release();
                });
                connection.execSql(request);
            }
        });
    });
}

function finsDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        finsPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.name;
                ID = req.body.id;
                
                var query = "SP_CreateFinReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('FIN_REPORT', sql.VarChar, up_filename);
                request.addParameter('FIN_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}

function insuranceDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        insurancePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.name;
                ID = req.body.id;
               
                var query = "INSERT INTO BUYER_INSURANCE_REPORT VALUES ('"+ID+"','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(rows);
                        cb(null, rowCount);
                    }
                    connection.release();
                });
                connection.execSql(request);
            }
        });
    });
}

function uploadBuyerNDA(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var com_id = '';
        var user_id = '';
        upload_BuyerNDA(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }       
            filename = req.file.filename;
            path = req.file.path;
            com_id = req.body.COMPANY_ID;
            user_id = req.body.USER_ID;
            
            var query = "SP_BUYER_NDA";
            const request = new Request(query, (err, rowCount, rows) => {
                if (err) {                    
                    console.log(err);
                } else {     
                    console.log(rows);
                    cb(null, rows); 
                }
                connection.release();
            });          
            request.addParameter('COMPANY_ID', sql.Int, com_id);
            request.addParameter('BUYER_ID', sql.Int, user_id);
            request.addParameter('IMG_NAME', sql.VarChar,up_filename );
            request.addParameter('IMD_DIR', sql.VarChar,path );              
            connection.callProcedure(request);    
                        
            });
        });
}

function buyerBiz(v1, cb) {
    console.log(v1);
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_CreateBuyer";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
               
                console.log(err);
            } else {     
                console.log(rows);
                cb(null, rows);         
             
            }
            connection.release();
        });
       // request.addParameter('ID', sql.Int, v1.Id);
        request.addParameter('USER_ID', sql.Int, v1.User_Id);
        request.addParameter('NAME', sql.VarChar, v1.Name);
        request.addParameter('HOME_ADDRESS', sql.VarChar, v1.homeAddress);
        request.addParameter('AGENT_NAME', sql.VarChar, v1.agentName);
        request.addParameter('AGENT_EMAIL', sql.VarChar, v1.agentEmail);
        request.addParameter('AGENT_CONTACT', sql.VarChar, v1.agentContact);
        request.addParameter('EMAIL_ADDRESS', sql.VarChar, v1.emailAddress);
        request.addParameter('FAX_NUMBER', sql.VarChar, v1.faxNumber);
        request.addParameter('CELL_NUMBER', sql.VarChar, v1.cellPhone);
        request.addParameter('HOME_NUMBER', sql.VarChar, v1.homePhone);
        request.addParameter('SECURITY_NAME', sql.VarChar, v1.secName);
        request.addParameter('SECURITY_NUMBER', sql.VarChar, v1.secNum);
        request.addParameter('TELEPHONE', sql.VarChar, v1.bestTelePhone);
        request.addParameter('DOB', sql.VarChar, v1.dob);
        request.addParameter('BIRTH_PLACE', sql.VarChar, v1.birthPlace);
        request.addParameter('HOME_TELEPHONE', sql.VarChar, v1.homeTelePhone);      
        connection.callProcedure(request);
    });
}

function getBuyerID(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select USER_ID from buyer_details where USER_ID = '"+v1+"'";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {}
            for (let i = 0; i < rowCount; i++) {
                var rowObject = {};
                var singleRowData = rows[i];
                for (let j = 0; j < singleRowData.length; j++) {
                    var tempColName = singleRowData[j].metadata.colName;
                    var tempColData = singleRowData[j].value;
                    rowObject[tempColName] = tempColData;
                }
                jsonArray.push(rowObject);
            }
            if (jsonArray.length > 0) {
                // console.log(jsonArray);
                cb(null, jsonArray);
            }else{
                cb(null, [{ "status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getBuyerDetail(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = "SELECT * from buyer_details";
        console.log(v1);
       var query = `select BD.*,BN.BANK_REPORT,LIR.LICENSE_REPORT,FIN.FIN_REPORT 
                    from BUYER_DETAILS BD LEFT JOIN BUYER_BANK_REPORT BN ON BD.ID = BN.ID
                    LEFT JOIN BUYER_LICENSE_REPORT LIR ON BD.ID = LIR.ID
                    LEFT JOIN BUYER_FIN_STATEMENT FIN ON BD.ID = FIN.ID
                    where BD.ID = '${v1}'`; 
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

            }
            for (let i = 0; i < rowCount; i++) {
                var rowObject = {};
                var singleRowData = rows[i];
                for (let j = 0; j < singleRowData.length; j++) {
                    var tempColName = singleRowData[j].metadata.colName;
                    var tempColData = singleRowData[j].value;
                    rowObject[tempColName] = tempColData;
                }
                jsonArray.push(rowObject);
            }

            if (jsonArray.length > 0) {
                // console.log(jsonArray);
                cb(null, jsonArray);
            }
            else {
                cb(null, [{"status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function checkBusiness(v1, cb) {
    console.log(v1);
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        // console.log("tran",v1.tran_id);
        var jsonArray = [];
        var query =  "select COMPANY_ID from COMPANY_DETAILS where USER_ID = '"+v1.user_id+"' AND COMPANY_ID = '"+v1.com_id+"'"; 
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {}
            for (let i = 0; i < rowCount; i++) {
                var rowObject = {};
                var singleRowData = rows[i];
                for (let j = 0; j < singleRowData.length; j++) {
                    var tempColName = singleRowData[j].metadata.colName;
                    var tempColData = singleRowData[j].value;
                    rowObject[tempColName] = tempColData;
                }
                jsonArray.push(rowObject);
            }
            if (jsonArray.length > 0) {
                // console.log(jsonArray);
                cb(null, jsonArray);
            }
            else {
                cb(null, [{"status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function alreadySaved(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }        
        var jsonArray = [];
        var query = "select COMPANY_ID from INTRSDATA where USER_ID = '"+v1.user_id+"' AND COMPANY_ID = '"+v1.com_id+"'";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {}
            for (let i = 0; i < rowCount; i++) {
                var rowObject = {};
                var singleRowData = rows[i];
                for (let j = 0; j < singleRowData.length; j++) {
                    var tempColName = singleRowData[j].metadata.colName;
                    var tempColData = singleRowData[j].value;
                    rowObject[tempColName] = tempColData;
                }
                jsonArray.push(rowObject);
            }
            if (jsonArray.length > 0) {
                // console.log(jsonArray);
                cb(null, jsonArray);
            }
            else {
                cb(null, [{"status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getBuy_ID(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT  ID FROM BUYER_DETAILS WHERE USER_ID = '"+v1+"'";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                //console.log(rows);
                // cb(null,JSON.stringify(rows));
            }
            for (let i = 0; i < rowCount; i++) {
                var rowObject = {};
                var singleRowData = rows[i];
                for (let j = 0; j < singleRowData.length; j++) {
                    var tempColName = singleRowData[j].metadata.colName;
                    var tempColData = singleRowData[j].value;
                    rowObject[tempColName] = tempColData;
                }
                jsonArray.push(rowObject);
            }

            if (jsonArray.length > 0) {
                // console.log(jsonArray);
                cb(null, jsonArray);
            }
            else {
                cb(null, [{"status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function buyerAddress(v1, cb) {
    console.log(v1);
    for(var i=0;i<v1.address.length;i++){
        console.log(v1.address[i].addAddress);
        var addr = v1.address[i].addAddress;
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO BUYER_MULTIPLE_ADDRESS VALUES ('"+v1.user_id+"','" +addr+"')";
            console.log(query);                
            const request = new Request(query, function (err, rowCount, rows) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows);
                }
                connection.release();
            });
            connection.execSql(request);
        });
    }
    cb(null, [{ "status": "success"}]);
}
module.exports = {
    bankReportUpload: bankReportUpload,
    licenseReportUpload: licenseReportUpload,
    certificateReportUpload: certificateReportUpload,  
    finsDataUpload: finsDataUpload,
    insuranceDataUpload: insuranceDataUpload,
    buyerBiz:buyerBiz,
    getBuyerID:getBuyerID,  
    getBuyerDetail:getBuyerDetail,
    alreadySaved:alreadySaved,
    checkBusiness:checkBusiness,
    getBuy_ID:getBuy_ID,
    uploadBuyerNDA: uploadBuyerNDA,
    buyerAddress:buyerAddress
   
};