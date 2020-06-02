'use strict'

layui.config({
    base: '/Scripts/Project/FriendSystem/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //歌曲库数据表格
    table.render({
        elem: '#table_friend',
        height: 600,
        width: 1500,
        url: '/FriendSystem/GetFriend', //数据接口
        page: true,//开启分页
        where: { userId: $('#user_id', parent.document).val()},
        cols: [[
            //{ field: "Id", title: "编号", sort: "true" },
            { field: "Name", title: "昵称" },
            { field: "Love", title: "爱好" },
        ]],
        text: {
            none: '查无记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_friend', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});