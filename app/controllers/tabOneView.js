var sync;
var music = Alloy.Models.instance('music');

var writeData = function(data) {

    var bodytext = '' + data;
    var file = 'wmc_rehearsals.xml';
    var fullpath = Titanium.Filesystem.applicationDataDirectory + file;
    outstream = Titanium.Filesystem.getFile(fullpath);

    if (outstream.exists()) {
        outstream.deleteFile();
    }

    if (outstream.write(bodytext)) {
        Ti.API.debug('wrote file ' + file);
    } else {
        Ti.API.debug('could not write file ' + file);
    }

};
var onload = function() {

    var items, XMLTools = require("XMLTools");

    try {

        var xmltext = this.responseXML;
        var xml = new XMLTools(xmltext);

        if (xml) {

            //podcast heirarchy is channel > item > items.  Chain these into an items object
            var items = xml.toObject().channel.item;

            _.each(items, function(item) {

                var obj = {};
                obj.title = Alloy.Globals.stripSpecialChars(item.title);
                obj.url = Alloy.Globals.stripSpecialChars(item.enclosure.url);
                obj.duration = Alloy.Globals.stripSpecialChars(item['itunes:duration']);
                obj.summary = Alloy.Globals.stripSpecialChars(item['itunes:summary']);
                Ti.API.debug('wrote XML file ' + JSON.stringify(obj));
                music.save(obj);
            });

        }

    } catch (ex) {

        Ti.API.debug('onload error with: ' + this.responseText);

    }

};
var onerror = function() {

    Ti.API.debug('onerror error with: ' + this.responseText);

};
var getPodcast = function(sync) {

    var xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET', 'https://dl.dropboxusercontent.com/u/5140218/wmc_rehearsals.xml', true);
    xhr.onload = onload;
    xhr.onerror = onerror;
    xhr.cache = false;
    xhr.send();
    Ti.API.debug('sent request for podcast');
};

var outputState = function() {
    sync = $.basicSwitch.value;
    Ti.App.Properties.setBool('sync', sync);
    Ti.API.info('Switch value: ' + sync);
    if (sync) {

        Alloy.Globals.showAlert('syncing will be slower if offline use is enabled');

    }
};

$.syncbutton.addEventListener('click', function() {
    Alloy.Globals.showAlert('you clicked the sync button');
    //nuke the current collection
    music.destroy();
    music.save();
    getPodcast(sync);
});

