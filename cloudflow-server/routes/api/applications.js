
var db_pool = require('../../db.js').db_pool;

exports.get = function(req, res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    db_pool.getConnection(function(err, connection)
    {
        if( err )
        {
            res.send("no db, try again later");
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

exports.post = function(req, res)
{
    res.send("data appliactions post");
};
