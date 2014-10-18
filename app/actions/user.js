var constants = require("../constants");

module.exports = {
    all: function() {
        return {
            type: constants.user.ALL_USERS
        };  
    },
    
	create: function(user) {
		return {
			type: constants.user.CREATE_USER,
			content: user
		};
	}
};