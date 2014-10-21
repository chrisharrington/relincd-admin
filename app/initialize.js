/* jshint node: true */
"use strict";

var app = require("application"),
	Header = require("components/header"),
    Controller = require("controller"),
    Router = require("router"),
	Actions = require("actions"),
	
	constants = require("constants"),
	dispatcher = require("dispatcher/dispatcher"),
	stores = require("stores");

require("extensions");
require("stores");

$(function () {
	app.data = {};
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});
		React.renderComponent(new Header(), $("header")[0]);
		
		dispatcher.dispatch(Actions["role"].all());
		dispatcher.dispatch(Actions["company"].all());
		dispatcher.dispatch(Actions["operatingArea"].all());
		dispatcher.dispatch(Actions["user"].all());
    });

    app.start();
});
