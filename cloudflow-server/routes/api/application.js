
var db = require('../../db.js');
var async = require('async');
var asg = require('./auto_scale_group.js');
var $ = require('jquery');

exports.get_list = function(req, res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    db.queryFromPool('SELECT * FROM applications',function(err,rows)
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

exports.add_app = function(req, res)
{
    res.send("data applications post");
};

exports.get_app = function(req,res)
{
    var app_id = req.params.app_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = 'SELECT * FROM applications WHERE application_id = ?;';
    sql += 'SELECT * FROM app_versions WHERE application_id = ?';
    db.queryFromPool(sql,[app_id,app_id],function(err,results)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            var app_rows = results[0];
            if( app_rows && app_rows.length > 0 )
            {
                app_data = app_rows[0];
                app_data.versions = results[1];
                
                res.send(app_data);
            }
            else
            {
                res.send("no app found: " + JSON.stringify(results));
            }
        }
    });
};
exports.update_app = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update app not implemented");
};

exports.get_app_ver = function(req,res)
{
    var ver_id = req.params.ver_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = 'SELECT * FROM app_versions NATURAL JOIN applications WHERE app_version_id = ?;';
    sql += 'SELECT * FROM auto_scale_groups WHERE app_version_id = ?;';
    
    var options = {
        sql: sql,
        nestTables: false,
    };
    db.queryFromPool(options,[ver_id,ver_id],function(err,results)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            var app_rows = results[0];
            if( app_rows && app_rows.length > 0 )
            {
                app_data = app_rows[0];
                app_data.auto_scale_groups = results[1];

                res.send(app_data);
            }
            else
            {
                res.send("<pre>error: " + JSON.stringify(results,undefined,2));
            }
        }
    });
};
exports.update_app_ver = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update app ver not implemented");
};

exports.getAppsForEnv = function(env_id,callback)
{
    function find_app_by_id(app_list,id)
    {
        for(var i = 0 ; i < app_list.length ; ++i )
        {
            if( app_list[i].application_id == id )
                return app_list[i];
        }
        return false;
    }

    async.parallel(
    {
        applications: function(ver_callback) {
            var sql = 'SELECT * FROM applications NATURAL JOIN app_versions ORDER BY app_versions.app_version_id DESC;';
            var options = {
                sql: sql,
                nestTables: true,
            };
        
            db.queryFromPool(options,function(err,results)
            {
                if(err)
                {
                    ver_callback(err,false);
                }
                else
                {
                    var app_list = [];
                    for( var i = 0 ; i < results.length ; ++i )
                    {
                        var row = results[i];
                        var app = row.applications;
                        var app_ver = row.app_versions;
                        
                        var found_app = find_app_by_id(app_list,app.application_id);
                        if( found_app )
                        {
                            found_app.versions.push(app_ver);
                        }
                        else
                        {
                            app.versions = [app_ver];
                            app_list.push(app);
                        }
                    }
                    ver_callback(false,app_list);
                }
            });
        },
        auto_scale_group: function(asg_callback) {
            asg.getAppVersionsForEnv(env_id,asg_callback);
        },
    },
    function(err,results) {
        var apps = results.applications;
        var asg = results.auto_scale_group;

        var ret_list = calculateAppStatus(apps,asg);
        
        callback(err,ret_list);
    });
};

function calculateAppStatus(app_list,asg)
{
    var ret_list = $.extend(true,[],app_list)

    for( var i = 0 ; i < ret_list.length ; ++i )
    {
        var app = ret_list[i];
        for( var j = 0 ; j < app.versions.length ; ++j )
        {
            var app_ver = app.versions[j];
            app_ver.status = "Not Running";
        }
    }
    return ret_list;
}

exports.startAppVer = function(app_ver_id,environment,callback)
{
    
};

