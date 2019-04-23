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

function getCategory(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from category";
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

function getSubCategory(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from sub_category";
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

function getSubchildCategory(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from sub2_category";
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

function getState(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [states]";
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

function getCounty(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [cities]";
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

function getProductList(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT CO.*,IMG.IMG_NAME,VE.AFLAG,BU.BUILDING_TYPE FROM COMPANY_DETAILS CO LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID LEFT JOIN VERIFIED VE ON CO.COMPANY_ID=VE.COMPANY_ID LEFT JOIN BUILDING_STATUS BU ON CO.COMPANY_ID=BU.COMPANY_ID WHERE CO.PUBLISHED=1 ORDER BY CO.COMPANY_ID DESC";
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

function getState(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [states]";
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

function BuildingTypes(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [BUILDING_TYPES]";
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

function BuildingSubTypes(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from [BUILDING_SUBTYPES]";
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

function getProcessMstr(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM PROCESS_OVERVIEW_MSTR";
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

function getMaxListId(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT MAX(LIST_ID) AS LIST_ID FROM BUSINESS_CHECKLIST";
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

function getLease(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = `SELECT CO.*,IMG.IMG_NAME,VE.AFLAG,BU.BUILDING_TYPE FROM COMPANY_DETAILS CO 
        // LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID 
        // LEFT JOIN VERIFIED VE ON CO.COMPANY_ID=VE.COMPANY_ID 
        // LEFT JOIN BUILDING_STATUS BU ON CO.COMPANY_ID=BU.COMPANY_ID 
        // WHERE CO.PUBLISHED=1 AND CO.SELL_TYPE=1 
        // ORDER BY CO.COMPANY_ID DESC` ;

        var query = `SELECT  *,BE.BUS_ENT_ID AS BIZ_ID FROM BUSINESS_ENTITY BE
        LEFT JOIN USER_PERSONAL_INFO UPI ON BE.USER_ID=UPI.USER_ID
        LEFT JOIN BUILDING_INFO BI ON BE.BUS_ENT_ID = BI.BUS_ENT_ID
        LEFT JOIN LEASE_TERMS LT ON LT.BUS_ENT_ID = BI.BUS_ENT_ID
        LEFT JOIN LEASE_PREMISES LP ON LP.BUS_ENT_ID = BI.BUS_ENT_ID
        LEFT JOIN LEASE_PRIME_IMAGE LPI ON LPI.BUS_ENT_ID = LP.BUS_ENT_ID WHERE BE.PUBLISHED = 1`;
        

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

function getProfessionals(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT PM.*,PIM.IMG_NAME FROM [PROFESSIONALS_DATA] PM LEFT JOIN [PROFESSIONAL_IMAGES] PIM ON PM.ID = PIM.ID ORDER BY PM.ID DESC";
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

function getProfbyId(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        // var query = `SELECT PM.*,PIM.IMG_NAME FROM [PROFESSIONALS_DATA] PM 
        //         LEFT JOIN [PROFESSIONAL_IMAGES] PIM 
        //         ON PM.USERNAME = PIM.[USER_NAME]
        //         WHERE PM.ID=${v1} `;
        var query = `SELECT PM.*,PIM.IMG_NAME,PDR.DRIVER_LICENSE_REPORT,PIN.PROF_INSURANCE_REPORT,
        PLR.PROF_LICENSE_REPORT,PBL.BUSINESS_LICENSE_REPORT FROM [PROFESSIONALS_DATA] PM 
        LEFT JOIN [PROFESSIONAL_IMAGES] PIM ON PM.ID = PIM.ID
        LEFT JOIN [PROF_DRIVER_LICENSE_REPORT] PDR ON PDR.ID = PM.ID
        LEFT JOIN [PROF_INSURANCE_REPORT] PIN ON PIN.ID = PM.ID
        LEFT JOIN [PROFESSIONAL_LICENSE_REPORT] PLR ON PLR.ID = PM.ID
        LEFT JOIN [PROF_BUSINESS_LICENSE_REPORT] PBL ON PBL.ID = PM.ID
        WHERE PM.ID=${v1} `;
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

function getUserRequests(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SP_GetNotification";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else { }
                
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
            }  else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }             
            
            connection.release();
        });
        request.addParameter('User_id', sql.VarChar, v1);    
        connection.callProcedure(request);
    });

}

// function getUserRequests(v1, cb) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         var jsonArray = [];
//         var query = `SELECT PM.*,PIM.IMG_NAME FROM [PROFESSIONALS_DATA] PM 
//                 LEFT JOIN [PROFESSIONAL_IMAGES] PIM 
//                 ON PM.USERNAME = PIM.[USER_NAME]
//                 WHERE PM.ID=${v1} `;
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err)
//             } else {}
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
//             }
//             connection.release();
//         });
//         connection.execSql(request);
//     });
// }

function getProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM PROFESSIONALS_DATA WHERE [USER_ID] = ${v1}`;
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

function getListByTranId(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("tran",v1.tran_id);
        var jsonArray = [];
        var query = "SELECT CM.* FROM TRANSACTION_MSTR TM LEFT JOIN INTRSDATA IT ON IT.TRAN_ID = TM.TRAN_ID LEFT JOIN CHECKLIST_MSTR CM ON CM.LIST_ID = TM.LIST_ID WHERE TM.TRAN_ID = '"+v1.tran_id+"' ";
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

function acceptRequest(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }        
        
        var query = "UPDATE PROF_USER_REQUEST SET ISACCEPT=1 WHERE TRAN_ID ='"+v1.tran_id+"'";
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

function hireProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "INSERT INTO USER_SERVICE VALUES ('"+ v1.User_Id +"','"+ v1.Tran_Id +"','"+ v1.Prof_Id +"','"+v1.service+"',0)";
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

function updateProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query="UPDATE USER_SERVICE SET PROF_ID ='"+ v1.Prof_Id +"' WHERE TRAN_ID='"+ v1.Tran_Id +"' AND USER_ID ='"+ v1.User_Id +"' AND SERVICE_TYPE='"+v1.service+"'";
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

function removeProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query="DELETE FROM USER_SERVICE WHERE PROF_ID ='"+ v1.Prof_Id +"' AND TRAN_ID='"+ v1.Tran_Id +"' AND USER_ID ='"+ v1.User_Id +"' AND SERVICE_TYPE='"+v1.service+"'";
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

function getTransactionsList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
      //  var query = "SELECT * FROM INTRSDATA WHERE USER_ID='"+v1+"'";

        var query =`SELECT * FROM INTRSDATA IT
                    LEFT JOIN DATA_ROOM_STATUS DRS
                    ON IT.TRAN_ID=DRS.TRAN_ID 
                    LEFT JOIN COMPANY_DETAILS CO ON CO.COMPANY_ID=IT.COMPANY_ID
                    WHERE DRS.SELLER_ACCEPT = 1 AND IT.USER_ID = ${v1} `
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

function getTransBusinessList(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT LI.LICENSE_IMG,LI.LICENSE_IMG_DIRECTORY,SOC.SOC_IMG,LIR.LIR_IMG,BN.BANK_IMG,
        CR.CERTFICATE_IMG,RP.RP_IMG,FIN.FIN_IMG,INR.INR_IMG,ND.NDA_IMG,PR.PR_IMG
        FROM LICENSE_MSTR LI
        LEFT JOIN SOCIAL_SECURITY_MSTR SOC ON LI.COMPANY_ID=SOC.COMPANY_ID
        LEFT JOIN LICENSE_REPORT_IMAGE LIR ON LI.COMPANY_ID=LIR.COMPANY_ID
        LEFT JOIN BANK_REPORT_IMAGE BN ON LI.COMPANY_ID=BN.COMPANY_ID
        LEFT JOIN CERTIFICATE_REPORT_IMAGE CR ON LI.COMPANY_ID=CR.COMPANY_ID
        LEFT JOIN REPORTS_IMAGE RP ON LI.COMPANY_ID=RP.COMPANY_ID
        LEFT JOIN FIN_STATEMENT_IMAGE FIN ON LI.COMPANY_ID=FIN.COMPANY_ID
        LEFT JOIN INSURANCE_REPORT_IMAGE INR ON LI.COMPANY_ID=INR.COMPANY_ID
        LEFT JOIN NDA_REPORT ND ON LI.COMPANY_ID=ND.COMPANY_ID
        LEFT JOIN PREMISE_LEASE_IMAGE PR ON LI.COMPANY_ID=PR.COMPANY_ID       
        WHERE LI.COMPANY_ID= ${v1}`;   
     
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

function getDataRoomRequest(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT DT.*,USR.USER_FIRSTNAME AS BUYER_NAME
                    FROM DATA_ROOM_STATUS DT
                    LEFT JOIN [USER] USR ON USR.ID = DT.BUYER_ID
                    WHERE DT.SELLER_ID = ${v1} AND DT.SELLER_ACCEPT = 0 `;
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

function acceptDataroom(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "UPDATE DATA_ROOM_STATUS SET SELLER_ACCEPT = 1 WHERE TRAN_ID='"+ v1.TranId +"'";
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

function requestDataroom(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
       // var query = "INSERT INTO DATA_ROOM_STATUS VALUES ('"+v1.TranId+"',1,1,'"+v1.SellerId+"','"+v1.BuyerId+"')";
       var query = `IF NOT EXISTS ( SELECT * FROM DATA_ROOM_STATUS WHERE TRAN_ID='${v1.TranId}')
        BEGIN
            INSERT INTO DATA_ROOM_STATUS VALUES ('${v1.TranId}',1,1,'${v1.SellerId}','${v1.BuyerId}')
        END`;
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
    getCategory: getCategory,
    getSubCategory: getSubCategory,
    getSubchildCategory: getSubchildCategory,
    getState: getState,
    getCounty: getCounty,
    getProductList: getProductList,
    BuildingTypes: BuildingTypes,
    BuildingSubTypes: BuildingSubTypes,
    getProcessMstr: getProcessMstr,
    getLease: getLease,
    getProfessionals: getProfessionals,
    getProfbyId: getProfbyId,
    getMaxListId : getMaxListId,
    getListByTranId:getListByTranId,
    hireProfessional: hireProfessional,
    getUserRequests: getUserRequests,
    acceptRequest : acceptRequest,
    getProfessional: getProfessional,
    getTransactionsList: getTransactionsList,
    getTransBusinessList: getTransBusinessList,
    requestDataroom: requestDataroom,
    acceptDataroom: acceptDataroom,
    getDataRoomRequest: getDataRoomRequest,
    updateProfessional: updateProfessional,
    removeProfessional: removeProfessional
};