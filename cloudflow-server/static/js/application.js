
var g_app = {};

var g_ejs_app_ver_list = false;

function appReady()
{
    g_ejs_app_ver_list = new EJS({ url: '/templates/app_ver_list.ejs' });

    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/application/' + g_app_id,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            g_app = data;
            $('#app_name').html(g_app.name);
            var args = {
                vers: g_app.versions
            };
            g_ejs_app_ver_list.update('app_version_list',args);
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
}
$(document).ready(appReady);

