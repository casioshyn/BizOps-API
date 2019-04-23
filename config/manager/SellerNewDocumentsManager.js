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

config.on('error', err => {
    if (err) {
        console.log('Error', err);
    }
    else {
        console.log("database connected !!!");

    }
});
const libilDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const retirePlanDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const keyContractDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const federalDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
var up_filename = "";
let federalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, federalDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let keyContractDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, keyContractDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let retirePlanDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, retirePlanDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let libilDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, libilDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
var libilReportPic = multer({ storage: libilDataStorage }).single('libilsImage');
var retirePlanPic = multer({ storage: retirePlanDataStorage }).single('retirePlanImage');
var keyContractPic = multer({ storage: keyContractDataStorage }).single('keyContractImage');
var federalPic = multer({ storage: federalStorage }).single('federalImage');
function libilReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        libilReportPic(req, res, function (err) {
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
                user = req.body.USERNAME;
                ID = req.body.Company_ID;
                
                var query = "SP_libilDocsReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('COMPANY_ID', sql.Int, ID);
                request.addParameter('LIBILS_REPORT', sql.VarChar, up_filename);
                request.addParameter('LIBILS_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}
function retirePlanReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        retirePlanPic(req, res, function (err) {
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
                user = req.body.USERNAME;
                ID = req.body.Company_ID;
                
                var query = "SP_retirePlanReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('COMPANY_ID', sql.Int,ID);
                request.addParameter('RETIRE_PLAN_REPORT', sql.VarChar, up_filename);
                request.addParameter('RETIRE_PLAN_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}
function keyContractReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        keyContractPic(req, res, function (err) {
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
                user = req.body.USERNAME;
                ID = req.body.Company_ID;
                
                var query = "SP_keyContractReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('COMPANY_ID', sql.Int, ID);
                request.addParameter('KEYCONTRACT_REPORT', sql.VarChar, up_filename);
                request.addParameter('KEYCONTRACT_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}
function federalDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        federalPic(req, res, function (err) {
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
                user = req.body.USERNAME;
                ID = req.body.Company_ID;
                
                var query = "SP_federalReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('COMPANY_ID', sql.Int,ID);
                request.addParameter('FEDERAL_REPORT', sql.VarChar, up_filename);
                request.addParameter('FEDERAL_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );              
                connection.callProcedure(request);   
        });
    });
}
module.exports = {
    libilReportUpload: libilReportUpload,
    retirePlanReportUpload: retirePlanReportUpload,
    keyContractReportUpload: keyContractReportUpload,  
    federalDataUpload: federalDataUpload
    
   
};