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

config.on('connect', err => {
    if (err) {
        console.log('ON', err);
    } else {
        console.log("database connected");
    }
});

function getPersonalInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM PERSONALINFO_STATUS WHERE COMPANY_ID=${v1}`;
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

function getBuildingInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM BUILDING_STATUS WHERE COMPANY_ID=${v1}`;
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

function getBusinessInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM COMPANY_DETAILS WHERE COMPANY_ID=${v1}`;
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

function getPremisesInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM PREMISES_STATUS WHERE COMPANY_ID=${v1}`;
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

function getFinancialInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM FINANCIAL_STATUS WHERE COMPANY_ID=${v1}`;
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

function getBuyerInfo(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT BD.*,BLR.LICENSE_REPORT,BFR.FIN_REPORT,BBR.BANK_REPORT
                        FROM BUYER_DETAILS BD
                        LEFT JOIN BUYER_LICENSE_REPORT BLR ON BD.ID = BLR.ID
                        LEFT JOIN BUYER_FIN_STATEMENT BFR ON BD.ID = BFR.ID
                        LEFT JOIN BUYER_BANK_REPORT BBR ON BD.ID = BBR.ID
                        WHERE BD.USER_ID = ${v1}`;
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

function getBuyerInfoByTran(v1,cb){
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT 
        BD.*,BLR.LICENSE_REPORT,BFR.FIN_REPORT,BBR.BANK_REPORT,BND.IMG_NAME AS NDA_SIGNED
                                FROM INTRSDATA BD                      
                                LEFT JOIN BUYER_LICENSE_REPORT BLR ON BD.USER_ID = BLR.ID
                                LEFT JOIN BUYER_FIN_STATEMENT BFR ON BD.USER_ID = BFR.ID
                                LEFT JOIN BUYER_BANK_REPORT BBR ON BD.USER_ID = BBR.ID
                                LEFT JOIN BUYER_NDA BND ON BD.USER_ID = BND.BUYER_ID 
                                AND BD.COMPANY_ID = BND.COMPANY_ID
                                WHERE BD.TRAN_ID = '${v1.TranId}'`;
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


module.exports = {
    getPersonalInfo: getPersonalInfo,
    getBuildingInfo: getBuildingInfo,
    getBusinessInfo: getBusinessInfo,
    getPremisesInfo: getPremisesInfo,
    getFinancialInfo: getFinancialInfo,
    getBuyerInfo: getBuyerInfo,
    getBuyerInfoByTran: getBuyerInfoByTran

};

