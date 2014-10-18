/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    
	viewEmitter = require("dispatcher/viewEmitter"),
    storeEmitter = require("dispatcher/storeEmitter"),
	constants = require("constants");

var Model = Backbone.Model.extend({});
var Store = Backbone.Collection.extend({ model: Model });

var store = new Store();

viewEmitter.on(constants.USER_CREATE, function(user) {
    // persist.then(function() {
    store.add(user);
    storeEmitter.emit(constants.USER_CREATE, user);
    // });
});

module.exports = store;