function onload() {

    Ti.API.debug(this.responseText);

};
function onerror() {

    Ti.API.debug(this.responseText);

};
function getPodcast(sync) {
    var music = Alloy.Models.instance('music');
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET', 'https://dl.dropboxusercontent.com/u/5140218/wmc_rehearsals.xml', true);
    xhr.validatesSecureCertificate = false;
    xhr.enableKeepAlive = false;
    xhr.send();
    xhr.onload = onLoad;
    xhr.onerror = onError;
};

$.syncbutton.addEventListener('click', function() {
    Alloy.Globals.showAlert('you clicked the sync button');
});

function outputState() {
    var sync = $.basicSwitch.value;
    Ti.App.Properties.setBool('sync', sync);
    Ti.API.info('Switch value: ' + sync);
    if (sync) {

        Alloy.Globals.showAlert('syncing will be slower if offline use is enabled');

    }
    getPodcast(sync);
}

