
var g_app = {};
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
            g_asg = data.auto_scale_group;
            g_app = data.application;
            
            var vpc_selected = "";
            var ec2_selected = "";
            var vpc_section_style = "";
            var ec2_section_style = "";
            if( g_asg.vpc_subnet_list.length > 0 )
            {
                vpc_selected = "selected=selected";
                ec2_section_style = "style='display: none'";
            }
            else
            {
                ec2_selected = "selected=selected";
                vpc_section_style = "style='display: none'";
            }
            var args = {
                app: g_app,
                asg: g_asg,
                vpc_selected: vpc_selected,
                ec2_selected: ec2_selected,
                vpc_section_style: vpc_section_style,
                ec2_section_style: ec2_section_style
            };
            g_ejs_asg_body.update('body',args);
            $('#ec2_or_vpc').change(vpcDropdownChange);
        },
        error: function()
        {
            window.alert("Failed to get auto scale group data.");
        }
    });
    
}
$(document).ready(asgReady);

function vpcDropdownChange()
{
    var val = $(this).find("option:selected").val();
    if( val == 'EC2' )
    {
        $('#ec2_section').show();
        $('#vpc_section').hide();
    }
    else
    {
        $('#vpc_section').show();
        $('#ec2_section').hide();
    }
}

function asgSave()
{
    var name = $('#name').val();
    var ami = $('#ami').val();
    var instance_type = $('#instance_type').val();
    var min = $('#min').val();
    var desired = $('#desired').val();
    var max = $('#max').val();
    var is_ec2 = $('#ec2_or_vpc').find("option:selected").val() == 'EC2';
    var vpc_subnet_list = "";
    var availability_zone_list = "";
    if( is_ec2 )
    {
        availability_zone_list = $('#availability_zone_list').val();
    }
    else
    {
        vpc_subnet_list = $('#vpc_subnet_list').val();
    }
    var security_group_list = $('#security_group_list').val();
    var key_pair = $('#key_pair').val();
    var iam_role = $('#iam_role').val();
    var root_volume_gb = $('#root_volume_gb').val();
    
    var args = {
        name: name,
        ami: ami,
        instance_type: instance_type,
        min: min,
        desired: desired,
        max: max,
        vpc_subnet_list: vpc_subnet_list,
        availability_zone_list: availability_zone_list,
        security_group_list: security_group_list,
        key_pair: key_pair,
        iam_role: iam_role,
        root_volume_gb: root_volume_gb
    };
    var url = "/api/auto_scale_group/{0}".format(g_asg_id);
    jQuery.ajax(
    {
        type: 'POST',
        url: url,
        data: args,
        dataType: 'json',
        cache: false,
        success: function(data) 
        {
            window.alert("Auto scale group saved!");
        },
        error: function()
        {
            window.alert("Failed to save auto scale group.");
        }
    });
}

