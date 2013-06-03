
var db_pool = require('../../db.js').db_pool;

exports.get_list = function(req, res)
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
            connection.query('SELECT * FROM applications', function(err, rows)
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

exports.add_app = function(req, res)
{
    res.send("data applications post");
};

exports.get_app = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("get app not implemented");
}
exports.update_app = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update app not implemented");
};
