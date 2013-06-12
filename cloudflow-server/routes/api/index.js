
var api_app = require('./application');
var api_env = require('./environment');
var api_asg = require('./auto_scale_group');

exports.addRoutes = function(app,prefix)
{
    app.get(prefix + '/application',api_app.get_list);
    app.post(prefix + '/application',api_app.add_app);
    app.get(prefix + '/application/:app_id',api_app.get_app);
    app.post(prefix + '/application/:app_id',api_app.update_app);
    app.get(prefix + '/app_ver/:ver_id',api_app.get_app_ver);
    app.post(prefix + '/app_ver/:ver_id',api_app.update_app_ver);

    app.get(prefix + '/auto_scale_group/status',api_asg.status_asg);
    app.get(prefix + '/auto_scale_group/status2',api_asg.status2_asg);

    app.post(prefix + '/auto_scale_group',api_asg.add_asg);
    app.get(prefix + '/auto_scale_group/:asg_id',api_asg.get_asg);
    app.post(prefix + '/auto_scale_group/:asg_id',api_asg.update_asg);
    app.del(prefix + '/auto_scale_group/:asg_id',api_asg.delete_asg);

    app.get(prefix + '/environment',api_env.get_list);
    app.post(prefix + '/environment',api_env.add_env);
    app.get(prefix + '/environment/:env_id',api_env.get_env);
    app.post(prefix + '/environment/:env_id',api_env.update_env);

};

