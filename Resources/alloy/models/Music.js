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
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("music", exports.definition, []);

collection = Alloy.C("music", exports.definition, model);

exports.Model = model;

exports.Collection = collection;