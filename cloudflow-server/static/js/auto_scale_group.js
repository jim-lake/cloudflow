
var g_asg = {};
var g_ejs_asg_body = false;

function asgReady()
{
    g_ejs_asg_body = new EJS({ url: '/templates/asg_body.ejs' });

    var url = "/api/auto_scale_group/{0}".format(g_asg_id);
    jQuery.ajax(
    {
        type: 'GET',
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            g_asg = data;
            var args = {
                asg: g_asg
            };
            g_ejs_asg_body.update('body',args);
        },
        error: function()
        {
            window.alert("Failed to get auto scale group data.");
        }
    });
}
$(document).ready(asgReady);

