var music = Alloy.Models.instance('music');

var addRows = function(data) {
    var rows = [];
    _.each(data, function(item) {

        var row = Ti.UI.createTableViewRow({

            title : item.title,
            url : item.url,
            id : 'music'

        });

        rows.push(row);

    });

    return rows;

};

$.current.addEventListener('focus', function() {

    var kids = $.musictable.children;

    _.each(kids, function(kid) {

        $.musictable.remove(kid);

    });

    music.fetch({
        success : function(model, response) {
            $.musictable.setData(addRows(response));
        },
        error : function(model, response) {
            Ti.API.info(JSON.stringify('fetch error ' + response, null, 2));
        }
    });

});

$.musictable.addEventListener('click', function(e) {

    var musicController = Alloy.createController('musicPlayerWindow');
    var args = e.rowData;
    args.tab = $.tabtwoview;
    musicController.openMainWindow(args);

});

