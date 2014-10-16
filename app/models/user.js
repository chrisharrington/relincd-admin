var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes;
		if (!validation.required(attrs.role))
			return { key: "role", message: "The role is required." };
		if (!validation.required(attrs.company))
			return { key: "company", message: "The company is required." };
		if (!validation.required(attrs.operatingArea))
			return { key: "operatingArea", message: "The operating area is required." };
		if (!validation.required(attrs.firstName))
			return { key: "firstName", message: "The first name is required." };
		if (!validation.required(attrs.lastName))
			return { key: "lastName", message: "The last name is required." };
		if (!validation.phone(attrs.phone))
			return { key: "phone", message: "The phone number is invalid." };
		if (!validation.email(attrs.email))
			return { key: "email", message: "The email address is invalid." };
		if (!validation.required(attrs.password))
			return { key: "password", message: "The password is required." };
		if (!validation.required(attrs.confirmedPassword))
			return { key: "confirmedPassword", message: "The confirmed password is required." };
		if (attrs.password !== attrs.confirmedPassword)
			return { key: ["password", "confirmedPassword"], message: "The passwords must match." };
	}
});