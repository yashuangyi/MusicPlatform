'use strict'

// 初始化信息
window.onload = function () {
    if ($('#user_power', parent.document).val() === "用户") {
        $.ajax({
            type: 'get',
            url: '/Info/GetUserInfo',
            dataType: 'json',
            data: { userId: $('#user_id', parent.document).val() },
            success: function (res) {
                if (res.code === 200) {
                    $('#userId').val(res.data.id);
                    $('#name').val(res.data.name);
                    $('#account').val(res.data.account);
                    $('#power').val("用户");
                }
            }
        });
    }
    else if ($('#user_power', parent.document).val() === "管理员"){
        $.ajax({
            type: 'get',
            url: '/Info/GetAdminInfo',
            dataType: 'json',
            data: { userId: $('#user_id', parent.document).val() },
            success: function (res) {
                if (res.code === 200) {
                    $('#userId').val(res.data.id);
                    $('#name').val(res.data.name);
                    $('#account').val(res.data.account);
                    $('#power').val("管理员");
                }
            }
        });
    }
}

layui.config({
    base: '/Scripts/Project/Info/' //静态资源所在路径
}).use(['form'], function () {
    var form = layui.form;

    //监听修改按钮
    $("#submit").click(function () {
        if ($('#name').val() == null) {
            layer.msg("昵称不可为空!");
            return false;
        }
        if ($('#user_power', parent.document).val() === "用户") {
            $.ajax({
                url: "/Info/EditUserInfo",
                dataType: "json",
                type: "post",
                data: {
                    name: $('#name').val(),
                    id: $('#userId').val(),
                },
                success: function (res) {
                    if (res.code === 200) {
                        layer.alert("修改成功!", function (index) {
                            parent.window.location.reload();
                        });
                    }
                    else if (res.code === 402) {
                        layer.alert("修改失败!");
                    }
                },
            });
        }
        else if ($('#user_power', parent.document).val() === "管理员") {
            $.ajax({
                url: "/Info/EditAdminInfo",
                dataType: "json",
                type: "post",
                data: {
                    name: $('#name').val(),
                    id: $('#userId').val(),
                },
                success: function (res) {
                    if (res.code === 200) {
                        layer.alert("修改成功!", function (index) {
                            // window.location.reload();
                            parent.window.location.reload();
                        });
                    }
                    else if (res.code === 402) {
                        layer.alert("修改失败!");
                    }
                },
            });
        }
    });
});