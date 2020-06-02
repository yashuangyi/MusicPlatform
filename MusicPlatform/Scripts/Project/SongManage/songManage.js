'use strict'

layui.config({
    base: '/Scripts/Project/SongManage/' //静态资源所在路径
}).use(['form', 'table', 'upload'], function () {
    var form = layui.form
        , upload = layui.upload
        , table = layui.table;

    //歌曲库数据表格
    table.render({
        elem: '#table_song',
        height: 600,
        width: 1500,
        url: '/SongManage/GetSong', //数据接口
        page: true,//开启分页
        cols: [[
            { field: "Id", title: "编号", sort: "true" },
            { field: "Name", title: "歌名" },
            { field: "SingerName", title: "歌手" },
            { field: "Language", title: "语言" },
            { field: "Style", title: "风格" },
            { field: "Time", title: "发布时间", sort: "true", width: 170 },
            { field: "Times", title: "播放量" },
            { field: "IsRecommend", title: "状态", templet: '#statusbar', sort: "true" },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 300 }
        ]],
        text: {
            none: '查无记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //上传歌曲功能
    upload.render({
        elem: '#btn_selectSong',
        url: '/SongManage/UploadSong',
        auto: false,//不自动上传
        accept: 'audio',
        acceptMime: 'audio/*',
        //exts: 'pdf|docx',
        bindAction: '#btn_uploadSong', //触发上传的按钮
        before: function () {
            layer.load();
        },
        done: function (res) {
            layer.closeAll('loading');
            $('#btn_selectSong').html("<i class=''layui-icon layui-icon-upload-drag'></i>重新选择");
            if (res.code === 200) {
                layer.msg(res.msg);
                $('#song').html("<i class='layui-icon layui-icon-file'></i> <a href='" + res.songPath + "'>" + res.songName + "<a/>");
                $('#songPath').val(res.songPath);
            } else {
                layer.msg(res.msg);
                $('#song').html("");
                $('#songPath').val("");
            }
        },
    });

    //上传歌词功能
    upload.render({
        elem: '#btn_selectWord',
        url: '/SongManage/UploadWord',
        auto: false,//不自动上传
        accept: 'file',
        acceptMime: 'file/pdf,file/txt',
        exts: 'pdf|txt',
        bindAction: '#btn_uploadWord', //触发上传的按钮
        before: function () {
            layer.load();
        },
        done: function (res) {
            layer.closeAll('loading');
            $('#btn_selectWord').html("<i class=''layui-icon layui-icon-upload-drag'></i>重新选择");
            if (res.code === 200) {
                layer.msg(res.msg);
                $('#word').html("<i class='layui-icon layui-icon-file'></i> <a href='" + res.wordPath + "'>" + res.wordName + "<a/>");
                $('#wordPath').val(res.wordPath);
            } else {
                layer.msg(res.msg);
                $('#word').html("");
                $('#wordPath').val("");
            }
        },
    });

    //监听"新增歌曲"按钮
    window.btn_addSong = function () {
        $('#id').val(0);
        $('#times').val(0);
        $('#time').val("");
        $('#name').val("");
        $('#singerName').val("");
        $('#language').val("");
        $('#style').val("");
        $('#songPath').val("");
        $('#wordPath').val("");

        layer.open({
            type: 1, //页面层
            title: "新增歌曲",
            area: ['500px', '600px'],
            btn: ['保存', '取消'],
            btnAlign: 'c', //按钮居中
            content: $('#div_addSong'),
            success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                // 解决按回车键重复弹窗问题
                $(':focus').blur();
                // 为当前DOM对象添加form标志
                layero.addClass('layui-form');
                // 将保存按钮赋予submit属性
                layero.find('.layui-layer-btn0').attr({
                    'lay-filter': 'btn_saveAdd',
                    'lay-submit': ''
                });
                // 表单验证
                form.verify();
                // 刷新渲染(否则开关按钮不会显示)
                form.render();
            },
            yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                form.on('submit(btn_saveAdd)', function (data) {//data按name获取
                    if ($('#songPath').val() == "" || $('#songPath').val() == null) {
                        layer.alert("请上传歌曲！");
                        return false;
                    }
                    if ($('#wordPath').val() == "" || $('#wordPath').val() == null) {
                        layer.alert("请上传歌词！");
                        return false;
                    }
                    $.ajax({
                        type: 'post',
                        url: '/SongManage/AddSong',
                        dataType: 'json',
                        data: data.field,
                        success: function (res) {
                            if (res.code === 200) {
                                layer.alert("新增歌曲成功！", function (index) {
                                    window.location.reload();
                                });
                            } else {
                                layer.alert(res.msg);
                            }
                        }
                    });
                });
            }
        });
    }

    //监听表格工具栏
    table.on('tool(table_song)', function (obj) {
        var data = obj.data;
        if (obj.event === 'set-recommend') {
            $.ajax({
                type: "post",
                url: "/SongManage/SetRecommend",
                data: data,
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        layer.alert("推荐歌曲成功!", function (index) {
                            window.location.reload();
                        });
                    }
                }
            });
        }
        else if (obj.event === 'set-notRecommend') {
            $.ajax({
                type: "post",
                url: "/SongManage/SetNotRecommend",
                data: data,
                dataType: "json",
                success: function (res) {
                    console.log(data.field);
                    if (res.code === 200) {
                        layer.alert("取消推荐成功!", function (index) {
                            window.location.reload();
                        });
                    }
                }
            });
        }
        else if (obj.event === 'play') {
            location.href = "/SongContent/SongForTourist?songId="+data.Id;
        }
        else if (obj.event === 'edit') {
            $('#id').val(data.Id);
            $('#times').val(data.Times);
            $('#time').val(data.Time);
            $('#name').val(data.Name);
            $('#singerName').val(data.SingerName);
            $('#language').val(data.Language);
            $('#style').val(data.Style);
            var select = document.getElementsByName("isRecommend");
            for (let i = 0; i < select.length; i++) {
                if (select[i].value == data.IsRecommend) {
                    select[i].checked = true;
                    break;
                }
            }
            $('#songPath').val(data.SongPath);
            $('#wordPath').val(data.WordPath);
            layer.open({
                type: 1, //页面层
                title: "修改歌曲信息",
                area: ['600px', '400px'],
                btn: ['保存', '取消'],
                btnAlin: 'c', //按钮居中
                content: $('#div_addSong'),
                success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                    // 解决按回车键重复弹窗问题
                    $('focus').blur();
                    // 为当前DOM对象添加form标志
                    layero.addClass('layui-form');
                    // 将保存按钮赋予submit属性
                    layero.find('.layui-layer-btn0').attr({
                        'lay-filter': 'btn_saveSongEdit',
                        'lay-submit': ''
                    });
                    // 表单验证
                    form.verify();
                    // 刷新渲染(否则开关按钮不会显示)
                    form.render();
                },
                yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                    form.on('submit(btn_saveSongEdit)', function (data) {//data按name获取
                        if (data.field.password != data.field.pwAgain) {
                            layer.msg("两次密码不一致，请重新输入!");
                            return false;
                        }
                        $.ajax({
                            type: 'post',
                            url: '/SongManage/EditSong',
                            dataType: 'json',
                            data: data.field,
                            success: function (res) {
                                if (res.code === 200) {
                                    layer.alert("修改成功!", function (index) {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                    });
                }
            });
        }
        else if (obj.event === 'del') {
            layer.confirm('确认删除该歌曲?', function () {
                $.ajax({
                    type: "post",
                    url: "/SongManage/DeleteSong",
                    data: data,
                    dataType: "json",
                    success: function (res) {
                        if (res.code === 200) {
                            layer.alert("删除成功!", function (index) {
                                window.location.reload();
                            });
                        }
                    }
                });
            });
            
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_song', {
            where: { search: $('#input').val() }
        });
    });
});