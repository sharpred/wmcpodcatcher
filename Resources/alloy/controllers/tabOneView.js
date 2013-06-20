function Controller() {
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
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId3"
    });
    $.__views.main.add($.__views.__alloyId3);
    $.__views.syncbutton = Ti.UI.createButton({
        width: 200,
        height: 50,
        font: {
            fontSize: 18
        },
        top: 25,
        borderRadius: 16,
        borderWidth: 1,
        color: "black",
        title: "Sync",
        id: "syncbutton"
    });
    $.__views.__alloyId3.add($.__views.syncbutton);
    $.__views.taboneview = Ti.UI.createTab({
        font: {
            fontSize: 18
        },
        window: $.__views.main,
        id: "taboneview",
        title: "Settings"
    });
    $.__views.taboneview && $.addTopLevelView($.__views.taboneview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sync;
    var music = Alloy.Models.instance("music");
    var onload = function() {
        var items, XMLTools = require("XMLTools");
        try {
            var xmltext = this.responseXML;
            var xml = new XMLTools(xmltext);
            if (xml) {
                var items = xml.toObject().channel.item;
                _.each(items, function(item) {
                    var obj = {};
                    obj.title = Alloy.Globals.stripSpecialChars(item.title);
                    obj.url = Alloy.Globals.stripSpecialChars(item.enclosure.url);
                    obj.duration = Alloy.Globals.stripSpecialChars(item["itunes:duration"]);
                    obj.summary = Alloy.Globals.stripSpecialChars(item["itunes:summary"]);
                    Ti.API.debug("wrote XML file " + JSON.stringify(obj));
                    music.save(obj);
                });
            }
        } catch (ex) {
            Ti.API.debug("onload error with: " + this.responseText);
        }
    };
    var onerror = function() {
        Ti.API.debug("onerror error with: " + this.responseText);
    };
    var getPodcast = function() {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET", "https://dl.dropboxusercontent.com/u/5140218/wmc_rehearsals.xml", true);
        xhr.onload = onload;
        xhr.onerror = onerror;
        xhr.cache = false;
        xhr.send();
        Ti.API.debug("sent request for podcast");
    };
    var outputState = function() {
        sync = $.basicSwitch.value;
        Ti.App.Properties.setBool("sync", sync);
        Ti.API.info("Switch value: " + sync);
        sync && Alloy.Globals.showAlert("syncing will be slower if offline use is enabled");
    };
    $.syncbutton.addEventListener("click", function() {
        Alloy.Globals.showAlert("you clicked the sync button");
        Alloy.Collections.instance("music");
        Alloy.Collections.music.deleteAll();
        getPodcast(sync);
    });
    __defers["$.__views.basicSwitch!change!outputState"] && $.__views.basicSwitch.addEventListener("change", outputState);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;