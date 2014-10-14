/* jshint node: true */
"use strict";

var React = require("react"),
    Welcome = require("pages/welcome");

var Controller = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    show: function () {
        React.renderComponent(new Welcome(), this.container);
    }
});

module.exports = Controller;