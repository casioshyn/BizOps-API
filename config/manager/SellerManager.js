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

//  const DIR = 'E:\\RAM\\BIZOPSAI\\current-Biz\\Bizops - Feb 11\\Bizops - Feb 11\\src\\assets\\img';
//  const Secdir = 'E:\\RAM\\BIZOPSAI\\current-Biz\\Bizops - Feb 11\\Bizops - Feb 11\\src\\assets\\img';

const DIR = 'C:\\inetpub\\wwwroot\\assets\\img';
const Secdir = 'C:\\inetpub\\wwwroot\\assets\\img';
const userProfileDir = 'C:\\inetpub\\wwwroot\\assets\\img\\UserProfile';
const profileDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';

var up_filename = "";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, up_filename);
    }
});

let secStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Secdir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

let profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profileDir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});
let userProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, userProfileDir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});
var upload = multer({
    storage: storage
}).single('PrimaryImage');
var secUpload = multer({
    storage: secStorage
}).single('SecondaryImage');
var profilePic = multer({
    storage: profilePicStorage
}).single('profileImage');
var uploadUserProfile = multer({
    storage: userProfileStorage
}).single('userProfile');

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
            }
            if (err) {
                console.log(err);
                cb(null, err);
            }       
            filename = req.file.filename;
            path = req.file.path;
            user = req.body.user;
            company_id = req.body.Company_ID;
                
                var query = "SP_IMAGE_MSTR";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);                  
                    }
                    connection.release();
                });          
                request.addParameter('COMPANY_ID', sql.Int, company_id);
                request.addParameter('USER_ID', sql.Int, user);
                request.addParameter('IMG_NAME', sql.VarChar,up_filename );
                request.addParameter('IMG_DIRECTORY', sql.VarChar,path );              
                connection.callProcedure(request);   
        });
    });
}
function userProfile(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        var user_name='';
        uploadUserProfile(req, res, function (err) {
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
            user = req.body.USER_ID;
            user_name = req.body.USERNAME;           
                
                var query = "SP_USER_PROFILE_IMAGE";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);                  
                    }
                    connection.release();
                });          
                request.addParameter('USER_ID', sql.Int, user);
                request.addParameter('USER_NAME', sql.VarChar, user_name);
                request.addParameter('USER_PROFILE_IMAGE', sql.VarChar,up_filename );
                request.addParameter('USER_PROFILE_IMAGE_DIRECTORY', sql.VarChar,path );              
                connection.callProcedure(request);   
        });
    });
}
// function uploadImage(req, res, cb) {
    // config.acquire(function (err, connection) {
        // if (err) {
            // console.error(err);
            // return;
        // }
        // var path = '';
        // var filename = '';
        // var user = '';
        // var company_id = '';
        // upload(req, res, function (err) {
            // if (err) {
                // console.log(err);
                // cb(null, err);
            // } else {
                // filename = req.file.filename;
                // path = req.file.path;
                // user = req.body.user;
                // company_id = req.body.Company_ID;
                // console.log(company_id);

                // var query = "INSERT INTO IMAGE_MSTR VALUES ('" + company_id + "','" + user + "',1,0,'" + up_filename + "','" + path + "') ";
                // console.log(query)
                // const request = new Request(query, function (err, rowCount, rows) {
                    // if (err) {
                        // console.log(err)
                    // } else {
                        // console.log(rows);
                        // cb(null, rowCount);
                    // }
                    // connection.release();
                // });
                // connection.execSql(request);
            // }
        // });
    // });
// }

// function profileImgUpload(req, res, cb) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         var path = '';
//         var filename = '';
//         var user = '';
//         var company_id = '';
//         profilePic(req, res, function (err) {
//             if (err) {
//                 console.log(err);
//                 cb(null, err);
//             } else {

//                 filename = req.file.filename;
//                 path = req.file.path;
//                 user = req.body.UserName;
//                 console.log(company_id);

//                 var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','24') ";
//                 console.log(query)
//                 const request = new Request(query, function (err, rowCount, rows) {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         console.log(rows);
//                         cb(null, rowCount);
//                     }
//                     connection.release();
//                 });
//                 connection.execSql(request);
//             }
//         });
//     });
// }

