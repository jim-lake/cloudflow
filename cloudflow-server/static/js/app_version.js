
var g_app = {};

function appReady()
{
    var url = "/api/application/{0}/ver/{1}".format(g_appId,g_appVersionId);
    jQuery.ajax(
    {
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) 
        {
            g_app = data;
            $('#app_name').html(g_app.name);
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
}
$(document).ready(appReady);

