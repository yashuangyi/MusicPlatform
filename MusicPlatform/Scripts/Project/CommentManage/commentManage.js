layui.config({
    base: '/Scripts/Project/SongContent/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //歌曲库数据表格
    table.render({
        elem: '#table_comment',
        height: 600,
        width: 1500,
        url: '/CommentManage/GetComment', //数据接口
        page: true,//开启分页
        cols: [[
            { field: "Name", title: "用户", templet: '#statusbar' },
            { field: "Time", title: "评论时间", sort: true },
            { field: "Content", title: "评论内容", width: 800 },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 150 }
        ]],
        text: {
            none: '查无记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //监听表格工具栏
    table.on('tool(table_comment)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确认删除该评论?', function () {
                $.ajax({
                    type: "post",
                    url: "/SongContent/DeleteComment",
                    data: { commentId: data.Id },
                    dataType: "json",
                    success: function (res) {
                        if (res.code === 200) {
                            layer.alert("删除成功!", function (index) {
                                table.reload('table_comment', {
                                    where: { songId: $("#song_id").val() }
                                });
                                layer.close(index);
                            });
                        }
                    }
                });
            });
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_comment', {
            where: { search: $('#input').val() }
        });
    });
});