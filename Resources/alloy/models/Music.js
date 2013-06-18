exports.definition = {
    config: {
        columns: {
            title: "text",
            url: "text",
            duration: "text",
            summary: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "music",
            idAttribute: "summary"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteAll: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("music", exports.definition, []);

collection = Alloy.C("music", exports.definition, model);

exports.Model = model;

exports.Collection = collection;