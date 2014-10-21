/* jshint node: true */
"use strict";

var OperatingArea = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(OperatingArea, constants.operatingArea, "fixtures/operatingAreas.json");