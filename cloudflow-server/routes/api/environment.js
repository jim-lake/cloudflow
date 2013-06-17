
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
        environment: function(env_callback) {
            var sql = "SELECT * FROM environments WHERE environment_id = ?";
            db.queryFromPool(sql,env_id,function(err,results)
            {
                if( err )
                {
                    env_callback(err,false);
                }
                else
                {
                    env_callback(false,results[0]);
                }
            });
        },
        applications: function(app_callback) {
            app.getAppsForEnv(env_id,app_callback);
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

exports.start_app_ver = function(req,res)
{
    var end_id = req.params.env_id;
    var ver_id = req.params.ver_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = "SELECT * FROM environments WHERE environment_id = ?";
    db.queryFromPool(sql,env_id,function(err,results)
    {
        if( err )
        {
            res.send("Failed to get env: " + err);
        }
        else
        {
            app.startAppVer(ver_id,results[0],function(err,result)
            {
                if( err )
                {
                    res.send("Start app failed: " + err);
                }
                else
                {
                    res.send(result);
                }
            });
        }
    });
}

