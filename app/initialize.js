/* jshint node: true */
"use strict";

var app = require("application"),
	Header = require("components/header"),
    Controller = require("controller"),
    Router = require("router"),
	
	constants = require("constants"),
	rolesStore = require("stores/roles"),
	emitter = require("dispatcher/emitter");

require("extensions");
require("stores");

$(function () {
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});
		React.renderComponent(new Header(), $("header")[0]);
		
		rolesStore.all().then(function(roles) {
			debugger;
		});
    });

    app.start();
});
