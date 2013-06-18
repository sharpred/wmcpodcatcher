var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals._ = require("alloy/underscore");

Alloy.Globals.showAlert = function(message) {
    message && "string" == typeof message && Ti.UI.createAlertDialog({
        message: message
    }).show();
};

Alloy.createController("index");