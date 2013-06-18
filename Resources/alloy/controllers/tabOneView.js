function Controller() {
    function outputState() {
        var sync = $.basicSwitch.value;
        Ti.API.info("Switch value: " + sync);
        sync || alert("downloading will be slower if streaming is disabled");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
        id: "main",
        title: "POD Catcher"
    });
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.main.add($.__views.__alloyId2);
    $.__views.syncbutton = Ti.UI.createButton({
        width: 200,
        height: 50,
        color: "white",
        backgroundColor: "black",
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        title: "Sync",
        id: "syncbutton"
    });
    $.__views.__alloyId2.add($.__views.syncbutton);
    $.__views.basicSwitch = Ti.UI.createSwitch({
        titleOn: "Streaming Enabled",
        titleOff: "Streaming Disabled",
        value: "true",
        width: 200,
        height: 50,
        color: "white",
        backgroundColor: "black",
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        id: "basicSwitch"
    });
    $.__views.__alloyId2.add($.__views.basicSwitch);
    outputState ? $.__views.basicSwitch.addEventListener("change", outputState) : __defers["$.__views.basicSwitch!change!outputState"] = true;
    $.__views.taboneview = Ti.UI.createTab({
        font: {
            fontSize: 18
        },
        window: $.__views.main,
        id: "taboneview",
        title: "home"
    });
    $.__views.taboneview && $.addTopLevelView($.__views.taboneview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.syncbutton.addEventListener("click", function() {
        alert("you clicked the sync button");
    });
    __defers["$.__views.basicSwitch!change!outputState"] && $.__views.basicSwitch.addEventListener("change", outputState);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;