
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
    var id = req.params.id;
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
            var sql = "SELECT * FROM applications ";
            //sql += " JOIN ";
            sql += " WHERE application_id=? "
            connection.query(sql,[id],function(err, rows)
            {
                if( err )
                {
                    res.send(err);
                }
                else
                {
                    if( rows && rows.length > 0 )
                    {
                        res.send(rows[0]);
                    }
                    else
                    {
                        res.send("no app found");
                    }
                }
                connection.end();
            });
        }
    });
};

exports.update_app = function(req,res)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    
    res.send("update app not implemented");
};
