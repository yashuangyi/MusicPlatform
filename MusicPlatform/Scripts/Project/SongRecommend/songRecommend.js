'use strict'

layui.config({
    base: '/Scripts/Project/SongRecommend/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //歌曲库数据表格
    table.render({
        elem: '#table_song',
        height: 600,
        width: 1500,
        url: '/SongRecommend/GetSong', //数据接口
        page: true,//开启分页
        cols: [[
            { field: "Id", title: "编号", sort: "true" },
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
            location.href = "/SongContent/SongForTourist?songId="+data.Id;
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_song', {
            where: { search: $('#input').val() }
        });
    });
});