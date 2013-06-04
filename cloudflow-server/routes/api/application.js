
var db = require('../../db.js');

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
    var id = req.params.id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = 'SELECT * FROM applications WHERE application_id = ?;';
    sql += 'SELECT * FROM app_versions WHERE application_id = ?';
    db.queryFromPool(sql,[id,id],function(err,results)
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
    var id = req.params.id;
    var ver_id = req.params.ver_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = 'SELECT * FROM applications WHERE application_id = ?;';
    sql += 'SELECT * FROM app_versions WHERE app_version_id = ?;';
    db.queryFromPool(sql,[id,ver_id],function(err,results)
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
                app_data.version = results[1][0].version;
                
                res.send(app_data);
            }
            else
            {
                res.send("no app found: " + JSON.stringify(results));
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

