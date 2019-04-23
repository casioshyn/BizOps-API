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

const prime_img_dir = 'C:\\inetpub\\wwwroot\\assets\\img';
const Sec_img_dir = 'C:\\inetpub\\wwwroot\\assets\\img';
var fileName = "";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, prime_img_dir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        fileName = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, fileName);
    }
});

let secStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Sec_img_dir);
    },
    filename: (req, file, cb) => {
        fileName = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = multer({ storage: storage}).single('Prime-lease-img');
var secUpload = multer({storage: secStorage}).single('Sec-lease-img');

function uploadImage(req, res, cb) {
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
                user = req.body.user;
                company_id = req.body.Company_ID;
                console.log(company_id);

               // var query = "INSERT INTO LEASE_PRIME_IMAGE VALUES ('" + company_id + "','" + fileName + "','" + path + "') ";
              var query = `IF EXISTS (SELECT BUS_ENT_ID 
                FROM LEASE_PRIME_IMAGE 
                WHERE BUS_ENT_ID= ${company_id})
                BEGIN
                    UPDATE LEASE_PRIME_IMAGE
                    SET 			
                    [BUS_ENT_ID] = ${company_id},[IMG_NAME] = '${fileName}',
                    [IMG_DIR] = '${path}'
                    WHERE BUS_ENT_ID= ${company_id}	
                END
            ELSE
                BEGIN	 
                    INSERT INTO LEASE_PRIME_IMAGE([BUS_ENT_ID],[IMG_NAME],[IMG_DIR])
                    VALUES (${company_id},'${fileName}','${path}')		
                END`;
               console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
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

function multiUploadImage(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        secUpload(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            } else {
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.user;
                company_id = req.body.Company_ID;
                console.log(company_id);
                var query = "INSERT INTO LEASE_sec_IMAGE VALUES ('" + company_id + "','" + filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
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

function insertPersonal(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_INSERT_PERSONAL_INFO";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });
        request.addParameter('USER_ID', sql.Int, v1.UserID);
        request.addParameter('NAME', sql.VarChar, v1.Name);
        request.addParameter('EMAIL', sql.VarChar, v1.Email);
        request.addParameter('HOME_ADDRESS', sql.VarChar, v1.HomeAddress);
        request.addParameter('FAX_NUMBER', sql.VarChar, v1.FaxNumber);
        request.addParameter('CELL_NUMBER', sql.VarChar, v1.CellPhone);
        request.addParameter('HOME_NUMBER', sql.VarChar, v1.HomePhone);
        request.addParameter('DOB', sql.VarChar, v1.DOB);
        request.addParameter('BIRTH_PLACE', sql.VarChar, v1.BirthPlace);
        request.addParameter('HOME_NUM_1', sql.VarChar, v1.HomeNum1);
        request.addParameter('HOME_NUM_2', sql.VarChar, v1.HomeNum2);
        request.addParameter('USER_TYPE', sql.VarChar, v1.UserType);


        connection.callProcedure(request);
    });
}

function businessEntity(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_INSERT_BUSINESS_ENTITY";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rows);
            }
            connection.release();
        });
        request.addParameter('USER_ID', sql.Int, v1.UserID);
        request.addParameter('BUS_ENT_ID', sql.VarChar, v1.BizID);
        request.addParameter('COMPANY_NAME', sql.VarChar, v1.CompanyName);
        request.addParameter('EMAIL', sql.VarChar, v1.Email);
        request.addParameter('ADDRESS', sql.VarChar, v1.Address);
        request.addParameter('TELEPHONE', sql.VarChar, v1.Telephone);
        request.addParameter('WEBSITE', sql.VarChar, v1.Website);

        connection.callProcedure(request);
    });
}

