

var config = require('./config.json')
var mysql = require('mysql');

var db_config = config.db;
db_config.multipleStatements = true;

exports.db_pool = mysql.createPool(db_config);
