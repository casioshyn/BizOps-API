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
const profLiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const driverLiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const profSocDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const profileDir = 'C:\\inetpub\\wwwroot\\assets\\img';
const businessLicenseDir='C:\\inetpub\\wwwroot\\assets\\img\\documents';
const insuranceDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
var up_filename = "";
function createProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        //  var query = "SP_CreateProfessional";
        // var query = "SP_CreateProfessionals";   
        var query = "SP_Professionals"    
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rows);
            }
            connection.release();
        });
        request.addParameter('ID', sql.VarChar, v1.Id);
        request.addParameter('USERNAME', sql.VarChar, v1.Name);
        request.addParameter('HOME_ADDRESS', sql.VarChar, v1.homeAddress);
        request.addParameter('PROF_EMAIL', sql.VarChar, v1.emailAddress);
        request.addParameter('FAX_NUMBER', sql.VarChar, v1.faxNumber);
        request.addParameter('CELL_NUMBER', sql.VarChar, v1.cellPhone);
        request.addParameter('HOME_PHONE_NUMBER', sql.VarChar, v1.homePhone);
        request.addParameter('INS_DATE', sql.VarChar, v1.insdate);
        request.addParameter('PLACE', sql.VarChar, v1.birthPlace);
        request.addParameter('HOME_TELEPHONE', sql.VarChar, v1.homeTelePhone);
        request.addParameter('BEST_TELEPHONE', sql.VarChar, v1.bestTelePhone);
        request.addParameter('CATEGORY', sql.VarChar, v1.Category);
        request.addParameter('SUBCATEGORY', sql.VarChar, v1.SubCategory);        
        request.addParameter('COMPANY_NAME', sql.VarChar, v1.companyName);
        request.addParameter('BUSINESS_ADDRESS', sql.VarChar, v1.businessAddress);
        request.addParameter('BUSINESS_EMAIL', sql.VarChar, v1.businessEmail);
        request.addParameter('USER_ID',sql.VarChar,v1.UserId);
        request.addParameter('PROF_TELEPHONE', sql.VarChar, v1.telePhoneNumber);
        request.addParameter('WEBSITE', sql.VarChar, v1.websiteName);
        request.addParameter('INS_NAME', sql.VarChar, v1.insName);
        request.addParameter('INS_TELEPHONE', sql.VarChar, v1.insTelePhoneNumber);
        request.addParameter('INS_ADDRESS', sql.VarChar, v1.insAddress);
        request.addParameter('INS_TYPE', sql.VarChar, v1.insuranceType);
        request.addParameter('INS_EMAIL', sql.VarChar, v1.insEmail);
        request.addParameter('TAXID', sql.VarChar, v1.taxId);
        request.addParameter('DUNS_NUMBER', sql.VarChar, v1.dunsNumber);
        request.addParameter('INSURANCE_PROVIDER', sql.VarChar, v1.insProvider);   
        connection.callProcedure(request);
    });
}
let profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profileDir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});
let insuranceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, insuranceDir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    }
});
let profLicenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profLiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let driverLicenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, driverLiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let profSocialStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profSocDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let businessLicenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, businessLicenseDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

var proflicensePic = multer({ storage: profLicenseStorage }).single('profLicense');
var businesslicensePic = multer({ storage: businessLicenseStorage }).single('businessLicense');
var driverLicensePic = multer({ storage: driverLicenseStorage }).single('license');
var profSocialPic = multer({ storage: profSocialStorage }).single('profSocialSecurity');
var profilePic = multer({storage: profilePicStorage}).single('profileImage');
var insurancePic = multer({storage: insuranceStorage}).single('insuranceData'); 
function profLicense(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        proflicensePic(req, res, function (err) {
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
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_profLicenseReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('PROF_LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('PROF_LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );  
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function businessLicense(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        businesslicensePic(req, res, function (err) {
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
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_bussinessLicenseReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('BUSINESS_LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('BUSINESS_LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );  
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function insuranceData(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        insurancePic(req, res, function (err) {
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
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_profInsuranceReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('PROF_INSURANCE_REPORT', sql.VarChar, up_filename);
                request.addParameter('PROF_INSURANCE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );  
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function driverLicense(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        driverLicensePic(req, res, function (err) {
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
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_driverLicReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('DRIVER_LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('DRIVER_LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user ); 
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function profSocialSecurity(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        profSocialPic(req, res, function (err) {
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
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_profSocReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('PROF_SOC_REPORT', sql.VarChar, up_filename);
                request.addParameter('PROF_SOC_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );   
                request.addParameter('USER_ID', sql.VarChar,user_id );           
                connection.callProcedure(request);   
        });
    });
}
function profileImgUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        var user_id='';
        var ID='';
        profilePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                ID = req.body.ID;
                console.log(company_id);
                console.log("ggg")
                // var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','"+ID+"') ";
                var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','"+ID+"') ";
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
function professionalAddress(v1, cb) {
    console.log(v1);
    for(var i=0;i<v1.address.length;i++){
        console.log(v1.address[i].addAddress);
        var addr = v1.address[i].addAddress;
        config.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            var query = "INSERT INTO PROFESSIONAL_MULTIPLE_ADDRESS VALUES ('"+v1.profID+"','" +addr+"')";
            console.log(query);       
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
function getProfAddress(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT PROF_ADDRESS FROM PROFESSIONAL_MULTIPLE_ADDRESS WHERE PROF_ID=${ v1}`;
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
function deleteProfessionalAddress(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `DELETE FROM PROFESSIONAL_MULTIPLE_ADDRESS WHERE PROF_ID=${v1}`;
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
function deleteProfessionalImage(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = `DELETE FROM PROFESSIONAL_IMAGES WHERE ID=${v1}`;
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
function getProfIdByUserIDValue(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(v1);
        var jsonArray = [];
        var query = `SELECT ID FROM PROFESSIONALS_DATA WHERE USER_ID=${ v1}`;
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
    createProfessional:createProfessional,
    profileImgUpload:profileImgUpload,
    profLicense:profLicense,
    driverLicense:driverLicense,
    profSocialSecurity:profSocialSecurity,
    professionalAddress:professionalAddress,
    businessLicense:businessLicense,
    insuranceData:insuranceData,
    getProfAddress:getProfAddress,
    deleteProfessionalAddress:deleteProfessionalAddress,
    deleteProfessionalImage:deleteProfessionalImage,
    getProfIdByUserIDValue:getProfIdByUserIDValue


    
};