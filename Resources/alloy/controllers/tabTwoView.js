function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.current = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
        id: "current",
        title: "Current Music"
    });
    $.__views.taboneview = Ti.UI.createTab({
        font: {
            fontSize: 18
        },
        window: $.__views.current,
        id: "taboneview",
        title: "Music"
    });
    $.__views.taboneview && $.addTopLevelView($.__views.taboneview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;