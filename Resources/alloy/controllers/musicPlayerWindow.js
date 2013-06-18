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
    $.__views.startbutton = Ti.UI.createButton({
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
        id: "startbutton"
    });
    $.__views.__alloyId2.add($.__views.startbutton);
    $.__views.pausebutton = Ti.UI.createButton({
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
        id: "pausebutton"
    });
    $.__views.__alloyId2.add($.__views.pausebutton);
    $.__views.stopbutton = Ti.UI.createButton({
        width: 200,
        height: 50,
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        color: "black",
        title: "Stop",
        id: "stopbutton"
    });
    $.__views.__alloyId2.add($.__views.stopbutton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var url;
    exports.openMainWindow = function(args) {
        var tab = args.tab;
        $.musicwindow.title = args.title;
        url = args.url;
        tab.open($.musicwindow);
    };
    $.musicwindow.addEventListener("focus", function() {
        if (url) {
            $.startbutton.enabled = true;
            $.pausebutton.enabled = true;
            $.stopbutton.enabled = true;
            $.songtitle.text = url;
        } else {
            $.startbutton.enabled = false;
            $.pausebutton.enabled = false;
            $.stopbutton.enabled = false;
            $.songtitle.text = "";
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;