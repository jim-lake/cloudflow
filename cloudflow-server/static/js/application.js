
var g_app = {};

function appReady()
{
    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/application/' + g_appId,
        dataType: 'json',
        success: function(data) 
        {
            g_app = data;
            renderPage();
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
}
$(document).ready(appReady);

function renderPage()
{
    var name = "{0} v{1}".format(g_app.name,g_app.version);
    $('#app_name').html(name);
}

