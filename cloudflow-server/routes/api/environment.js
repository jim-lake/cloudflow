
var db = require('../../db.js');

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
    
    db.queryFromPool('SELECT * FROM environments WHERE environment_id = ?',env_id,function(err,rows)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            res.send(rows[0]);
        }
    });
}
exports.update_env = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update env not implemented");
};

