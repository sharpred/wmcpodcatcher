exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "url": "text",
		    "duration": "text",
		    "summary": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "music",
			idAttribute: 'summary'
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			//from https://gist.github.com/aaronksaunders/5066608
			deleteAll : function() {
 
                var collection = this;
 
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
 
                collection.trigger('sync');
 
            }
		});
		
		return Collection;
	}
}

