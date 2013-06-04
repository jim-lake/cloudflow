
var g_applications = [];
var g_environments = [];

var g_ejs_app_list = false;
var g_ejs_env_list = false;

function indexReady()
{
    g_ejs_app_list = new EJS({ url: '/templates/app_list.ejs' });
    g_ejs_env_list = new EJS({ url: '/templates/env_list.ejs' });

    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/application',
        dataType: 'json',
        success: function(data) 
        {
            g_applications = data;
            g_ejs_app_list.update('application_list',{ apps: data });
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/environment',
        dataType: 'json',
        success: function(data) 
        {
            g_environments = data;
            g_ejs_env_list.update('environment_list',{ envs: data });
        },
        error: function()
        {
            window.alert("Failed to get environment data.");
        }
    });
}
$(document).ready(indexReady);


