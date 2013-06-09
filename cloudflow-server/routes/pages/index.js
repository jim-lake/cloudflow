
var db = require('../../db.js');

exports.addRoutes = function(app,prefix)
{
    app.get(prefix + '/', index);
    app.get(prefix + '/home', home);
    app.get(prefix + '/environment/:env_id',environment);
    app.get(prefix + '/application/:app_id',application);
    app.get(prefix + '/app_ver/:ver_id',app_version);
    app.get(prefix + '/auto_scale_group/:asg_id',asg_view);
};

function index(req, res)
{
    res.redirect('/home');
}
function home(req,res)
{
    res.render('home');
}
function environment(req,res)
{
    res.locals.env_id = req.params.env_id;
    res.render('environment');
}
function application(req,res)
{
    res.locals.app_id = req.params.app_id;
    res.render('application');
}
function app_version(req,res)
{
    var ver_id = req.params.ver_id;
    res.locals.app_ver_id = ver_id;
    
    var sql = "SELECT * FROM app_versions WHERE app_version_id = ?";
    db.queryFromPool(sql,ver_id,function(err,rows)
    {
        if( err )
        {
            res.send(err);
        }
        else
        {
            res.locals.app_id = rows.application_id;
            res.render('app_version');
        }
    });
    
}
function asg_view(req,res)
{
    res.locals.asg_id = req.params.asg_id;
    res.render('auto_scale_group');
}