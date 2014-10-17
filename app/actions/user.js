var constants = require("../constants");

module.exports = {
	createUser: function(user) {
		return {
			type: constants.USER_CREATE,
			user: user
		};
	},
	
	userCreated: function(user) {
		return {
			type: constants.USER_CREATE,
			user: user
		};
	}
};