// 初始化信息
window.onload = function () {
    if($("#song_id").val()==null||$("#song_id").val()==""){
        layer.msg("账号异常，请联系系统管理员！");
        location.href = "/Home/Home";
    }
    $.ajax({
        type: "get",
        url: "/SongContent/ReadSong",
        data: { songId:$("#song_id").val() },
        success: function (res) {
            if (res.code === 200) {
                $("#title").text(res.name);
                $("#singer").text(res.singerName);
                $("#language").text(res.language);
                $("#style").text(res.style);
                $("#time").text(res.time);
                $("#download").attr("href", ".."+res.songPath);
                $("#download").attr("download", res.name+".mp3");
                setSrc(".."+res.wordPath);
            } else {
                layer.msg("账号异常，请联系系统管理员！");
                location.href = "/Home/Home";
            }
        }
    });
};

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
        url: '/SongContent/GetComment', //数据接口
        page: true,//开启分页
        where:{songId:$("#song_id").val()},
        cols: [[
            { field: "Name", title: "用户" , templet: '#statusbar'},
            { field: "Time", title: "评论时间", sort: true},
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
                    data: {commentId:data.Id},
                    dataType: "json",
                    success: function (res) {
                        if (res.code === 200) {
                            layer.alert("删除成功!", function (index) {
                                table.reload('table_comment', {
                                    where: { songId:$("#song_id").val() }
                                });
                                layer.close(index);
                            });
                        }
                    }
                });
            });
        }
    });

    //监听提交评论按钮
    $("#submit").click(function () {
        if ($('#input').val() == "" || $('#input').val() == null) {
            layer.alert("请先填写评论！");
            return false;
        }
        $.ajax({
            type: 'post',
            url: '/SongContent/AddComment',
            dataType: 'json',
            data: {songId:$("#song_id").val(), userId:$("#user_id").val(), input:$("#input").val()},
            success: function (res) {
                if (res.code === 200) {
                    layer.alert("评论成功！", function (index) {
                        $('#input').val("");
                        table.reload('table_comment', {
                            where: { songId:$("#song_id").val() }
                        });
                        layer.close(index);
                    });
                } else {
                    layer.alert(res.msg);
                }
            }
        });
    });
});

//修改iframe的读取路径并刷新
function setSrc(path) {
    //此句必须在前面
    $("#iframe").get(0).contentWindow.location.reload(true);
    var iframe = $("#iframe").get(0);
    iframe.src = path;
}