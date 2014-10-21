/* jshint node: true */
"use strict";

var User = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(User, constants.user, "fixtures/users.json");