"use strict";
var sql = require("mssql");
var db = require("../db");
var CronJob = require('cron').CronJob;
const multer = require('multer');
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
var sql = require('tedious').TYPES;
var nodemailer = require('nodemailer');
var flag;
var com_id;
var host = 'localhost';
var rand = Math.floor((Math.random() * 100) + 54);
var jsonArray = [];

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
    } else {
        console.log("database connected");
    }
});

config.on('error', err => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log("database connected !!!");

    }
});

const pdfdir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const checklistDir = 'C:\\inetpub\\wwwroot\\assets\\checklist-doc';
const Buschecklist = 'C:\\inetpub\\wwwroot\\assets\\checklist-doc';


var up_filename = "";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfdir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

let checklist_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, checklistDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

let Buschecklist_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Buschecklist);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

var upload = multer({storage: storage}).single('pdfFile');
var checlistUpload = multer({storage: checklist_storage}).single('Checklist_DOC');
var BuscheclistUpload = multer({storage: Buschecklist_storage}).single('Checklist_DOC');


function uploadPDF(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        upload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                var query = "INSERT INTO PDF_MSTR VALUES ('" + user + "','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
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


function uploadCheclistDoc(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        checlistUpload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;

                var query = "INSERT INTO CHECKLIST_DOC VALUES ('" + user + "','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
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

function upBusChecklistDoc(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        BuscheclistUpload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {
                filename = req.file.filename;
                path = req.file.path;
                company_id = req.body.CompanyId;

                var query = "INSERT INTO BUS_CHECKLIST_DOC VALUES ('" + company_id + "','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
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

function getUsers(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [register]";
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

function getVechicle(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = "SELECT CO.*,AD.*,IMG.IMG_NAME,VE.AFLAG FROM COMPANY_DETAILS CO LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID LEFT JOIN VERIFIED VE ON CO.COMPANY_ID=VE.COMPANY_ID LEFT JOIN ADDITIONAL_DETAILS AD ON CO.COMPANY_ID=AD.COMPANY_ID  ORDER BY CO.COMPANY_ID DESC";
        var query =`SELECT CO.*,IMG.IMG_NAME FROM COMPANY_DETAILS CO 
                    LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID
                    ORDER BY CO.COMPANY_ID DESC`;
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

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
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getUserList(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM [USER]";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

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
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getInstructionList(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = `SELECT * FROM CHECKLIST_MSTR CM 
        //              LEFT JOIN CHECKLIST_DOC CD ON CD.LIST_ID = CM.LIST_ID`;
        var query = `SELECT * FROM BUSINESS_CHECKLIST`;
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

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
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getBusChecklistDoc(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = `SELECT * FROM CHECKLIST_MSTR CM 
        //              LEFT JOIN CHECKLIST_DOC CD ON CD.LIST_ID = CM.LIST_ID`;
        var query = `SELECT * FROM BUS_CHECKLIST_DOC`;
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

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
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getSavedList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
                CO.*,IMG.IMG_NAME,ID.TRAN_ID,ID.OFFER_PRICE,T1.BUYER,
                T1.BUYER_PROF,T1.BUYER_PROF_ID,T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
                        FROM INTRSDATA ID
                        LEFT JOIN COMPANY_DETAILS CO ON ID.COMPANY_ID=CO.COMPANY_ID
                        LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID
                        LEFT JOIN(
                            SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,IT.TRAN_ID,
                            PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
                            FROM [USER] USR 
                            LEFT JOIN INTRSDATA IT ON IT.USER_ID = USR.ID
                            LEFT JOIN (SELECT * FROM  USER_SERVICE WHERE SERVICE_TYPE='Principle Agent') US				
                                ON US.TRAN_ID = IT.TRAN_ID
                            LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                           
                        ) T1        
                        ON T1.TRAN_ID = ID.TRAN_ID	
                        LEFT JOIN(
                            SELECT 
                            USR.USER_FIRSTNAME AS SELLER,IT.TRAN_ID,
                            PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                            FROM [USER] USR
                            LEFT JOIN COMPANY_DETAILS CD ON CD.USER_ID = USR.ID
                            LEFT JOIN INTRSDATA IT ON IT.COMPANY_ID = CD.COMPANY_ID
                            LEFT JOIN (SELECT * FROM  BUSINESS_SERVICE WHERE SERVICE_TYPE='Principle Agent') BS                
                            ON IT.COMPANY_ID = BS.COMPANY_ID	
                            LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                          
                        )T2                
                        ON T1.TRAN_ID = T2.TRAN_ID
                        WHERE ID.[USER_ID] = ${v1}
                        ORDER BY CO.COMPANY_ID DESC`;
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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getBuyerInterestList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
        CO.*,IMG.IMG_NAME,ID.TRAN_ID,ID.OFFER_PRICE,ID.USER_ID AS BUYER_ID,T1.BUYER,
        T1.BUYER_PROF,T1.BUYER_PROF_ID,T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
                  FROM INTRSDATA ID
                  LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=ID.COMPANY_ID
                  LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID
                  LEFT JOIN(
                    SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,IT.TRAN_ID,
                    PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
                    FROM [USER] USR 
                    LEFT JOIN INTRSDATA IT ON IT.USER_ID = USR.ID
                    LEFT JOIN (SELECT * FROM  USER_SERVICE WHERE SERVICE_TYPE='Principle Agent') US				
                        ON US.TRAN_ID = IT.TRAN_ID
                    LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                   
                ) T1        
                ON T1.TRAN_ID = ID.TRAN_ID	
                LEFT JOIN(
                    SELECT 
                    USR.USER_FIRSTNAME AS SELLER,IT.TRAN_ID,
                    PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                    FROM [USER] USR
                    LEFT JOIN COMPANY_DETAILS CD ON CD.USER_ID = USR.ID
                    LEFT JOIN INTRSDATA IT ON IT.COMPANY_ID = CD.COMPANY_ID
                    LEFT JOIN (SELECT * FROM  BUSINESS_SERVICE WHERE SERVICE_TYPE='Principle Agent') BS                
                    ON IT.COMPANY_ID = BS.COMPANY_ID	
                    LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                  
                )T2                
                ON T1.TRAN_ID = T2.TRAN_ID
              WHERE CO.[USER_ID] = ${v1}
              ORDER BY ID.[USER_ID] DESC`;           

        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                console.log(rows);
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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
        }
            connection.release();
        });
        connection.execSql(request);
    });
}

// function getBuyerInterestList(v1, cb) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log(v1);
//         var jsonArray = [];
//         var query = "GET_BUYER_INTERESTLIST";
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err)
//             } else {               
//             for (let i = 0; i < rowCount; i++) {
//                 var rowObject = {};
//                 var singleRowData = rows[i];
//                 for (let j = 0; j < singleRowData.length; j++) {
//                     var tempColName = singleRowData[j].metadata.colName;
//                     var tempColData = singleRowData[j].value;
//                     rowObject[tempColName] = tempColData;
//                 }
//                 jsonArray.push(rowObject);
//             }

//             if (jsonArray.length > 0) {
//                 // console.log(jsonArray);
//                 cb(null, jsonArray);
//             } else {
//                 cb(null, [{
//                     "status": "No Data Found"
//                 }]);
//             }
//         }
//             connection.release();
//         });
//         request.addParameter('USER_ID', sql.VarChar, v1);
//         connection.callProcedure(request);       
//     });
// }

function getprofessionalTransaction(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
        CO.*,IMG.IMG_NAME,ID.TRAN_ID,ID.OFFER_PRICE,T1.BUYER,T1.BUYER_PROF,T1.BUYER_PROF_ID,
        T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
               FROM INTRSDATA ID 
               LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=ID.COMPANY_ID
               LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID 
               LEFT JOIN(
                SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,IT.TRAN_ID,
                PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
                FROM [USER] USR 
                LEFT JOIN INTRSDATA IT ON IT.USER_ID = USR.ID
                LEFT JOIN USER_SERVICE US ON US.TRAN_ID = IT.TRAN_ID
                LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                WHERE US.SERVICE_TYPE='Principle Agent'
            ) T1
            ON T1.TRAN_ID = ID.TRAN_ID
            LEFT JOIN(
                SELECT 
                USR.USER_FIRSTNAME AS SELLER,IT.TRAN_ID,
                PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                FROM [USER] USR
                LEFT JOIN COMPANY_DETAILS CD ON CD.USER_ID = USR.ID
                LEFT JOIN INTRSDATA IT ON IT.COMPANY_ID = CD.COMPANY_ID
                LEFT JOIN BUSINESS_SERVICE BS ON IT.COMPANY_ID = BS.COMPANY_ID
                LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                WHERE BS.SERVICE_TYPE='Principle Agent'
            )T2
            ON T1.TRAN_ID = T2.TRAN_ID
               WHERE T2.[USER_ID] = ${v1}`;
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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getprofTranBuyer(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
        CO.*,IMG.IMG_NAME,ID.TRAN_ID,ID.OFFER_PRICE,T1.BUYER,T1.BUYER_PROF,T1.BUYER_PROF_ID,
        T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
               FROM USER_SERVICE US
               LEFT JOIN INTRSDATA ID ON ID.TRAN_ID=US.TRAN_ID
               LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=ID.COMPANY_ID
               LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID 
               LEFT JOIN(
                SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,IT.TRAN_ID,
                PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
                FROM [USER] USR 
                LEFT JOIN INTRSDATA IT ON IT.USER_ID = USR.ID
                LEFT JOIN USER_SERVICE US ON US.TRAN_ID = IT.TRAN_ID
                LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                WHERE US.SERVICE_TYPE='Principle Agent'
            ) T1
            ON T1.TRAN_ID = ID.TRAN_ID
            LEFT JOIN(
                SELECT 
                USR.USER_FIRSTNAME AS SELLER,IT.TRAN_ID,
                PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                FROM [USER] USR
                LEFT JOIN COMPANY_DETAILS CD ON CD.USER_ID = USR.ID
                LEFT JOIN INTRSDATA IT ON IT.COMPANY_ID = CD.COMPANY_ID
                LEFT JOIN BUSINESS_SERVICE BS ON IT.COMPANY_ID = BS.COMPANY_ID
                LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                WHERE BS.SERVICE_TYPE='Principle Agent'
            )T2
            ON T1.TRAN_ID = T2.TRAN_ID
            WHERE T1.[USER_ID] = ${v1}`;
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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function getbizUser(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT CD.COMPANY_ID,CD.TITLE,CD.USER_ID AS SELLER_ID,
        CD.TITLE,CD.ADDRESS,CD.PRICE,CD.STATE,CD.COUNTY,CD.CATEGORY,CD.PUBLISHED,
        PM.USERNAME AS PRINCIPLE_AGENT,PM.EMAIL AS AGENT_MAIL FROM [COMPANY_DETAILS] CD
        LEFT JOIN(SELECT * FROM  BUSINESS_SERVICE BS WHERE BS.SERVICE_TYPE='Principle Agent') T1
         ON CD.COMPANY_ID = T1.COMPANY_ID
        LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = T1.PROF_ID WHERE CD.USER_ID=${v1}`;

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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function userlogin(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = "SELECT * FROM [USER] WHERE USER_EMAIL='" + v1.Email + "' AND USER_PASSWORD='" + v1.Password + "' AND USER_CONTROL = 1";

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
            } else {
                cb(null, [{
                    "status": "Credential Failed"
                }]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function checkFirstUser(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        
        var query = "SP_CHECK_FIRSTUSER";       
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
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        request.addParameter('USER_ID', sql.VarChar, v1);
        connection.callProcedure(request);
    });
}

function createUser(v1, cb) {
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

// function createProfessional(v1, cb) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         //  var query = "SP_CreateProfessional";
//         var query = "SP_CreateProfessionals";       
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 cb(null, rowCount);
//             }
//             connection.release();
//         });
//         request.addParameter('USERNAME', sql.VarChar, v1.UserName);
//         request.addParameter('FIRSTNAME', sql.VarChar, v1.FirstName);
//         request.addParameter('LASTNAME', sql.VarChar, v1.LastName);
//         request.addParameter('EMAIL', sql.VarChar, v1.Email);
//         request.addParameter('STATE', sql.VarChar, v1.State);
//         request.addParameter('CITY', sql.VarChar, v1.City);
//         request.addParameter('ZIPCODE', sql.VarChar, v1.ZipCode);
//         request.addParameter('ADDRESS', sql.VarChar, v1.Address);
//         request.addParameter('ABOUT', sql.VarChar, v1.About);
//         request.addParameter('CATEGORY', sql.VarChar, v1.Category);
//         request.addParameter('SPECIALITY', sql.VarChar, v1.SubCategory);
//         request.addParameter('PUBLISHED', sql.VarChar, v1.flag);
//         request.addParameter('USERID',sql.VarChar,v1.UserId)

//         connection.callProcedure(request);
//     });
// }

function createInstruction(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO INSTRUCTION VALUES ('" + v1.UserId + "',0,'" + v1.State + "','" + v1.City + "','" + v1.Category + "','" + v1.SubCategory + "','" + v1.Instruction + "')";
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

function createBusinessChecklist(v1, cb) {
    for (let i = 0; i < v1.list.length; i++) {
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO BUSINESS_CHECKLIST VALUES ('"+v1.companyId+"','"+v1.ListId+"','" +v1.list[i].Order_num+"','"+v1.list[i].Instruction+"')";
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

function createChecklist(v1, cb) {
    for (let i = 0; i < v1.list.length; i++) {
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO CHECKLIST_MSTR VALUES ('"+v1.detail.ProfId+"','"+v1.detail.ListId+"','" +v1.detail.State+"','" +v1.detail.County+"','" +v1.detail.Category+"','"+v1.detail.SubCategory+"','" +v1.list[i]+"')";
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

// function createChecklist(v1, cb) {
//     for (let i = 0; i < v1.list.length; i++) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         var query = "SP_CreateCheckList";
//         console.log(v1);
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err);
//             } else {
                
//             }
//             connection.release();
//         });
//         request.addParameter('PROF_ID', sql.VarChar, v1.detail.ProfId);
//         request.addParameter('LIST_ID', sql.VarChar, v1.FirstName);
//         request.addParameter('STATE', sql.VarChar, v1.detail.State);
//         request.addParameter('COUNTY', sql.VarChar, v1.detail.County);
//         request.addParameter('CATEGORY', sql.VarChar, v1.detail.Category);
//         request.addParameter('SUB_CATEGORY', sql.VarChar, v1.detail.SubCategory);
//         request.addParameter('INSTRUCTION', sql.VarChar, v1.list[i]);

//       connection.callProcedure(request);
//      });
//    }
//      cb(null, rowCount);
// }

function getLocation(cb) {
    var query = "select distinct Location from demo";
    console.log(query)
    config.query(query, function (err, result) {
        if (err) {

            cb(err, null);

        } else {
            cb(null, result);
        }
    });
}

function getId(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT IMG_NAME FROM IMAGE_MSTR WHERE PRIMARY_IMAGE=1";
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

function getServices(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM USER_SERVICE US LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID WHERE US.SERVICE_TYPE <> 'Principle Agent' AND US.TRAN_ID='"+v1.TranId+"' ";
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
            }else {
                cb(null, [{"status": "No Data Found"}]);
            }
            connection.release();
        });
        connection.execSql(request);
    });
}

function publishProduct(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "UPDATE COMPANY_DETAILS SET PUBLISHED = 1 WHERE COMPANY_ID='" + v1.com_id + "'";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });

        connection.execSql(request);
    });
}

function hideProduct(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "UPDATE COMPANY_DETAILS SET PUBLISHED = 0 WHERE COMPANY_ID='" + v1.com_id + "'";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });

        connection.execSql(request);
    });
}

function saveList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = `DECLARE @START VARCHAR(30) = 'TRAN#BUY00'
                 DECLARE @TRAN_ID VARCHAR(100)
                 SET @TRAN_ID = (SELECT CONCAT (@START,${v1.user_id},${v1.com_id}))
                 INSERT INTO [INTRSDATA]
                 VALUES (${v1.user_id},${v1.com_id},@TRAN_ID,0)`;

        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });

        connection.execSql(request);
    });
}

function removeSavedList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('data', v1);
        var query = `DELETE FROM [INTRSDATA] WHERE [USER_ID] =${v1.user_id} AND COMPANY_ID=${v1.com_id} `;

        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });

        connection.execSql(request);
    });
}

module.exports = {
    getUsers: getUsers,
    getVechicle: getVechicle,
    userlogin: userlogin,
    getLocation: getLocation,
    getId: getId,
    createUser: createUser,
    getbizUser: getbizUser,
    publishProduct: publishProduct,
    hideProduct: hideProduct,
    getUserList: getUserList,
    // createProfessional: createProfessional,   
    createInstruction: createInstruction,
    getInstructionList: getInstructionList,
    getSavedList: getSavedList,
    saveList: saveList,
    removeSavedList: removeSavedList,
    uploadPDF: uploadPDF,
    getBuyerInterestList: getBuyerInterestList,
    createChecklist: createChecklist,
    uploadCheclistDoc: uploadCheclistDoc,
    getServices: getServices,
    createBusinessChecklist: createBusinessChecklist,
    upBusChecklistDoc: upBusChecklistDoc,
    getBusChecklistDoc: getBusChecklistDoc,
    getprofessionalTransaction: getprofessionalTransaction,
    checkFirstUser: checkFirstUser,
    getprofTranBuyer: getprofTranBuyer, 
    
};