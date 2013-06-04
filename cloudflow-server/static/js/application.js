
var g_app = {};

var g_ejs_app_ver_list = false;

function appReady()
{
    g_ejs_app_ver_list = new EJS({ url: '/templates/app_ver_list.ejs' });

    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/application/' + g_appId,
        dataType: 'json',
        success: function(data) 
        {
            g_app = data;
            $('#app_name').html(g_app.name);
            g_ejs_app_ver_list.update('app_version_list',{ vers: g_app.versions });
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
}
$(document).ready(appReady);

