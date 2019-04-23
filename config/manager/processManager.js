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


function putOfferPrice(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "UPDATE INTRSDATA SET OFFER_PRICE ='"+v1.offerPrice+"' WHERE TRAN_ID = '"+v1.TranId+"'";
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

function createBusinessProcess(v1, cb) {
    for (let i = 0; i < v1.list.length; i++) {
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO SELLER_PROCESS_OVERFLOW VALUES ('"+v1.companyId+"','"+v1.UserId+"','" +v1.list[i].Order_num+"','"+v1.list[i].Instruction+"')";
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

function updateBuyerProcess(v1, cb) {
    console.log(v1);
    for (let i = 0; i < v1.length; i++) {
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO BUYER_PROCESS_OVERFLOW VALUES ('"+v1[i].TRAN_ID+"','"+v1[i].USER_ID+"','" +v1[i].ORDER_NUM+"','"+v1[i].STATUS+"')";
        //     var query = `IF EXISTS (SELECT * FROM BUYER_PROCESS_OVERFLOW WHERE TRAN_ID= '${v1[i].TRAN_ID}')
        //     BEGIN
        //        DELETE FROM BUYER_PROCESS_OVERFLOW WHERE TRAN_ID = '${v1[i].TRAN_ID}'
        //        INSERT INTO BUYER_PROCESS_OVERFLOW VALUES ('${v1[i].TRAN_ID}','${v1[i].USER_ID}',${v1[i].ORDER_NUM},${v1[i].STATUS})
        //     END
        //  ELSE
        //    BEGIN
        //      INSERT INTO BUYER_PROCESS_OVERFLOW VALUES ('${v1[i].TRAN_ID}','${v1[i].USER_ID}',${v1[i].ORDER_NUM},${v1[i].STATUS})
        //    END`
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

function deleteProcess(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }       
        var query = `DELETE FROM SELLER_PROCESS_OVERFLOW WHERE COMPANY_ID = '${v1}'`;
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


function getProcessbyTran(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT BPO.TRAN_ID,SPO.COMPANY_ID,BPO.ORDER_NUM,STEPS,BPO.[STATUS] FROM BUYER_PROCESS_OVERFLOW BPO LEFT JOIN SELLER_PROCESS_OVERFLOW SPO ON BPO.ORDER_NUM = SPO.ORDER_NUM WHERE BPO.TRAN_ID ='"+ v1.TranId+"' AND SPO.COMPANY_ID='"+ v1.ComId+"'";
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

function deleteProcessbyTran(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }       
        var query = `DELETE FROM BUYER_PROCESS_OVERFLOW WHERE TRAN_ID = '${v1.TRAN_ID}'`;
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

// prof part

function getDetailsbyTran(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
       // var query = "SELECT BPO.TRAN_ID,SPO.COMPANY_ID,BPO.ORDER_NUM,STEPS,BPO.[STATUS] FROM BUYER_PROCESS_OVERFLOW BPO LEFT JOIN SELLER_PROCESS_OVERFLOW SPO ON BPO.ORDER_NUM = SPO.ORDER_NUM WHERE BPO.TRAN_ID ='"+ v1.TranId+"' AND SPO.COMPANY_ID='"+ v1.ComId+"'";
       var query = `SELECT 
       CO.*,IMG.IMG_NAME,ID.TRAN_ID,T1.BUYER,T1.BUYER_PROF,T1.BUYER_PROF_ID,
       T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
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
              WHERE ID.TRAN_ID = '${v1.TranId}'`
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

function getProfSellerList(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM BUSINESS_SERVICE BS
                    LEFT JOIN INTRSDATA ID ON BS.COMPANY_ID=ID.COMPANY_ID
                    LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=BS.COMPANY_ID
                    WHERE PROF_ID=${v1}`;
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

function getProfBuyerList(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM USER_SERVICE US
                LEFT JOIN INTRSDATA ID ON US.TRAN_ID=ID.TRAN_ID
                LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=ID.COMPANY_ID
                WHERE PROF_ID=${v1}`;
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


function getNDA(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM NDA_REPORT WHERE COMPANY_ID=${v1}`;
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

    createBusinessProcess: createBusinessProcess,
    updateBuyerProcess: updateBuyerProcess,
    getProcessbyTran: getProcessbyTran,
    deleteProcessbyTran: deleteProcessbyTran,
    getDetailsbyTran: getDetailsbyTran,
    getProfSellerList: getProfSellerList,
    getProfBuyerList: getProfBuyerList,
    putOfferPrice: putOfferPrice,
    deleteProcess: deleteProcess,
    getNDA: getNDA
};