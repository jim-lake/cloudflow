
var g_app = {};
var g_ejs_app_ver_body = false;

function appReady()
{
    g_ejs_app_ver_body = new EJS({ url: '/templates/app_ver_body.ejs' });

    var url = "/api/app_ver/{0}".format(g_app_ver_id);
    jQuery.ajax(
    {
        type: 'GET',
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            g_app = data;
            var args = {
                app: g_app
            };
            g_ejs_app_ver_body.update('body',args);
        },
        error: function()
        {
            window.alert("Failed to get application data.");
        }
    });
}
$(document).ready(appReady);

function asgViewUrl(asg)
{
    var url = "/auto_scale_group/{0}".format(asg.auto_scale_group_id);
    return url;
}
function asgDelete(i)
{
    var asg = g_app.auto_scale_groups[i];
    var asg_id = asg.auto_scale_group_id;
    if( !window.confirm("Delete Auto Scale Group: {0}?".format(asg.name)) )
    {
        return false;
    }
    
    var url = "/api/auto_scale_group/{0}".format(asg_id);
    jQuery.ajax(
    {
        type: 'DELETE',
        url: url,
        dataType: 'json',
        success: function(data) 
        {
            g_app.auto_scale_groups.splice(i,1);
            var args = {
                app: g_app
            };
            g_ejs_app_ver_body.update('body',args);
        },
        error: function()
        {
            window.alert("Delete failed for asg.");
        }
    });
}
function asgAdd()
{
    var name = $('#new_asg_name').val();
    if( !name )
    {
        window.alert("Please provide a name for your new Auto Scaling Group.");
        return;
    }
    var args = {
        app_version_id: g_app_ver_id,
        name: name
    };
    var url = "/api/auto_scale_group";
    
    jQuery.ajax(
    {
        type: 'POST',
        url: url,
        data: args,
        dataType: 'json',
        success: function(data) 
        {
            var asg_id = data.auto_scale_group_id;
            var url = "/auto_scale_group/{0}".format(asg_id);
            window.location.href = url;
        },
        error: function()
        {
            window.alert("Failed to add asg.");
        }
    });
}
