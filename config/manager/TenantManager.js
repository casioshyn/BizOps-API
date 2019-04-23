"use strict";

var db = require("../db");
const multer = require("multer");
const ConnectionPool = require("tedious-connection-pool");
const Request = require("tedious").Request;
const sql = require("tedious").TYPES;

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

function saveLeaseList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = `DECLARE @START VARCHAR(30) = 'TRAN#LEASE00'
                 DECLARE @TRAN_ID VARCHAR(100)
                 SET @TRAN_ID = (SELECT CONCAT (@START,${v1.user_id},${v1.com_id}))
                 INSERT INTO TENANT_INTEREST_LIST
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

function getTenantInterestList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
        BE.*,IMG.IMG_NAME,TIL.TRAN_ID,TIL.OFFER_PRICE,TIL.USER_ID AS BUYER_ID,T1.BUYER,
        T1.BUYER_PROF,T1.BUYER_PROF_ID,T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
                  FROM TENANT_INTEREST_LIST TIL
                  LEFT JOIN BUSINESS_ENTITY BE ON BE.BUS_ENT_ID=TIL.COMPANY_ID  
				  LEFT JOIN LEASE_PRIME_IMAGE IMG ON BE.BUS_ENT_ID=IMG.BUS_ENT_ID               
                  LEFT JOIN(
						SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,TIL.TRAN_ID,
						PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
						FROM [USER] USR 
						LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.USER_ID = USR.ID
						LEFT JOIN (SELECT * FROM  USER_SERVICE WHERE SERVICE_TYPE='Principle Agent') US				
							ON US.TRAN_ID = TIL.TRAN_ID
						LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                   
                ) T1        
                ON T1.TRAN_ID = TIL.TRAN_ID	
                LEFT JOIN(
                    SELECT 
                    USR.USER_FIRSTNAME AS SELLER,TIL.TRAN_ID,
                    PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                    FROM [USER] USR
                    LEFT JOIN BUSINESS_ENTITY CD ON CD.USER_ID = USR.ID
                    LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.COMPANY_ID = CD.BUS_ENT_ID
                    LEFT JOIN (SELECT * FROM  BUSINESS_SERVICE WHERE SERVICE_TYPE='Principle Agent') BS                
                    ON TIL.COMPANY_ID = BS.COMPANY_ID	
                    LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                  
                )T2                
                ON T1.TRAN_ID = T2.TRAN_ID
				 WHERE BE.[USER_ID] = ${v1}
                 ORDER BY TIL.[USER_ID] DESC`;           

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

function getTenantLeaseList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT 
        BE.*,IMG.IMG_NAME,TIL.TRAN_ID,TIL.OFFER_PRICE,TIL.USER_ID AS BUYER_ID,T1.BUYER,
        T1.BUYER_PROF,T1.BUYER_PROF_ID,T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
                  FROM TENANT_INTEREST_LIST TIL
                  LEFT JOIN BUSINESS_ENTITY BE ON BE.BUS_ENT_ID=TIL.COMPANY_ID  
				  LEFT JOIN LEASE_PRIME_IMAGE IMG ON BE.BUS_ENT_ID=IMG.BUS_ENT_ID               
                  LEFT JOIN(
						SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,TIL.TRAN_ID,
						PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
						FROM [USER] USR 
						LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.USER_ID = USR.ID
						LEFT JOIN (SELECT * FROM  USER_SERVICE WHERE SERVICE_TYPE='Principle Agent') US				
							ON US.TRAN_ID = TIL.TRAN_ID
						LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                   
                ) T1        
                ON T1.TRAN_ID = TIL.TRAN_ID	
                LEFT JOIN(
                    SELECT 
                    USR.USER_FIRSTNAME AS SELLER,TIL.TRAN_ID,
                    PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                    FROM [USER] USR
                    LEFT JOIN BUSINESS_ENTITY CD ON CD.USER_ID = USR.ID
                    LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.COMPANY_ID = CD.BUS_ENT_ID
                    LEFT JOIN (SELECT * FROM  BUSINESS_SERVICE WHERE SERVICE_TYPE='Principle Agent') BS                
                    ON TIL.COMPANY_ID = BS.COMPANY_ID	
                    LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                  
                )T2                
                ON T1.TRAN_ID = T2.TRAN_ID
				 WHERE TIL.[USER_ID] = ${v1}`;           

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

function checkExistingTenant(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT USER_ID FROM USER_PERSONAL_INFO WHERE USER_TYPE = 4 AND USER_ID =${v1}`;           

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

