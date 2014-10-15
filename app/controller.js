/* jshint node: true */
"use strict";

var React = require("react"),
    Management = require("pages/management");

var Controller = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    management: function () {
        React.renderComponent(new Management(), this.container);
    }
});

module.exports = Controller;