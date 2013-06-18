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
    $.__views.musictable = Ti.UI.createTableView({
        id: "musictable"
    });
    $.__views.current.add($.__views.musictable);
    $.__views.tabtwoview = Ti.UI.createTab({
        font: {
            fontSize: 18
        },
        window: $.__views.current,
        id: "tabtwoview",
        title: "Music"
    });
    $.__views.tabtwoview && $.addTopLevelView($.__views.tabtwoview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var music = Alloy.Models.instance("music");
    var addRows = function(data) {
        var rows = [];
        _.each(data, function(item) {
            var row = Ti.UI.createTableViewRow({
                title: item.title,
                id: "musicrow",
                url: item.url
            });
            rows.push(row);
        });
        return rows;
    };
    $.current.addEventListener("focus", function() {
        var kids = $.musictable.children;
        _.each(kids, function(kid) {
            $.musictable.remove(kid);
        });
        music.fetch({
            success: function(_model, _response) {
                $.musictable.setData(addRows(_response));
            },
            error: function(_model, _response) {
                Ti.API.info(JSON.stringify("fetch error " + _response, null, 2));
            }
        });
    });
    $.musictable.addEventListener("click", function() {
        var musicController = Alloy.createController("musicPlayerWindow");
        musicController.openMainWindow($.tabtwoview);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;