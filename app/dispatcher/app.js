/* jshint node: true */
"use strict";

var Dispatcher = require("flux").Dispatcher,
	constants = require("../constants");

var merge = require("react/lib/merge");

var AppDispatcher = merge(Dispatcher.prototype, {
	handleViewAction: function(action) {
		this.dispatch({
      		source: constants.VIEW_ACTION,
      		action: action
    	});
  	},
	
	handleServerAction: function(action) {
		this.dispatch({
			source: constants.SERVER_ACTION,
			action: action
		});
	}
});

module.exports = AppDispatcher;