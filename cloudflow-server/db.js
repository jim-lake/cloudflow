

var config = require('./config.json')
var mysql = require('mysql');

exports.db_pool = mysql.createPool(config.db);
