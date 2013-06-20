var url;

var audioPlayer = Ti.Media.createAudioPlayer({
    url : url,
    allowBackground : true
});

$.musicwindow.addEventListener('focus', function() {

    if (!url) {
        $.startstopbutton.enabled = false;
        $.pauseresumebutton.enabled = false;
    } else {

        $.startstopbutton.enabled = true;
        $.pauseresumebutton.enabled = true;
        $.songtitle.text = url;
    };

});

$.musicwindow.addEventListener('close', function() {
    audioPlayer.stop();
    if (Ti.Platform.osname === 'android') {
        audioPlayer.release();
    }
});

$.startstopbutton.addEventListener('click', function() {
    audioPlayer.url = url;
    // When paused, playing returns false.
    // If both are false, playback is stopped.
    if ((audioPlayer.playing || audioPlayer.paused)) {
        $.startstopbutton.title = 'start';
        audioPlayer.stop();
        $.pauseresumebutton.enabled = false;
        if (Ti.Platform.name === 'android') {
            audioPlayer.release();
        }
    } else {
        $.startstopbutton.title = 'stop';
        audioPlayer.start();
        $.pauseresumebutton.enabled = true;
    }
});

$.pauseresumebutton.addEventListener('click', function() {
    if (audioPlayer && audioPlayer.paused) {
        $.pauseresumebutton.title = 'pause';
        audioPlayer.start();
    } else {
        $.pauseresumebutton.title = 'resume';
        audioPlayer.pause();
    }
});

exports.openMainWindow = function(args) {
    var tab = args.tab;
    $.musicwindow.title = args.title;
    url = args.url;
    tab.open($.musicwindow);
};
