
var api_app = require('./application');
var api_env = require('./environment');

exports.addRoutes = function(app,prefix)
{
    app.get(prefix + '/application',api_app.get_list);
    app.post(prefix + '/application',api_app.add_app);
    app.get(prefix + '/application/:id',api_app.get_app);
    app.post(prefix + '/application/:id',api_app.update_app);
    app.get(prefix + '/application/:id/ver/:ver_id',api_app.get_app_ver);
    app.post(prefix + '/application/:id/ver/:ver_id',api_app.update_app_ver);

    app.get(prefix + '/environment',api_env.get_list);
    app.post(prefix + '/environment',api_env.add_env);
    app.get(prefix + '/environment/:id',api_env.get_env);
    app.post(prefix + '/environment/:id',api_env.update_env);
};
