'use strict'

layui.config({
    base: '/Scripts/Project/MyStar/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //歌曲库数据表格
    table.render({
        elem: '#table_song',
        height: 600,
        width: 1500,
        url: '/MyStar/GetSong', //数据接口
        page: true,//开启分页
        where: { userId: $('#user_id', parent.document).val()},
        cols: [[
            { field: "Name", title: "歌名" },
            { field: "SingerName", title: "歌手", sort: "true" },
            { field: "Language", title: "语言" },
            { field: "Style", title: "风格" },
            { field: "Time", title: "发布时间", sort: "true", width: 170 },
            { field: "Times", title: "播放量", sort: "true" },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 300 }
        ]],
        text: {
            none: '查无记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //监听表格工具栏
    table.on('tool(table_song)', function (obj) {
        var data = obj.data;
        if (obj.event === 'play') {
            location.href = "/SongContent/SongContent?songId="+data.SongId+"&userId="+$('#user_id', parent.document).val();
        }
        else if (obj.event === 'set-notStar') {
            layer.confirm('确认取消收藏吗?', function () {
                $.getJSON('/MyStar/SetNotStar', { starId: data.StarId}, function (res) {
                    if (res.code === 200) {
                        layer.alert("取消收藏成功!", function success() {
                            window.location.reload();
                        });
                    }
                    else {
                        layer.alert("取消失败!");
                    }
                });
            });
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_star', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});