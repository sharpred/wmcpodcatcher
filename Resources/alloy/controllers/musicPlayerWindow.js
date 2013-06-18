function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.musicwindow = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
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
    exports.openMainWindow = function(_tab) {
        _tab.open($.musicwindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;