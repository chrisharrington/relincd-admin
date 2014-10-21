var actions = {}, location = "actions/";
["role", "user", "company", "operatingArea"].forEach(function(action) {
	actions[action] = require(location + action);
});
module.exports = actions;