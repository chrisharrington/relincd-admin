/* jshint node: true */
"use strict";

var Role = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(Role, constants.role, "fixtures/roles.json");