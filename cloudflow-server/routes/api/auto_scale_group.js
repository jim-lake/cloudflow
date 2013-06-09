
var db = require('../../db.js');

exports.add_asg = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var app_ver_id = req.param('app_version_id');
    var name = req.param('name');
    
    if( !name || !app_ver_id )
    {
        res.send("invalid params for add_asg");
        return;
    }
    
    var values = {
        app_version_id: app_ver_id,
        name: name
    };
    
    db.queryFromPool('INSERT INTO auto_scale_groups SET ?',values,function(err,result)
    {
        if( err )
        {
            res.send("failed to add asg");
        }
        else
        {
            values.auto_scale_group_id = result.insertId;
            res.send(values);
        }
    });
};

exports.get_asg = function(req,res)
{
    var asg_id = req.params.asg_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var sql = "SELECT * FROM auto_scale_groups ";
    sql += " NATURAL LEFT JOIN launch_configs ";
    sql += " NATURAL JOIN app_versions ";
    sql += " JOIN applications ON app_versions.application_id = applications.application_id ";
    sql += " WHERE auto_scale_group_id = ?;";
    
    var options = {
        sql: sql,
        nestTables: true,
    };
    db.queryFromPool(options,[asg_id],function(err,results)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            if( results.length > 0 )
            {
                var asg = mergeObjects(results[0].auto_scale_groups,results[0].launch_configs);
                var ret = {
                    application: results[0].applications,
                    app_version: results[0].app_versions,
                    auto_scale_group: asg
                };
                res.send(ret);
            }
            else
            {
                res.send("<pre>sql: " + sql + ",error: " + JSON.stringify(results,undefined,2));
            }
        }
    });
}
exports.update_asg = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update asg not implemented");
};
exports.delete_asg = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var asg_id = req.params.asg_id;
    var sql = "DELETE FROM auto_scale_groups WHERE auto_scale_group_id = ?";
    db.queryFromPool(sql,asg_id,function(err,result)
    {
        if( err )
        {
            res.send("failed to delete asg");
        }
        else
        {
            res.send({success: 1});
        }
    });
};

