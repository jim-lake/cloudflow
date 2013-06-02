
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.locals({
        title : 'Test!'
        , message : 'De groeten'
    });

    res.render('index');
};