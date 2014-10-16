/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    dispatcher = require("../dispatchers/user");

var Model = Backbone.Model.extend({});

var Store = Backbone.Collection.extend({
    url: "/api/geodata/city_county_links_for_state_of/CA.json",
    model: Model
});

var store = new Store();

store.dispatchToken = dispatcher.register(function dispatchCallback(payload) {
    switch (payload.actionType) {
        case "fetch":
            store.fetch();
    }
});

module.exports = store;