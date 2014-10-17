/* jshint node: true */
"use strict";

var app = require("application"),
	Header = require("components/header"),
    Controller = require("controller"),
    Router = require("router"),
    string = require("extensions/string"),
	array = require("extensions/array");

$(function () {
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});
		React.renderComponent(new Header(), $("header")[0]);
    });

    app.start();
});
