var constants = require("../constants");

module.exports = {
	create: function(user) {
		return {
			type: constants.USER_CREATE,
			user: user
		};
	}
};