
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
