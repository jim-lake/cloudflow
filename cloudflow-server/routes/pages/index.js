
/*
 * GET home page.
 */

exports.addRoutes = function(app,prefix)
{
    app.get(prefix + '/', index);
    app.get(prefix + '/home', home);
    app.get(prefix + '/environment/:id',environment);
    app.get(prefix + '/application/:id',application);
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
    res.locals.id = req.params.id;
    res.render('environment');
}
function application(req,res)
{
    res.locals.id = req.params.id;
    res.render('application');
}
