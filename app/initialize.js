/* jshint node: true */
"use strict";

var app = require("application"),
    Controller = require("controller"),
    Router = require("router"),
    cityDispatcher = require("dispatchers/city");

$(function () {
    app.addInitializer(function initializeRouter() {
        var container = $("#app")[0];

        new Router({controller: new Controller({container: container})});
    });

    app.addInitializer(function(){
        cityDispatcher.dispatch({
            actionType: "fetch"
        });
    });

    app.start();
});
