
var db = require('../../db.js');
var AWS = require('aws-sdk');
var config = require('../../config.json');
var async = require('async');

AWS.config.update(config.aws);
AWS.config.update({region: 'us-west-1'});

var aws_asg = new AWS.AutoScaling();

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
                var asg = results[0].auto_scale_groups;
                var app = results[0].applications;
                app.version = results[0].app_versions.version;
                var ret = {
                    application: app,
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
    var asg_id = req.params.asg_id;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    var values = {
        name: req.param('name'),
        ami: req.param('ami'),
        instance_type: req.param('instance_type'),
        min: req.param('min'),
        desired: req.param('desired'),
        max: req.param('max'),
        vpc_subnet_list: req.param('vpc_subnet_list'),
        availability_zone_list: req.param('availability_zone_list'),
        security_group_list: req.param('security_group_list'),
        key_pair: req.param('key_pair'),
        iam_role: req.param('iam_role'),
        root_volume_gb: req.param('root_volume_gb'),
    };
    var sql = "UPDATE auto_scale_groups SET ? WHERE auto_scale_group_id = ?";
    db.queryFromPool(sql,[values,asg_id],function(err,result)
    {
        if( err )
        {
            res.send("failed to add asg");
        }
        else
        {
            res.send(values);
        }
    });
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
exports.status_asg = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");

    async.parallel(
    {
        asg: function(callback) {
            aws_asg.describeAutoScalingGroups({},function(err,data)
            {
                callback(false,{err:err,data:data});
            });
        },
        launch_config: function(callback) {
            aws_asg.describeLaunchConfigurations({},function(err,data)
            {
                callback(false,{err:err,data:data});
            });
        }
    },
    function(err,results) {
        res.send(results);
    });
    
};
