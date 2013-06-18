// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//third party libs
Alloy.Globals._ = require('alloy/underscore');

//custom libs
Alloy.Globals.showAlert = function(message) {
    if (message && ( typeof message === 'string')) {
        Ti.UI.createAlertDialog({
            message : message
        }).show();
    }
};

Alloy.Globals.stripSpecialChars = function(text) {

    if (text && ( typeof text === 'string')) {
        text = text.replace(/[^a-zA-Z0-9\:\-\.\/\_]/g, '');
    }
    //cautious approach - just return it as is
    return text;

};
