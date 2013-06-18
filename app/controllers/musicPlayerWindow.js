var url;
exports.openMainWindow = function(args) {
    var tab = args.tab;
    $.musicwindow.title = args.title;
    url = args.url;
    tab.open($.musicwindow);
};

$.musicwindow.addEventListener('focus', function() {

    if (!url) {
        $.startbutton.enabled = false;
        $.pausebutton.enabled = false;
        $.stopbutton.enabled = false;
        $.songtitle.text = '';
    } else {

        $.startbutton.enabled = true;
        $.pausebutton.enabled = true;
        $.stopbutton.enabled = true;
        $.songtitle.text = url;
    };

});
