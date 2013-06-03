
/*
 * GET home page.
 */

exports.index = function(req, res)
{
    res.redirect('/home');
};

exports.home = function(req,res)
{
    res.render('home');
};

exports.environment = function(req,res)
{
    console.log("param id: " + req.params.id);
    res.locals.id = req.params.id;
    res.render('environment');
};
exports.application = function(req,res)
{
    console.log("param id: " + req.params.id);
    res.locals.id = req.params.id;
    console.log(res.locals);
    res.render('application');
};