function checkAlreadySaved(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM TENANT_INTEREST_LIST WHERE USER_ID =${v1} `;           

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

function getProfLandlordList(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM BUSINESS_SERVICE BS
        INNER JOIN TENANT_INTEREST_LIST ID ON BS.COMPANY_ID=ID.COMPANY_ID
        LEFT JOIN BUSINESS_ENTITY BE ON BE.BUS_ENT_ID=BS.COMPANY_ID
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

function getProfTenantList(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `SELECT * FROM USER_SERVICE US
                 INNER JOIN TENANT_INTEREST_LIST ID ON US.TRAN_ID=ID.TRAN_ID
                 LEFT JOIN BUSINESS_ENTITY BE ON BE.BUS_ENT_ID=ID.COMPANY_ID
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

function getDetailsbyLeaseTran(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
       // var query = "SELECT BPO.TRAN_ID,SPO.COMPANY_ID,BPO.ORDER_NUM,STEPS,BPO.[STATUS] FROM BUYER_PROCESS_OVERFLOW BPO LEFT JOIN SELLER_PROCESS_OVERFLOW SPO ON BPO.ORDER_NUM = SPO.ORDER_NUM WHERE BPO.TRAN_ID ='"+ v1.TranId+"' AND SPO.COMPANY_ID='"+ v1.ComId+"'";
       var query = `SELECT 
       BE.*,IMG.IMG_NAME,TIL.TRAN_ID,TIL.OFFER_PRICE,TIL.USER_ID AS BUYER_ID,T1.BUYER,
       T1.BUYER_PROF,T1.BUYER_PROF_ID,T2.SELLER,T2.SELLER_PROF,T2.SELLER_PROF_ID
                 FROM TENANT_INTEREST_LIST TIL
                 LEFT JOIN BUSINESS_ENTITY BE ON BE.BUS_ENT_ID=TIL.COMPANY_ID  
                 LEFT JOIN LEASE_PRIME_IMAGE IMG ON BE.BUS_ENT_ID=IMG.BUS_ENT_ID               
                 LEFT JOIN(
                       SELECT USR.ID,USR.USER_FIRSTNAME AS BUYER,TIL.TRAN_ID,
                       PM.USERNAME AS BUYER_PROF ,PM.ID AS BUYER_PROF_ID
                       FROM [USER] USR 
                       LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.USER_ID = USR.ID
                       LEFT JOIN (SELECT * FROM  USER_SERVICE WHERE SERVICE_TYPE='Principle Agent') US				
                           ON US.TRAN_ID = TIL.TRAN_ID
                       LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = US.PROF_ID
                  
               ) T1        
               ON T1.TRAN_ID = TIL.TRAN_ID	
               LEFT JOIN(
                   SELECT 
                   USR.USER_FIRSTNAME AS SELLER,TIL.TRAN_ID,
                   PM.USERNAME AS SELLER_PROF,PM.ID AS SELLER_PROF_ID
                   FROM [USER] USR
                   LEFT JOIN BUSINESS_ENTITY CD ON CD.USER_ID = USR.ID
                   LEFT JOIN TENANT_INTEREST_LIST TIL ON TIL.COMPANY_ID = CD.BUS_ENT_ID
                   LEFT JOIN (SELECT * FROM  BUSINESS_SERVICE WHERE SERVICE_TYPE='Principle Agent') BS                
                   ON TIL.COMPANY_ID = BS.COMPANY_ID	
                   LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = BS.PROF_ID
                 
               )T2                
               ON T1.TRAN_ID = T2.TRAN_ID               
               WHERE TIL.TRAN_ID = '${v1.TranId}'`
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
    saveLeaseList: saveLeaseList,
    getTenantInterestList: getTenantInterestList,
    getTenantLeaseList: getTenantLeaseList,
    checkExistingTenant: checkExistingTenant,
    checkAlreadySaved: checkAlreadySaved,
    getProfLandlordList: getProfLandlordList,
    getProfTenantList: getProfTenantList,
    getDetailsbyLeaseTran: getDetailsbyLeaseTran
  };