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


function getBizServices(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM BUSINESS_SERVICE BS LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID WHERE BS.SERVICE_TYPE <> 'Principle Agent' AND BS.COMPANY_ID='"+v1.ComId+"' ";
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

function hireBizProf(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO BUSINESS_SERVICE VALUES ('"+ v1.User_Id +"','"+ v1.ComId +"','"+ v1.Prof_Id +"','"+v1.service+"',0)";
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

function updateBizProf(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query="UPDATE BUSINESS_SERVICE SET PROF_ID ='"+ v1.Prof_Id +"' WHERE COMPANY_ID='"+ v1.ComId +"' AND USER_ID ='"+ v1.User_Id +"' AND SERVICE_TYPE='"+v1.service+"'";
      //  var query = "INSERT INTO USER_SERVICE VALUES ('"+ v1.User_Id +"','"+ v1.Tran_Id +"','"+ v1.Prof_Id +"','"+v1.service+"',0)";
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

function removeBizProf(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query="DELETE FROM BUSINESS_SERVICE WHERE PROF_ID ='"+ v1.Prof_Id +"' AND COMPANY_ID='"+ v1.ComId +"' AND USER_ID ='"+ v1.User_Id +"' AND SERVICE_TYPE='"+v1.service+"'";
      //  var query = "INSERT INTO USER_SERVICE VALUES ('"+ v1.User_Id +"','"+ v1.Tran_Id +"','"+ v1.Prof_Id +"','"+v1.service+"',0)";
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

function sellerPrincipleAgent(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO SELLER_PROF_REL VALUES ('"+ v1.UserId +"','"+ v1.ProfId +"','"+ v1.ComId +"')";
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

function buyerPrincipleAgent(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO BUYER_PROF_REL VALUES ('"+ v1.UserId +"','"+ v1.ProfId +"','"+ v1.TranId +"')";
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
function userProf(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO USER_PROF_SERVICE VALUES ('"+ v1.userID +"','"+ v1.userName +"','"+ v1.ProfName +"')";
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
function getuserProf(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM [USER_PROF_SERVICE]";
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
module.exports = {
    getBizServices: getBizServices, 
    hireBizProf: hireBizProf,
    updateBizProf: updateBizProf,
    removeBizProf: removeBizProf,
    sellerPrincipleAgent: sellerPrincipleAgent,
    buyerPrincipleAgent: buyerPrincipleAgent,
    userProf:userProf,
    getuserProf:getuserProf
};