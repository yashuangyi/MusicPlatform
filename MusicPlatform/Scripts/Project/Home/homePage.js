'use strict'

// 初始化信息
window.onload = function () {
    $.ajax({
        type: "get",
        url: "/Home/ReadPageState",
        data: { userId: $('#user_id', parent.document).val(), userPower: $('#user_power', parent.document).val()},
        success: function (res) {
            if (res.code === 200) {
                $('#userName', parent.document).text(res.name),
                $('#songNum').text(res.songNum);
                $('#timesNum').text(res.timesNum);
                $('#friendNum').text(res.friendNum);
            } else {
                layer.msg("账号异常，请联系系统管理员！");
                location.href = "/Login/Login";
            }
        }
    });

    if ($('#user_power', parent.document).val() === "管理员")
    {
        $("#parent").append('<li class="layui-col-xs3">\
            <a lay-href="../SongManage/SongManage">\
            <i class="layui-icon layui-icon-voice"></i>\
            <cite>歌库管理</cite>\
                                                </a >\
                                            </li >\
            <li class="layui-col-xs3">\
                <a lay-href="../UserManage/UserManage">\
                    <i class="layui-icon layui-icon-user"></i>\
                    <cite>用户管理</cite>\
                </a>\
            </li>\
            <li class= "layui-col-xs3">\
                <a lay-href="../CommentManage/CommentManage">\
                    <i class="layui-icon layui-icon-dialogue"></i>\
                    <cite>评论管理</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../Info/Info">\
                    <i class="layui-icon layui-icon-username"></i>\
                    <cite>基本资料</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../EditPassword/EditPassword">\
                    <i class="layui-icon layui-icon-password"></i>\
                    <cite>修改密码</cite>\
                </a>\
            </li>\
                                        </ul >\
                ');
    }
    else if ($('#user_power', parent.document).val() === "用户") {
        $("#parent").append('<li class="layui-col-xs3">\
            <a lay-href="../HeatRanking/HeatRanking">\
            <i class="layui-icon layui-icon-praise"></i>\
            <cite>热度排行</cite>\
                                                </a >\
                                            </li >\
            <li class="layui-col-xs3">\
                <a lay-href="../SongLibrary/SongLibrary">\
                    <i class="layui-icon layui-icon-headset"></i>\
                    <cite>发现音乐</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../FriendSystem/FriendSystem">\
                    <i class="layui-icon layui-icon-group"></i>\
                    <cite>寻找歌友</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../MyStar/MyStar">\
                    <i class="layui-icon layui-icon-star"></i>\
                    <cite>我的收藏</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../Info/Info">\
                    <i class="layui-icon layui-icon-username"></i>\
                    <cite>基本资料</cite>\
                </a>\
            </li>\
            <li class="layui-col-xs3">\
                <a lay-href="../EditPassword/EditPassword">\
                    <i class="layui-icon layui-icon-password"></i>\
                    <cite>修改密码</cite>\
                </a>\
            </li>');
    }
    else
    { 
        $("#parent").append('<li class="layui-col-xs3">\
            <a lay-href="../SongRecommend/SongRecommend">\
            <i class="layui-icon layui-icon-praise"></i>\
            <cite>歌曲推荐</cite>\
                                                </a >\
                                            </li >\
            <li class="layui-col-xs3">\
                <a lay-href="../SongLibrary/SongLibrary">\
                    <i class="layui-icon layui-icon-voice"></i>\
                    <cite>发现音乐</cite>\
                </a>\
            </li>');
    }
};