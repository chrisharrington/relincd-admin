var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = {};
		if (!validation.required(attrs.role))
			errors.push({ key: "role", message: "The role is required." });
		if (!validation.required(attrs.company))
			errors.push({ key: "company", message: "The company is required." });
		if (!validation.required(attrs.operatingArea))
			errors.push({ key: "operatingArea", message: "The operating area is required." });
		if (!validation.required(attrs.firstName))
			errors.push({ key: "firstName", message: "The first name is required." });
		if (!validation.required(attrs.lastName))
			errors.push({ key: "lastName", message: "The last name is required." });
		if (!validation.phone(attrs.phone))
			errors.push({ key: "phone", message: "The phone number is invalid." });
		if (!validation.email(attrs.email))
			errors.push({ key: "email", message: "The email address is invalid." });
		if (!validation.required(attrs.password))
			errors.push({ key: "password", message: "The password is required." });
		if (!validation.required(attrs.confirmedPassword))
			errors.push({ key: "confirmedPassword", message: "The confirmed password is required." });
		if (attrs.password !== attrs.confirmedPassword)
			errors.push({ key: ["password", "confirmedPassword"], message: "The passwords must match." });
        return errors.length === 0 ? undefined : errors;
	}
});