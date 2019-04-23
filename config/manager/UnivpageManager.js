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

var up_filename = "";
var cre_filename = "";
var bank_filename = "";
var property_filename = "";


const DIR = 'C:\\inetpub\\wwwroot\\assets\\img\\universal_data';
const CRE_DIR = 'C:\\inetpub\\wwwroot\\assets\\img\\universal_data';
const BANK_DIR = 'C:\\inetpub\\wwwroot\\assets\\img\\universal_data';
const PRO_DIR = 'C:\\inetpub\\wwwroot\\assets\\img\\universal_data';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // console.log("filename",req.body.User_Id);
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, up_filename);
    }
});
let secStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, CRE_DIR);
    },
    filename: (req, file, cb) => {
        // console.log("filename",req.body.User_Id);
        cre_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, cre_filename);
    }
});
let thirdStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, BANK_DIR);
    },
    filename: (req, file, cb) => {
        // console.log("filename",req.body.User_Id);
        bank_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, bank_filename);
    }
});
let fourthStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PRO_DIR);
    },
    filename: (req, file, cb) => {
        // console.log("filename",req.body.User_Id);
        property_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, property_filename);
    }
});



var upload = multer({
    storage: storage
}).single('PrimaryFile');
var secUpload = multer({
    storage: secStorage
}).single('Creditfile');
var thirdUpload = multer({
    storage: thirdStorage
}).single('BankFile');
var fourthUpload = multer({
    storage: fourthStorage
}).single('PropertyDeedsFile');

function uploadFile(req, res, cb) {
    console.log("...................")
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        var path = '';

        var user = '';
        var name = '';
        var address = '';
        var email = '';
        var tele_num = '';


        upload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                // filename=req.file.filename;
                path = req.file.path;
                user = req.body.User_Id;
                name = req.body.name;
                address = req.body.addr;
                email = req.body.email;
                tele_num = req.body.tele_num;
                console.log("....................................")
                console.log(user);

                var query = "INSERT INTO Universal_Status VALUES ('" + user + "','" + name + "','" + address + "','" + email + "','" + tele_num + "','" + up_filename + "','" + path + "') ";
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

function upload_creFile(req, res, cb) {
    console.log("...................")
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        var path = '';

        var user = '';
        var name = '';
        var address = '';
        var email = '';
        var tele_num = '';


        secUpload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                // filename=req.file.filename;
                path = req.file.path;
                user = req.body.User_Id;
                name = req.body.name;
                address = req.body.addr;
                email = req.body.email;
                tele_num = req.body.tele_num;
                console.log("....................................")
                console.log(user);

                var query = "INSERT INTO Universal_CreditStatus VALUES ('" + user + "','" + name + "','" + address + "','" + email + "','" + tele_num + "','" + path + "','" + cre_filename + "') ";
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

function upload_bankFile(req, res, cb) {
    console.log("...................")
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        var path = '';

        var user = '';
        var name = '';
        var address = '';
        var email = '';
        var tele_num = '';


        thirdUpload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                // filename=req.file.filename;
                path = req.file.path;
                user = req.body.User_Id;
                name = req.body.name;
                address = req.body.addr;
                email = req.body.email;
                tele_num = req.body.tele_num;
                console.log("....................................")
                console.log(user);

                var query = "INSERT INTO Universal_BankStatus VALUES ('" + user + "','" + name + "','" + address + "','" + email + "','" + tele_num + "','" + path + "','" + bank_filename + "') ";
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

function upload_propertyFile(req, res, cb) {
    console.log("...................")
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        var path = '';

        var user = '';
        var name = '';
        var address = '';
        var email = '';
        var tele_num = '';


        fourthUpload(req, res, function (err) {

            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                // filename=req.file.filename;
                path = req.file.path;
                user = req.body.User_Id;
                name = req.body.name;
                address = req.body.addr;
                email = req.body.email;
                tele_num = req.body.tele_num;
                console.log("....................................")
                console.log(user);

                var query = "INSERT INTO Universal_PropertyDeedsStatus VALUES ('" + user + "','" + name + "','" + address + "','" + email + "','" + tele_num + "','" + path + "','" + property_filename + "') ";
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
module.exports = {

    uploadFile: uploadFile,
    upload_creFile: upload_creFile,
    upload_bankFile: upload_bankFile,
    upload_propertyFile: upload_propertyFile



};