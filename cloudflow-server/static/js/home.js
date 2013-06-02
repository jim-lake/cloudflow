
var g_applications = [];
var g_environments = [];

function indexReady()
{
    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/applications',
        dataType: 'json',
        success: function(data) 
        {
            g_applications = data;
            renderIndex();
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/environments',
        dataType: 'json',
        success: function(data) 
        {
            g_environments = data;
            renderIndex();
        },
        error: function()
        {
            window.alert("Failed to get environment data.");
        }
    });
}
$(document).ready(indexReady);


function renderIndex()
{
}
