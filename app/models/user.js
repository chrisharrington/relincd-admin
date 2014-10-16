module.exports = Backbone.Model.extend({
	validation: {
		firstName: {
			required: true,
			msg: "The first name is required."
		}
	}
});