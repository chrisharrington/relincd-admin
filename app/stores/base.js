/* jshint node: true */
"use strict";

var Config = require("config"),
	Backbone = require("backbone"),
	
	emitter = require("dispatcher/emitter"),
	dispatcher = require("dispatcher/dispatcher"),
	constants = require("constants");

module.exports = function(model, constants, url) {
	var Collection = Backbone.Collection.extend({ model: model, url: url });
	var constants = constants, me = this, collection = new Collection;
	
	this.all = function() {
		return new Promise(function(resolve, reject) {
			collection.fetch({
				success: function(result, response) {
					var models = result.models;
					resolve(models);
					emitter.emit(constants.ALL, models);
				}
			});
		});
	};
	
	dispatcher.register(function(payload) {
		switch (payload.type) {
			case constants.ALL:
				me.all();
				break;
		}
	});
};