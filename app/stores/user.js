/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
	UserActions = require("actions/user"),
	emitter = require("../dispatcher/emitter"),
    dispatcher = require("../dispatchers/user"),
	constants = rquire("../constants";

var Model = Backbone.Model.extend({});

var Store = Backbone.Collection.extend({
    model: Model
});

var store = new Store();

dispatcher.register(function(payload) {
	if (payload.source === constants.VIEW_ACTION && payload.action.type === constants.USER_CREATE)
		store.add(payload.action.user);
	else if (payload.source === constants.SERVER_ACTION && payload.action.type === constants.USER_CREATE)
		
});

store.on("add", function(user) {
	// persist user to server here
	
	dispatcher.handleServerAction(UserActions.userCreated(user));
});

module.exports = store;