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




const DIR = 'C:\\inetpub\\wwwroot\\assets\\img';
const Secdir = 'C:\\inetpub\\wwwroot\\assets\\img';

const profileDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
const licenseDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const socialDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const premiseDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const bankDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const licDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const certfiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const reportsDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const finDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const insDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const ndaDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';
const checkpdfDir = 'C:\\inetpub\\wwwroot\\assets\\img\\SocialDocs';

// const profileDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const licenseDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const socialDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const premiseDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const bankDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const licDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const certfiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const reportsDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const finDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const insDir ='C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const ndaDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';
// const checkpdfDir = 'C:\\inetpub\\wwwroot\\assets\\img\\ProfilePics';

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
let licenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, licenseDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let socialSecureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, socialDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let premiseLeaseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, premiseDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let bankReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, bankDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let licenseReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, licDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let certificateReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, certfiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let reportsDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, reportsDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let finsDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, finDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let insDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, insDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let ndaDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ndaDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let checkPDFStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, checkpdfDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
var upload = multer({ storage: storage }).single('PrimaryImage');
var secUpload = multer({ storage: secStorage }).single('SecondaryImage');
var profilePic = multer({ storage: profilePicStorage }).single('profileImage');
var licensePic = multer({ storage: licenseStorage }).single('license');
var socialSecurePic = multer({ storage: socialSecureStorage }).single('socialSecurity');
var premisePic = multer({ storage: premiseLeaseStorage }).single('preLeaseImage');
var bankReportPic = multer({ storage: bankReportStorage }).single('bankPDF');
var licenseReportPic = multer({ storage: licenseReportStorage }).single('licenseRep');
var certificatePic = multer({ storage: certificateReportStorage }).single('certificateRep');
var reportsPic = multer({ storage: reportsDataStorage }).single('reports');
var finsPic = multer({ storage: finsDataStorage }).single('finState');
var insurancePic = multer({ storage: insDataStorage }).single('insurance');
var ndaPic = multer({ storage: ndaDataStorage }).single('ndaImage');
var checkpdf = multer({ storage: checkPDFStorage }).single('checkPDF');

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
            else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.user;
                company_id = req.body.Company_ID;
                console.log(company_id);

                var query = "INSERT INTO IMAGE_MSTR VALUES ('" + company_id + "','" + user + "',1,0,'" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
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
        profilePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                console.log(company_id);

                var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','24') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
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
            }
            else {

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
                    }
                    else {
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
            }
            else {
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
                    }
                    else {
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
            }
            else {

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
            connection.release();
        });
        connection.execSql(request);
    });
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
            if (err) { console.log(err) }
            else { }
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
            }
            else {
                cb(null, [{ "status": "No Data Found" }]);
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
            }
            else {
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.user;
                company_id = req.body.Company_ID;
                console.log(company_id);
                var query = "INSERT INTO IMAGE_SECONDARY VALUES ('" + company_id + "','" + user + "',0,1,'" + filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) { console.log(err) }
                    else { console.log(rows); cb(null, rowCount); }
                    connection.release();
                });
                connection.execSql(request);
            }
        });
    });
}
function deleteSecImages(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) { console.error(err); return; }
        var jsonArray = [];
        var query = "DELETE FROM IMAGE_SECONDARY WHERE COMPANY_ID='" + v1 + "'";
        console.log(query);
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) { console.log(err) }
            else { cb(null, [{ "status": "success" }]); }
            connection.release();
        });
        connection.execSql(request);
    });
}
function licenseUpload(req, res, cb) {
    console.log("kkkkkk")
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        licensePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerLicense";
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
            request.addParameter('LICENSE_IMG', sql.VarChar, up_filename);
            request.addParameter('LICENSE_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function socialSecurityUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        socialSecurePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerSocialReport";
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
            request.addParameter('SOC_IMG', sql.VarChar, up_filename);
            request.addParameter('SOC_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function bankReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        bankReportPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerBankReport";
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
            request.addParameter('BANK_IMG', sql.VarChar, up_filename);
            request.addParameter('BANK_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function certificateReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        certificatePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }

            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerCertificateReport";
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
            request.addParameter('CERTFICATE_IMG', sql.VarChar, up_filename);
            request.addParameter('CERTIFICATE_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function licenseReportUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        licenseReportPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }

            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerLIR";
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
            request.addParameter('LIR_IMG', sql.VarChar, up_filename);
            request.addParameter('LIR_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function reportsDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        reportsPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerReports";
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
            request.addParameter('RP_IMG', sql.VarChar, up_filename);
            request.addParameter('RP_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function finsDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        finsPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            // filename=req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerFIN";
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
            request.addParameter('FIN_IMG', sql.VarChar, up_filename);
            request.addParameter('FIN_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function insuranceDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        insurancePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            filename = req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerINR";
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
            request.addParameter('INR_IMG', sql.VarChar, up_filename);
            request.addParameter('INR_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function premiseUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        premisePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            filename = req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerPreLease";
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
            request.addParameter('PR_IMG', sql.VarChar, up_filename);
            request.addParameter('PR_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function ndaDataUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        ndaPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            filename = req.file.filename;
            path = req.file.path;
            user = req.body.USERNAME;
            company_id = req.body.Company_ID;

            var query = "SP_SellerNDA";
            const request = new Request(query, (err, rowCount, rows) => {
                if (err) {

                    console.log(err);
                } else {                  
                    cb(null, rows);
                }
            connection.release();
            });
            request.addParameter('COMPANY_ID', sql.Int, company_id);
            request.addParameter('NDA_IMG', sql.VarChar, up_filename);
            request.addParameter('NDA_IMG_DIRECTORY', sql.VarChar, path);
            request.addParameter('USER_NAME', sql.VarChar, user);
            connection.callProcedure(request);
        });
    });
}
function checkListPDF(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        checkpdf(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.USERNAME;
                company_id = req.body.Company_ID;
                console.log(company_id);

                var query = "INSERT INTO CHECKLIST_PDF VALUES ('" + user + "','" + up_filename + "','" + path + "') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    else {
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
module.exports = {
    licenseUpload: licenseUpload,
    socialSecurityUpload: socialSecurityUpload,
    premiseUpload: premiseUpload,
    bankReportUpload: bankReportUpload,
    licenseReportUpload: licenseReportUpload,
    certificateReportUpload: certificateReportUpload,
    reportsDataUpload: reportsDataUpload,
    finsDataUpload: finsDataUpload,
    insuranceDataUpload: insuranceDataUpload,
    ndaDataUpload: ndaDataUpload,
    checkListPDF: checkListPDF
};