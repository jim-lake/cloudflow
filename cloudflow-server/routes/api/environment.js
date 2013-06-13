
var db = require('../../db.js');
var async = require('async');
var app = require('./application.js')

exports.get_list = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    db.queryFromPool('SELECT * FROM environments',function(err,rows)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            res.send(rows);
        }
    });
};

exports.add_env = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("add env not implemented");
};

exports.get_env = function(req,res)
{
    var env_id = req.params.env_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    async.parallel(
    {
        environment: function(callback) {
            db.queryFromPool('SELECT * FROM environments WHERE environment_id = ?',env_id,callback);
        },
        applications: function(callback) {
            app.getAppsForEnv(env_id,callback);
        }
    },
    function(err,results) {
        res.send(results);
    });
    
    
}
exports.update_env = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update env not implemented");
};

