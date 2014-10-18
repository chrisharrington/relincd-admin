/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    
    emitter = require("dispatcher/emitter"),
	constants = require("constants");

var Model = Backbone.Model.extend({});
var Store = Backbone.Collection.extend({ model: Model });

var store = new Store();

emitter.on(constants.user.CREATE_USER, function(user) {
    // persist.then(function() {
    store.add(user);
    emitter.emit(constants.user.USER_CREATED, user);
    // });
});

module.exports = store;