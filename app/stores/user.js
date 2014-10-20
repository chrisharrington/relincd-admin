/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
	Model = require("models/user"),
    
    dispatcher = require("dispatcher/dispatcher"),
    emitter = require("dispatcher/emitter"),
	constants = require("constants");

var Store = Backbone.Collection.extend({ model: Model });

var store = new Store();

store.token = dispatcher.register(function(payload) {
    switch (payload.type) {
        case constants.user.CREATE_USER:
            _create(payload.content);
            break;
        case constants.user.ALL_USERS:
            _all();
            break;
    } 
});

function _create(user) {
    // persist().then(function() {
    store.add(user);
    emitter.emit(constants.user.USER_CREATED, user);
    // });
}

function _all() {
    // getFromServer().then(function(users) {
        var users = [
            { firstName: "Chris", lastName: "Harrington", email: "chrisharrington99@gmail.com", phone: "4037102038", role: "Relincd", company: "IONO", operatingArea: "the area" },
            { firstName: "Sarah", lastName: "Harrington", email: "chrisharrington99@gmail.com", phone: "4037102038", role: "Relincd", company: "IONO", operatingArea: "the area" },
            { firstName: "Quinn", lastName: "Harrington", email: "chrisharrington99@gmail.com", phone: "4037102038", role: "Relincd", company: "IONO", operatingArea: "the area" },
            { firstName: "Zoe", lastName: "Harrington", email: "chrisharrington99@gmail.com", phone: "4037102038", role: "Relincd", company: "IONO", operatingArea: "the area" },
            { firstName: "Bandito", lastName: "Harrington", email: "chrisharrington99@gmail.com", phone: "4037102038", role: "Relincd", company: "IONO", operatingArea: "the area" }
        ];
        emitter.emit(constants.user.ALL_USERS, users.map(function(user) {
            return new Model(user);
        }));
    //});
}

module.exports = store;