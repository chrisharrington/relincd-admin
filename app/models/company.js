var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = [];
		if (!validation.require(attrs.name))
			errors.push({ key: "name", message: "The name is required." });
        return errors;
	}
});