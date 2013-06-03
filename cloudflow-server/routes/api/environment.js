
var db_pool = require('../../db.js').db_pool;

exports.get_list = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    db_pool.getConnection(function(err, connection)
    {
        if( err )
        {
            res.send("no db, try again later: " + err);
        }
        else
        {
            connection.query('SELECT * FROM environments', function(err, rows)
            {
                if( err )
                {
                    res.send(err);
                }
                else
                {
                    res.send(rows);
                }
                connection.end();
            });
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
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("get env not implemented");
}
exports.update_env = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update env not implemented");
};

