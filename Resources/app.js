var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals._ = require("alloy/underscore");

Alloy.Globals.showAlert = function(message) {
    message && "string" == typeof message && Ti.UI.createAlertDialog({
        message: message
    }).show();
};

Alloy.Globals.stripSpecialChars = function(text) {
    text && "string" == typeof text && (text = text.replace(/[^a-zA-Z0-9\:\-\.\/\_]/g, ""));
    return text;
};

Alloy.createController("index");