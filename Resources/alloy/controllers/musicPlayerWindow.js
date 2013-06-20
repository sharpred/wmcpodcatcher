function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.musicwindow = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
        color: "black",
        id: "musicwindow",
        title: "Music Player"
    });
    $.__views.musicwindow && $.addTopLevelView($.__views.musicwindow);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.musicwindow.add($.__views.__alloyId2);
    $.__views.songtitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "songtitle"
    });
    $.__views.__alloyId2.add($.__views.songtitle);
    $.__views.startstopbutton = Ti.UI.createButton({
        width: 200,
        height: 50,
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        color: "black",
        title: "Start",
        id: "startstopbutton"
    });
    $.__views.__alloyId2.add($.__views.startstopbutton);
    $.__views.pauseresumebutton = Ti.UI.createButton({
        width: 200,
        height: 50,
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        color: "black",
        title: "Pause",
        id: "pauseresumebutton"
    });
    $.__views.__alloyId2.add($.__views.pauseresumebutton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var url;
    var audioPlayer = Ti.Media.createAudioPlayer({
        url: url,
        allowBackground: true
    });
    $.musicwindow.addEventListener("focus", function() {
        if (url) {
            $.startstopbutton.enabled = true;
            $.pauseresumebutton.enabled = true;
            $.songtitle.text = url;
        } else {
            $.startstopbutton.enabled = false;
            $.pauseresumebutton.enabled = false;
        }
    });
    $.musicwindow.addEventListener("close", function() {
        audioPlayer.stop();
        "android" === Ti.Platform.osname && audioPlayer.release();
    });
    $.startstopbutton.addEventListener("click", function() {
        audioPlayer.url = url;
        if (audioPlayer.playing || audioPlayer.paused) {
            $.startstopbutton.title = "start";
            audioPlayer.stop();
            $.pauseresumebutton.enabled = false;
        } else {
            $.startstopbutton.title = "stop";
            audioPlayer.start();
            $.pauseresumebutton.enabled = true;
        }
    });
    $.pauseresumebutton.addEventListener("click", function() {
        if (audioPlayer && audioPlayer.paused) {
            $.pauseresumebutton.title = "pause";
            audioPlayer.start();
        } else {
            $.pauseresumebutton.title = "resume";
            audioPlayer.pause();
        }
    });
    exports.openMainWindow = function(args) {
        var tab = args.tab;
        $.musicwindow.title = args.title;
        url = args.url;
        tab.open($.musicwindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;