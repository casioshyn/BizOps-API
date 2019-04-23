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

function EquipmentDetails(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "select * from Equipment_Details where COMPANY_ID='" + v1 + "'";
        console.log(query);
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

function deleteEquipmentDetails(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "delete from Equipment_Details where COMPANY_ID='" + v1 + "'";
        console.log(query);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(null, [{
                    "status": "success"
                }]);
            }

            connection.release();
        });
        connection.execSql(request);
    });
}

function createEquip(v1, cb) {

    for (let i = 0; i < v1.values.length; i++) {
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO Equipment_Details VALUES ('" + v1.com_id + "','" + v1.values[i].name + "','" + v1.values[i].value + "') ";


            console.log(query)
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

// function createEquip(v1,cb) {
//     console.log("...........................................");
//     console.log(v1);



//     config.acquire(function(err,connection){    
//         if (err) {
//         console.error(err);
//         return;
//     } 

//     for(var i=0;i<v1.values.length;i++){ 
//     console.log('set1',v1.values[i].name);

//     var query = "SP_CreateEquip";
//     const request = new Request(query, (err,rowCount,rows) => {
//         if (err){  
//             console.log(err);
//           }
//           else{
//             //   console.log(rowCount,rows[0]);
//             // cb(null,1);

//             } 
//             connection.release();
//         });    
//     console.log('set2',v1.values[i].name);

//         request.addParameter('COMPANY_ID', sql.Int, v1.com_id);
//         request.addParameter('EQUIPMENT_NAME', sql.VarChar,v1.values[i].name);
//         request.addParameter('NO_OF_EQUIPMENTS', sql.VarChar, v1.values[i].value);



// connection.callProcedure(request);
// }
// cb(null,'success');
//     });


// }
module.exports = {
    EquipmentDetails: EquipmentDetails,
    deleteEquipmentDetails: deleteEquipmentDetails,
    createEquip: createEquip
};