function editUploadImage(req, res, cb) {
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

                var query = " UPDATE IMAGE_MSTR SET IMG_NAME = '" + filename + "',IMG_DIRECTORY = '" + path + "' where COMPANY_ID='" + company_id + "' ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(rowCount);
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
                var query = "INSERT INTO IMAGE_SECONDARY VALUES ('" + company_id + "','" + user + "',0,1,'" + filename + "','" + path + "') ";
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

function getSecImage(v1, cb) {
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

// function userdate(v1, cb) {
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         var query = "SP_CreateSeller";
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 //   console.log(rowCount,rows[0]);
//                 cb(null, rows);

//             }
//             connection.release();
//         });
//         request.addParameter('SELL_TYPE', sql.Int, v1.SellType);
//         request.addParameter('COMPANY_ID', sql.Int, v1.CompanyId);
//         request.addParameter('USER_ID', sql.Int, v1.userId);
//         request.addParameter('TITLE', sql.VarChar, v1.Title);
//         request.addParameter('STATE', sql.VarChar, v1.State);
//         request.addParameter('COUNTY', sql.VarChar, v1.County);
//         request.addParameter('PRICE', sql.VarChar, v1.Price);
//         request.addParameter('LONG_DESC', sql.VarChar, v1.Description);
//         request.addParameter('FLAG', sql.Int, v1.Flag);
//         request.addParameter('CATEGORY', sql.VarChar, v1.Category);
//         request.addParameter('SUBCATEGORY', sql.VarChar, v1.SubCategory);
//         request.addParameter('SUBCHILD', sql.VarChar, v1.SubChildCategory);
//         request.addParameter('COMPANY_TYPE', sql.VarChar, v1.CmpType);
//         request.addParameter('COMPANY_STATUS', sql.VarChar, '-');
//         request.addParameter('EMPLOYEE_COUNT', sql.VarChar, v1.EmpCount);
//         request.addParameter('YOUTUBE', sql.VarChar, v1.YoutubeUrl);
//         request.addParameter('LATITUDE', sql.VarChar, v1.Latitude);
//         request.addParameter('LONGITUDE', sql.VarChar, v1.Longitude);
//         request.addParameter('ADDRESS', sql.VarChar, v1.Address);
//         request.addParameter('REVENUE', sql.VarChar, v1.Revenue);
//         request.addParameter('CASHFLOW', sql.VarChar, v1.CashFlow);
//         request.addParameter('ZIPCODE', sql.VarChar, v1.ZipCode);

//         request.addParameter('CUSTOMER', sql.VarChar, '-');
//         request.addParameter('EMPLOYEE', sql.VarChar, '-');
//         request.addParameter('PROPERTY', sql.VarChar, '-');
//         request.addParameter('CUSTOMER_URL', sql.VarChar, '-');
//         request.addParameter('EMPLOYEE_URL', sql.VarChar, '-');
//         request.addParameter('PROPERTY_URL', sql.VarChar, '-');

//         request.addParameter('BUILDING_TYPE', sql.VarChar, v1.BuildingType);
//         request.addParameter('BUILDING_SUBTYPE', sql.VarChar, v1.BuildingSubTypes);

//         request.addParameter('BUILDING_SIZE', sql.BigInt, v1.BuildingSize);
//         request.addParameter('PRE_SIZE', sql.BigInt, v1.totalAreaSize);
//         request.addParameter('RENT', sql.BigInt, v1.rentDetail);
//         request.addParameter('INDUSTRY_SPECIFIC', sql.VarChar, v1.industryDetail);
//         request.addParameter('ZONING', sql.VarChar, v1.zoningDetail);
//         request.addParameter('ANNUAL_REVENUE', sql.VarChar, v1.Revenue);
//         request.addParameter('CASH_FLOW', sql.VarChar, v1.CashFlow);
//         request.addParameter('EXPENSE', sql.VarChar, v1.Expense);
//         request.addParameter('EQUIPMENT_NAME', sql.VarChar, v1.Equipment);
//         request.addParameter('ACCOUNTANT', sql.VarChar, v1.accountant);
//         request.addParameter('ATTORNEY', sql.VarChar, v1.attorney);
//         request.addParameter('BUSINESS_BROKER', sql.VarChar, v1.bussinessBrokerDetails);
//         connection.callProcedure(request);
//     });
// }

function userdate(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSell";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        });      
        request.addParameter('SELL_TYPE', sql.Int,v1.SellType) ;
        request.addParameter('COMPANY_ID', sql.Int, v1.CompanyId);
        request.addParameter('USER_ID', sql.Int, v1.userId);
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
        request.addParameter('TITLE', sql.VarChar, v1.Title);
        request.addParameter('STATE', sql.VarChar, v1.State);
        request.addParameter('COUNTY', sql.VarChar, v1.County);
        request.addParameter('PRICE', sql.VarChar, v1.Price);
        request.addParameter('LONG_DESC', sql.VarChar, v1.Description);
        request.addParameter('FLAG', sql.Int, v1.Flag); 
        request.addParameter('CATEGORY',sql.VarChar,v1.Category);
        request.addParameter('SUBCATEGORY',sql.VarChar,v1.SubCategory);
        request.addParameter('SUBCHILD',sql.VarChar,v1.SubChildCategory);
        request.addParameter('COMPANY_TYPE',sql.VarChar,v1.CmpType);
        request.addParameter('COMPANY_STATUS',sql.VarChar,'-');
        request.addParameter('EMPLOYEE_COUNT',sql.VarChar,v1.EmpCount); 
        request.addParameter('YOUTUBE',sql.VarChar,v1.YoutubeUrl); 
        request.addParameter('LATITUDE',sql.VarChar,v1.Latitude); 
        request.addParameter('LONGITUDE',sql.VarChar,v1.Longitude);
        request.addParameter('ADDRESS',sql.VarChar,v1.Address); 
        request.addParameter('REVENUE', sql.VarChar, v1.Revenue);
        request.addParameter('CASHFLOW', sql.VarChar, v1.CashFlow);
        request.addParameter('ZIPCODE',sql.VarChar,v1.ZipCode); 

        request.addParameter('CUSTOMER',sql.VarChar,'-'); 
        request.addParameter('EMPLOYEE',sql.VarChar,'-'); 
        request.addParameter('PROPERTY',sql.VarChar,'-'); 
        request.addParameter('CUSTOMER_URL',sql.VarChar,'-'); 
        request.addParameter('EMPLOYEE_URL',sql.VarChar,'-'); 
        request.addParameter('PROPERTY_URL',sql.VarChar,'-');

        request.addParameter('BUILDING_TYPE',sql.VarChar,v1.BuildingType);
        request.addParameter('BUILDING_SUBTYPE',sql.VarChar,v1.BuildingSubTypes);
        request.addParameter('BUILDING_SIZE',sql.BigInt,v1.BuildingSize);
        request.addParameter('BUILT_YEAR',sql.VarChar,v1.builtYear);
        request.addParameter('NO_OF_RESTROOMS',sql.VarChar,v1.restRoom);
        request.addParameter('BUILDING_ZONE',sql.VarChar,v1.buildingZone);
        request.addParameter('PARKING',sql.VarChar,v1.buildingPark);
        request.addParameter('PRE_SIZE',sql.BigInt,v1.totalAreaSize);
        request.addParameter('RENT',sql.BigInt,v1.rentDetail);
        request.addParameter('INDUSTRY_SPECIFIC',sql.VarChar,v1.industryDetail);
        request.addParameter('ZONING',sql.VarChar,v1.zoningDetail);
        request.addParameter('ANNUAL_REVENUE',sql.VarChar,v1.Revenue);
        request.addParameter('CASH_FLOW',sql.VarChar,v1.CashFlow);
        request.addParameter('EXPENSE',sql.VarChar,v1.Expense);
        request.addParameter('EQUIPMENT_NAME',sql.VarChar,v1.Equipment);
        request.addParameter('ACCOUNTANT',sql.VarChar,v1.accountant);
        request.addParameter('ATTORNEY',sql.VarChar,v1.attorney);
        request.addParameter('BUSINESS_BROKER',sql.VarChar,v1.bussinessBrokerDetails);
        request.addParameter('SALE_AMOUNT',sql.VarChar,v1.saleAmount);
        request.addParameter('WHY_SELLING',sql.VarChar,v1.whySell);
        request.addParameter('DESIRED_TIME_TO_CLOSE',sql.VarChar,v1.desiredTime);
        request.addParameter('FEES',sql.VarChar,v1.fees);
        request.addParameter('VALUATION',sql.VarChar,v1.valuation);
        request.addParameter('ACCOUNTING',sql.VarChar,v1.accounting);
        request.addParameter('LEGAL',sql.VarChar,v1.legal);
        request.addParameter('ESCROW',sql.VarChar,v1.escrow);
        connection.callProcedure(request);
    });
}
// function multiAddress(v1, cb) {
//     console.log(v1);
//     console.log(v1.address)
   
