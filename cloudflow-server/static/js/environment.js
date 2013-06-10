var g_env = {};
var g_ejs_env_body = false;

function envReady()
{
    g_ejs_env_body = new EJS({ url: '/templates/env_body.ejs' });

    var url = "/api/environment/{0}".format(g_env_id);
    jQuery.ajax(
    {
        type: 'GET',
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            g_env = data;
            var args = {
                env: g_env,
                apps: []
            };
            g_ejs_env_body.update('body',args);
        },
        error: function()
        {
            window.alert("Failed to get environment data.");
        }
    });
}
$(document).ready(envReady);
