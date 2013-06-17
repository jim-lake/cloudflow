var g_env = {};
var g_apps = [];
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
            g_env = data.environment;
            g_apps = data.applications;
            var args = {
                env: g_env,
                apps: g_apps
            };
            g_ejs_env_body.update('body',args);
            updateButtonStates();
        },
        error: function()
        {
            window.alert("Failed to get environment data.");
        }
    });
}
$(document).ready(envReady);

function updateButtonStates()
{
    for( var i = 0 ; i < g_apps.length ; ++i )
    {
        var app = g_apps[i];
        
        for( var j = 0 ; j < app.versions.length ; ++j )
        {
            var app_ver = app.versions[j];
            var status = app_ver.status;
            var sel = "#app_{0} #ver_{1} ".format(i,j);
            
            if( status == 'Not Running' )
            {
                $(sel + ".start button").removeAttr("disabled");
                $(sel + ".stop button").attr("disabled", "disabled");
                $(sel + ".stage button").removeAttr("disabled");
                $(sel + ".promote button").attr("disabled", "disabled");
                $(sel + ".cleanup button").attr("disabled", "disabled");
            }
            else if( status == 'Starting' )
            {
                $(sel + ".start button").attr("disabled", "disabled");
                $(sel + ".stop button").attr("disabled", "disabled");
                $(sel + ".stage button").attr("disabled", "disabled");
                $(sel + ".promote button").attr("disabled", "disabled");
                $(sel + ".cleanup button").attr("disabled", "disabled");
            }
        }
    }
}

function appStart(i,j)
{
    var app = g_apps[i];
    var app_ver = app.versions[j];
    
    app_ver.status = "Starting";
    updateButtonStates();
    
    var url = "/api/environment/{0}/app_ver/{1}/start".format(g_env_id,app_ver.app_version_id);
    jQuery.ajax(
    {
        type: 'POST',
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            window.alert("App Started");
        },
        error: function()
        {
            window.alert("App Start Success.");
        }
    });
}
