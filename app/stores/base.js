/* jshint node: true */
"use strict";

var Config = require("config"),
	Backbone = require("backbone"),
	
	emitter = require("dispatcher/emitter"),
	constants = require("constants");

module.exports = function(model, constants, url) {
	var _constants = constants;
	var _store = Backbone.Collection.extend({ model: model, url: url });
	
	this.all = function() {
		return new Promise(function(resolve, reject) {
			_store.fetch({
				success: function(collection, response) {
					emitter.emit(_constants.ALL, collection.models);
					resolve(collection.models);
				},
				error: function(a, b, c) {
					debugger;
				}
			});
		});
	};
};