//     for(var i=0;i<v1.address.length;i++){
//         console.log(v1.address[i].addAddress);
//         var addr = v1.address[i].addAddress;
//         config.acquire(function (err, connection) {
//             if (err) {
//                 // console.error(err);
//                 return;
//             }      
//             var query = "SP_sellerAddress";
//             const request = new Request(query, (err, rowCount, rows) => {
//                 if (err) {
//                     // console.log(err);
//                 } else {               
//                    // cb(null, rows);
//                 }
//                 connection.release();
//             }); 
//             request.addParameter('COMPANY_ID', sql.Int, v1.company_id);
//             request.addParameter('USER_ID', sql.Int, v1.user_id);     
//             request.addParameter('SELLER_ADDRESS', sql.VarChar,addr);       
//             connection.callProcedure(request);
//         });
//     }    
//     cb(null, [{ "status": "success"}]);
// }
function multiAddress(v1, cb) {
    console.log(v1);
    for(var i=0;i<v1.address.length;i++){
        console.log(v1.address[i].addAddress);
        var addr = v1.address[i].addAddress;
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO SELLER_MULTIPLE_ADDRESS VALUES ('"+v1.user_id+"','"+v1.company_id+"','" +addr+"')";
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
function getUserBiz(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        // var query = "SELECT CO.*,AD.* FROM COMPANY_DETAILS CO LEFT JOIN ADDITIONAL_DETAILS AD ON CO.COMPANY_ID=AD.COMPANY_ID WHERE CO.COMPANY_ID='"+v1+"'"; 
        var query = 'SP_GetDetailsByComid';
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
                cb(null, jsonArray);
            } else {
                cb(null, [{
                    "status": "No Data Found"
                }]);
            }
            connection.release();
        });
        request.addParameter('COMPANY_ID', sql.Int, v1);
        // connection.execSql(request); 
        connection.callProcedure(request);
    });
}