function buildingInfo(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_INSERT_BUILDING_INFO";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();

        });       

        request.addParameter('BUS_ENT_ID', sql.Int, v1.BizID);
      //  request.addParameter('BUILDING_TYPE', sql.VarChar, v1.BuildingType);
      //  request.addParameter('BUILDING_SUB_TYPE', sql.VarChar, v1.BuildingSubTypes);
        request.addParameter('BUILDING_SIZE', sql.VarChar, v1.BuildingSize);
        request.addParameter('BUILDING_YEAR', sql.VarChar, v1.BuiltYear);
        request.addParameter('RESTROOM', sql.VarChar, v1.RestRoom);
        request.addParameter('BUILDING_ZONE', sql.VarChar, v1.BuildingZone);
        request.addParameter('BUILDING_PARKING', sql.VarChar, v1.BuildingPark);

        connection.callProcedure(request);
    });
}

function premisesInfo(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_INSERT_PREMISES_INFO";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });
        
        request.addParameter('BUS_ENT_ID', sql.Int, v1.BizID);
        request.addParameter('SIZE_OF_UNIT', sql.VarChar, v1.SizeOfUnit);
        request.addParameter('YOUTUBEURL', sql.VarChar, v1.YoutubeUrl);
        request.addParameter('STATE', sql.VarChar, v1.State);
        request.addParameter('COUNTY', sql.VarChar, v1.County);
        request.addParameter('SPACE_TYPE', sql.VarChar, v1.SpaceType);


        connection.callProcedure(request);
    });
}

function InsertLeaseTerms(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_INSERT_LEASE_TERMS";
        console.log(v1);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rowCount);
            }
            connection.release();
        });
        
        request.addParameter('BUS_ENT_ID', sql.Int, v1.BizID);
        request.addParameter('RENT', sql.VarChar, v1.CommercialRent);
        request.addParameter('DURATION', sql.VarChar, v1.Duration);

        connection.callProcedure(request);
    });
}

function getLeaseByUserID(v1,cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
       var jsonArray = [];    
       var query = `SELECT BE.*,UPI.*,BI.*,LT.*,LP.*,LPI.*,BE.BUS_ENT_ID AS BIZ_ID,
              PM.USERNAME AS PRINCIPLE_AGENT,PM.EMAIL AS AGENT_MAIL FROM BUSINESS_ENTITY BE
              LEFT JOIN USER_PERSONAL_INFO UPI ON BE.USER_ID=UPI.USER_ID
              LEFT JOIN BUILDING_INFO BI ON BE.BUS_ENT_ID = BI.BUS_ENT_ID
              LEFT JOIN LEASE_TERMS LT ON LT.BUS_ENT_ID = BI.BUS_ENT_ID
              LEFT JOIN LEASE_PREMISES LP ON LP.BUS_ENT_ID = BI.BUS_ENT_ID
              LEFT JOIN LEASE_PRIME_IMAGE LPI ON LPI.BUS_ENT_ID = LP.BUS_ENT_ID
              LEFT JOIN(SELECT * FROM  BUSINESS_SERVICE BS 
                        WHERE BS.SERVICE_TYPE='Principle Agent') T1
              ON BE.BUS_ENT_ID = T1.COMPANY_ID
              LEFT JOIN PROFESSIONALS_DATA PM ON PM.ID = T1.PROF_ID 
              WHERE BE.USER_ID = ${v1}`;
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

function getLeaseSecImage(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT IMG_NAME FROM IMAGE_SECONDARY WHERE COMPANY_ID='" + v1 + "'";
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

function getLeaseType(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT USER_TYPE FROM USER_PERSONAL_INFO WHERE USER_ID='" + v1 + "'";
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
function landlordAddress(v1, cb) {
    console.log(v1);
    for(var i=0;i<v1.address.length;i++){
        console.log(v1.address[i].addAddress);
        var addr = v1.address[i].addAddress;
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO LANDLORD_MULTIPLE_ADDRESS VALUES ('"+v1.user_id+"','" +addr+"')";
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
    uploadImage: uploadImage,
    multiUploadImage: multiUploadImage,
    insertPersonal: insertPersonal,
    businessEntity: businessEntity,
    buildingInfo: buildingInfo,
    premisesInfo: premisesInfo,
    InsertLeaseTerms: InsertLeaseTerms,
    getLeaseByUserID: getLeaseByUserID,
    getLeaseSecImage: getLeaseSecImage ,
    getLeaseType: getLeaseType,
    landlordAddress:landlordAddress

  };