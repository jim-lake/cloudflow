
var g_applications = [];
var g_environments = [];

function indexReady()
{
    jQuery.ajax(
    {
        type: 'GET',
        url: '/api/application',
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
        url: '/api/environment',
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
    $('#environment_list').empty();
    var html = "";
    for( var i = 0 ; i < g_environments.length ; ++i )
    {
        var env = g_environments[i];
    
        html += "<div class='line'>";
        html += " <div class='name'>{0}</div>".format(env.name);
        html += "  <div class='action view'>";
        html += "   <a href='/environment/{0}'>View</a>".format(env.id);
        html += "  </div>".format(name);
        html += "</div>";
    }
    $('#environment_list').html(html);

    $('#application_list').empty();
    var html = "";
    for( var i = 0 ; i < g_applications.length ; ++i )
    {
        var app = g_applications[i];
    
        html += "<div class='line'>";
        html += " <div class='name'>{0}</div>".format(app.name);
        html += "  <div class='action view'>";
        html += "   <a href='/application/{0}'>View</a>".format(app.id);
        html += "  </div>".format(name);
        html += "</div>";
    }
    $('#application_list').html(html);
}

