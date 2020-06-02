'use strict'

// 初始化信息
window.onload = function () {
    if ($('#user_id').val() !== "") {
        if ($('#user_power').val() === "管理员") {
            $("#LAY-system-side-menu").append('<li data-name="heat" class="layui-nav-item">\
                <a lay-href="../SongManage/SongManage" lay-tips="歌库管理" lay-direction="2">\
                <i class="layui-icon layui-icon-voice"></i>\
                <cite>歌库管理</cite>\
                            </a >\
                        </li >\
                <li data-name="library" class="layui-nav-item">\
                    <a lay-href="../CommentManage/CommentManage" lay-tips="评论管理" lay-direction="2">\
                        <i class="layui-icon layui-icon-dialogue"></i>\
                        <cite>评论管理</cite>\
                    </a>\
                </li>\
                <li data-name="library" class="layui-nav-item">\
                    <a lay-href="../UserManage/UserManage" lay-tips="用户管理" lay-direction="2">\
                        <i class="layui-icon layui-icon-user"></i>\
                        <cite>用户管理</cite>\
                    </a>\
                        </li>');
        }
        else if ($('#user_power').val() === "用户") {
            var html = "";
            html += '<li data-name="heat" class="layui-nav-item">';
            html += '<a lay-href="../HeatRanking/HeatRanking" lay-tips="热度排行" lay-direction="2">';
            html += '<i class="layui-icon layui-icon-praise"></i>';
            html += '<cite>热度排行</cite>';
            html += '</a>';
            html += '</li>';
            html += '<li data-name="library" class="layui-nav-item">';
            html += '<a lay-href="../SongLibrary/SongLibrary" lay-tips="发现音乐" lay-direction="2">';
            html += '<i class="layui-icon layui-icon-headset"></i>';
            html += '<cite>发现音乐</cite>';
            html += '</a>';
            html += '</li>';
            html += '<li data-name="friend" class="layui-nav-item">';
            html += '<a lay-href="../FriendSystem/FriendSystem" lay-tips="寻找歌友" lay-direction="2">';
            html += '<i class="layui-icon layui-icon-group"></i>';
            html += '<cite>寻找歌友</cite>';
            html += '</a>';
            html += '</li>';
            html += '<li data-name="star" class="layui-nav-item">';
            html += '<a lay-href="../MyStar/MyStar" lay-tips="我的收藏" lay-direction="2">';
            html += '<i class="layui-icon layui-icon-star"></i>';
            html += '<cite>我的收藏</cite>';
            html += '</a>';
            html += '</li>';

            $("#LAY-system-side-menu").append(html);

        }
        else if ($('#user_power').val() === "游客"){ // 游客访问
            //layer.msg("请重新登录！");
            //location.href = "/Login/Login";
            $('#userName').text("游客");
            $('#setting').remove();
            $('#info').remove();
            $('#edit_password').remove();
            $("#LAY-system-side-menu").append('<li data-name="recommend" class="layui-nav-item">\
                <a lay-href="../SongRecommend/SongRecommend" lay-tips="歌曲推荐" lay-direction="2">\
                    <i class="layui-icon layui-icon-praise"></i>\
                    <cite>歌曲推荐</cite>\
                </a>\
            </li>\
            <li data-name="library" class="layui-nav-item">\
                <a lay-href="../SongLibrary/SongLibrary" lay-tips="发现音乐" lay-direction="2">\
                    <i class="layui-icon layui-icon-headset"></i>\
                    <cite>发现音乐</cite>\
                </a>\
            </li>');
        }
    } 
    else {
        layer.msg("账号异常，请联系系统管理员！");
        location.href = "/Login/Login";
    }
};