/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    
    dispatcher = require("dispatcher/dispatcher"),
    emitter = require("dispatcher/emitter"),
	constants = require("constants");

var Model = Backbone.Model.extend({});
var Store = Backbone.Collection.extend({ model: Model });

var store = new Store();

store.token = dispatcher.register(function(payload) {
    switch (payload.type) {
        case constants.user.CREATE_USER:
            _createUser(payload.content);
            break;
    } 
});

function _createUser(user) {
    // persist.then(function() {
    store.add(user);
    emitter.emit(constants.user.USER_CREATED, user);
    // });
}

module.exports = store;