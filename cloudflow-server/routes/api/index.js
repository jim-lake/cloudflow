
var api_app = require('./applications');
var api_env = require('./environments');

exports.addRoutes = function(app,prefix)
{
    app.get(prefix + '/applications',api_app.get);
    app.post(prefix + '/applications',api_app.post);

    app.get(prefix + '/environments',api_env.get);
    app.post(prefix + '/environments',api_env.post);
};
