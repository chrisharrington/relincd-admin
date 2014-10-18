var constants = require("../constants");

module.exports = {
	create: function(user) {
		return {
			type: constants.user.CREATE_USER,
			content: user
		};
	}
};