function multiUpdateImage(req, res, cb) {
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
                var query = "INSERT INTO IMAGE_SECONDARY VALUES ('" + company_id + "','" + user + "',0,1,'" + filename + "','" + path + "') ";
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

function deleteSecImages(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "DELETE FROM IMAGE_SECONDARY WHERE COMPANY_ID='" + v1 + "'";
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
function deleteAddress(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `DELETE FROM SELLER_MULTIPLE_ADDRESS WHERE COMPANY_ID=${v1}`;
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
function getProcessbyCmp(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM SELLER_PROCESS_OVERFLOW WHERE COMPANY_ID=${v1}`;
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
function getAddress(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT SELLER_ADDRESS FROM SELLER_MULTIPLE_ADDRESS WHERE COMPANY_ID=${ v1}`;
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
function createSellerBusiness(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellBusiness";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        });      
        request.addParameter('SELL_TYPE', sql.Int,v1.SellType) ;
        request.addParameter('COMPANY_ID', sql.Int, v1.CompanyId);
        request.addParameter('USER_ID', sql.Int, v1.userId);       
        request.addParameter('TITLE', sql.VarChar, v1.Title);
        request.addParameter('STATE', sql.VarChar, v1.State);
        request.addParameter('COUNTY', sql.VarChar, v1.County);
        request.addParameter('PRICE', sql.VarChar, v1.Price);
        request.addParameter('LONG_DESC', sql.VarChar, v1.Description);
        request.addParameter('FLAG', sql.Int, v1.Flag); 
        request.addParameter('CATEGORY',sql.VarChar,v1.Category);
        request.addParameter('SUBCATEGORY',sql.VarChar,v1.SubCategory);
        request.addParameter('SUBCHILD',sql.VarChar,v1.SubChildCategory);
        request.addParameter('COMPANY_TYPE',sql.VarChar,v1.CmpType);
        request.addParameter('COMPANY_STATUS',sql.VarChar,'-');
        request.addParameter('EMPLOYEE_COUNT',sql.VarChar,v1.EmpCount); 
        request.addParameter('YOUTUBE_URL',sql.VarChar,v1.YoutubeUrl); 
        request.addParameter('LATITUDE',sql.VarChar,v1.Latitude); 
        request.addParameter('LONGITUDE',sql.VarChar,v1.Longitude);
        request.addParameter('ADDRESS',sql.VarChar,v1.Address);        
        request.addParameter('ZIPCODE',sql.VarChar,v1.ZipCode);        
        connection.callProcedure(request);
    });
}
function createSellerFinancial(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellFinancial";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        });   
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);        
        request.addParameter('REVENUE', sql.VarChar, v1.Revenue);
        request.addParameter('CASHFLOW', sql.VarChar, v1.CashFlow);
        request.addParameter('EXPENSE',sql.VarChar,v1.Expense);
        connection.callProcedure(request);
    });
}
function createSellerBuilding(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellBuilding";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        }); 
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);  
        request.addParameter('BUILDING_TYPE',sql.VarChar,v1.BuildingType);
        request.addParameter('BUILDING_SUBTYPE',sql.VarChar,v1.BuildingSubTypes);
        request.addParameter('BUILDING_SIZE',sql.BigInt,v1.BuildingSize);
        request.addParameter('BUILT_YEAR',sql.VarChar,v1.builtYear);
        request.addParameter('NO_OF_RESTROOMS',sql.VarChar,v1.restRoom);
        request.addParameter('BUILDING_ZONE',sql.VarChar,v1.buildingZone);
        request.addParameter('PARKING',sql.VarChar,v1.buildingPark);
        connection.callProcedure(request);
    });
}
function createSellerPremise(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellPremise";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        }); 
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);  
        request.addParameter('PRE_SIZE',sql.BigInt,v1.totalAreaSize);
        request.addParameter('RENT',sql.BigInt,v1.rentDetail);
        request.addParameter('INDUSTRY_SPECIFIC',sql.VarChar,v1.industryDetail);
        request.addParameter('ZONING',sql.VarChar,v1.zoningDetail);
        connection.callProcedure(request);
    });
}
function createSellerAgent(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellAgent";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        }); 
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);  
        request.addParameter('ACCOUNTANT',sql.VarChar,v1.accountant);
        request.addParameter('ATTORNEY',sql.VarChar,v1.attorney);
        request.addParameter('BUSINESS_BROKER',sql.VarChar,v1.bussinessBrokerDetails);
        connection.callProcedure(request);
    });
}
function createSellerService(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellService";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        }); 
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);
        request.addParameter('VALUATION',sql.VarChar,v1.valuation);
        request.addParameter('ACCOUNTING',sql.VarChar,v1.accounting);
        request.addParameter('LEGAL',sql.VarChar,v1.legal);
        request.addParameter('ESCROW',sql.VarChar,v1.escrow);
        connection.callProcedure(request);
    });
}
function createSellerTerms(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }      
        var query = "SP_CreateSellTerms";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {               
                cb(null, rows);
            }
            connection.release();
        }); 
        request.addParameter('COMPANY_ID', sql.VarChar, v1.CompanyId);
        request.addParameter('SALE_AMOUNT',sql.VarChar,v1.saleAmount);
        request.addParameter('WHY_SELLING',sql.VarChar,v1.whySell);
        request.addParameter('DESIRED_TIME_TO_CLOSE',sql.VarChar,v1.desiredTime);
        request.addParameter('FEES',sql.VarChar,v1.fees);
        connection.callProcedure(request);
    });
}
function getBussinessByUserID(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT CO.*,PID.*,UP.USER_PROFILE_IMAGE,IM.IMG_NAME,SOC.SOC_IMG,RP.RP_IMG,INR.INR_IMG,LI.LICENSE_IMG,
        LIR.LIR_IMG,BN.BANK_IMG,CER.CERTFICATE_IMG,FIN.FIN_IMG,PR.PR_IMG,NDA.NDA_IMG,FD.FEDERAL_REPORT,KC.KEYCONTRACT_REPORT,
        LIB.LIBILS_REPORT,RET.RETIRE_PLAN_REPORT FROM COMPANY_DETAILS CO 
        LEFT JOIN IMAGE_MSTR IM ON CO.COMPANY_ID=IM.COMPANY_ID
        LEFT JOIN LICENSE_MSTR LI ON CO.COMPANY_ID=LI.COMPANY_ID
        LEFT JOIN REPORTS_IMAGE RP ON CO.COMPANY_ID=RP.COMPANY_ID
        LEFT JOIN INSURANCE_REPORT_IMAGE INR ON CO.COMPANY_ID=INR.COMPANY_ID      
        LEFT JOIN SOCIAL_SECURITY_MSTR SOC ON CO.COMPANY_ID=SOC.COMPANY_ID
        LEFT JOIN LICENSE_REPORT_IMAGE LIR ON CO.COMPANY_ID=LIR.COMPANY_ID
        LEFT JOIN BANK_REPORT_IMAGE BN ON CO.COMPANY_ID=BN.COMPANY_ID
        LEFT JOIN CERTIFICATE_REPORT_IMAGE CER ON CO.COMPANY_ID=CER.COMPANY_ID
        LEFT JOIN FIN_STATEMENT_IMAGE FIN ON CO.COMPANY_ID=FIN.COMPANY_ID	
        LEFT JOIN PREMISE_LEASE_IMAGE PR ON CO.COMPANY_ID=PR.COMPANY_ID
        LEFT JOIN NDA_REPORT NDA ON CO.COMPANY_ID=NDA.COMPANY_ID	        
        LEFT JOIN USER_PERSONAL_INFO PID ON PID.USER_ID=CO.USER_ID
        LEFT JOIN SELLER_FEDERAL_REPORT FD ON FD.COMPANY_ID =CO.COMPANY_ID
        LEFT JOIN SELLER_KEYCONTRACT_REPORT KC ON KC.COMPANY_ID =CO.COMPANY_ID
        LEFT JOIN SELLER_LIBILS_REPORT LIB ON LIB.COMPANY_ID =CO.COMPANY_ID
        LEFT JOIN SELLER_RETIRE_PLAN_REPORT RET ON RET.COMPANY_ID=CO.COMPANY_ID
        LEFT JOIN USER_PROFILE_IMAGE UP ON UP.USER_ID=CO.USER_ID	
        WHERE  CO.USER_ID = ${v1}`;
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
function getBizAgent(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM AGENT_STATUS WHERE COMPANY_ID = ${v1}`;
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
function getBizBuilding(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM BUILDING_STATUS WHERE COMPANY_ID = ${v1}`;
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
function getBizFinancial(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM FINANCIAL_STATUS WHERE COMPANY_ID = ${v1}`;
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
function getBizPremises(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM PREMISES_STATUS WHERE COMPANY_ID = ${v1}`;
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
function getBizServices(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM SERVICES_DATA WHERE COMPANY_ID = ${v1}`;
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
function getBizTerms(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT * FROM TERMS_DATA WHERE COMPANY_ID = ${v1}`;
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
module.exports = {
    getSecImage: getSecImage,
    userdate: userdate,
    getUserBiz: getUserBiz,
    uploadImage: uploadImage,
    editUploadImage: editUploadImage,
    multiUploadImage: multiUploadImage,
    multiUpdateImage: multiUpdateImage,
    deleteSecImages: deleteSecImages,
    // profileImgUpload: profileImgUpload,
    getProcessbyCmp: getProcessbyCmp,
    multiAddress:multiAddress,
    getAddress:getAddress,
    deleteAddress:deleteAddress,
    createSellerBusiness:createSellerBusiness,
    createSellerFinancial:createSellerFinancial,
    createSellerBuilding:createSellerBuilding,
    createSellerPremise:createSellerPremise,
    createSellerAgent:createSellerAgent,
    createSellerService:createSellerService,
    createSellerTerms:createSellerTerms,
    getBussinessByUserID:getBussinessByUserID,
    getBizAgent:getBizAgent,
    getBizBuilding:getBizBuilding,
    getBizFinancial:getBizFinancial,
    getBizPremises:getBizPremises,
    getBizServices:getBizServices,
    getBizTerms:getBizTerms,
    userProfile:userProfile
};