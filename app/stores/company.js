/* jshint node: true */
"use strict";

var Company = require("models/company"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(Company, constants.company, "fixtures/companies.json");