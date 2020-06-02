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
                setSrc(".."+res.wordPath);
            } else {
                layer.msg("账号异常，请联系系统管理员！");
                location.href = "/Home/Home";
            }
        }
    });
};

//修改iframe的读取路径并刷新
function setSrc(path) {
    //此句必须在前面
    $("#iframe").get(0).contentWindow.location.reload(true);
    var iframe = $("#iframe").get(0);
    iframe.src = path;
}