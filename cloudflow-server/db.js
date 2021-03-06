

var config = require('./config.json')
var mysql = require('mysql');

var db_config = config.db;
db_config.multipleStatements = true;

exports.db_pool = mysql.createPool(db_config);

exports.queryFromPool = function(sql,values,callback)
{
    if( typeof values === 'function' )
    {
        callback = values;
        values = [];
    }

    exports.db_pool.getConnection(function(err, connection)
    {
        if( err )
        {
            callback(err);
        }
        else
        {
            connection.query(sql,values,function(err, result)
            {
                callback(err,result);
                connection.end();
            });
        }
    });
};

