(function ($) {	
	var s = $("#ctul p").length;
			if(s>10){
				$("#ctul p:eq(9)").nextAll().hide();
				$("#ctshow").show();
			}else{
			   $("#ctshow").hide();
			}
			$("#ctshow").click(function(){
				if ($("#ctshow i").hasClass("fa fa-angle-down")==true){ 
					$("#ctshow i").attr("class","fa fa-angle-up");
					$("#ctshow font").html("收起");
					$("#ctul p:eq(9)").nextAll().show();
				}else{ 
					$("#ctshow i").attr("class","fa fa-angle-down");
					$("#ctshow font").html("查看更多");
					$("#ctul p:eq(9)").nextAll().hide();
				} 					
			});	
	
	/*收藏按钮与取消收藏切换*/
	$ ('.collection').toggle (function ()
        {
            $ (this).text ('取消收藏').css ('color', '#188EEE').css ('background-color', '#fff').css ('fontSize', '14px');
        }, function ()
        {
            $ (this).text ('收藏').css ('color', '#fff').css ('background-color', '#188EEE').css ('fontSize', '14px');
        });
    
    var temp = "";
    $.ajax({
        type: "get",
        async:false,
        url: "/SongContent/ReadSong",
        data: { songId:$("#song_id").val() },
        success: function (res) {
            if (res.code === 200) {
                temp = ".."+res.songPath;
            } else {
                layer.msg("账号异常，请联系系统管理员！");
                location.href = "/Home/Home";
            }
        }
    });

	/*音乐播放器*/
    // Settings
    var repeat = localStorage.repeat || 0,
		shuffle = localStorage.shuffle || 'false',
		continous = false,
		autoplay = false,
		playlist = [
		{
		    title: '',
		    artist: '',
		    album: '',
		    cover: '',
		    mp3: temp,
		    ogg: ''
        },];

    // Load playlist
    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];
        $('#playlist').append('<li>' + item.artist + ' - ' + item.title + '</li>');
    }

    var time = new Date(),
		currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
		trigger = false,
		audio, timeout, isPlaying, playCounts;

    var play = function () {
        audio.play();
        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
    }

    var pause = function () {
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    }

    // Update progress
    var setProgress = function (value) {
        var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
			ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value / 60) + ':' + currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }

    var updateProgress = function () {
        setProgress(audio.currentTime);
    }

    // Progress slider
    $('.progress .slider').slider({
        step: 0.1, slide: function (event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        }, stop: function (event, ui) {
            audio.currentTime = audio.duration * ui.value / 100;
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });
    value=100;
    // Volume slider
    var setVolume = function (value) {
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1, min: 0, step: 0.01, value: volume, slide: function (event, ui) {
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        }, stop: function () {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    $('.mute').click(function () {
        if ($(this).hasClass('enable')) {
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });

    // Switch track
    var switchTrack = function (i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) play();
    }

    // Shuffle
    var shufflePlay = function () {
        var time = new Date(),
			lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack)++currentTrack;
        switchTrack(currentTrack);
    }

    // Fire when track ended
    var ended = function () {
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true) isPlaying = true;
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    }

    var beforeLoad = function () {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    }

    // Fire when track loaded completely
    var afterLoad = function () {
        if (autoplay == true) play();
    }

    // Load track
    var loadMusic = function (i) {
        var item = playlist[i];
        var newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');

        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span><span class="album">' + item.album + '</span>');
        $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
    }

    loadMusic(currentTrack);
    $('.playback').on('click', function () {
        if ($(this).hasClass('playing')) {
            pause();
        } else {
            play();
        }
    });


    $('#playlist li').each(function (i) {
        var _i = i;
        $(this).on('click', function () {
            switchTrack(_i);
        });
    });

})(jQuery);