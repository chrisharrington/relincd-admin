/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown"),
	User = require("models/user");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            roles: [{ name: "Supervisor" }, { name: "Operator" }, { name: "Company Admin" }, { name: "Relincd" }],
			companies: [{ name: "Test Company 1" }, { name: "Test Company 2" }, { name: "Test Company 3" }],
			operatingAreas: [{ name: "Operating Area 1" }, { name: "Operating Area 2" }, { name: "Operating Area 3" }],
            errorMessage: "",
			loading: false,
            role: "Role...",
			roleError: false,
			company: "Company...",
			companyError: false,
			operatingArea: "Operating Area...",
			operatingAreaError: false,
			firstName: "",
			firstNameError: false,
			lastName: "",
			lastNameError: false,
			phone: "",
			phoneError: false,
			email: "",
			emailError: false,
			password: "",
			passwordError: false,
			confirmedPassword: "",
			confirmedPasswordError: false
        };
    },
	
	reset: function() {
		this.setState(this.getInitialState());	
	},
	
	save: function() {
		var user = _buildUser(this);
		var errors = user.validate();
		if (errors)
			_setErrors(errors, this);
		else {
            var me = this;
            this.setState({ loading: true });
            
            setTimeout(function() {
                $("#new-user-modal").modal("hide");
                me.reset();
            }, 1000);
        }
		
		function _buildUser(context) {
			var initial = context.getInitialState();
			
			return new User({
				role: context.state.role === initial.role ? undefined : context.state.role,
				company: context.state.company === initial.company ? undefined : context.state.company,
				operatingArea: context.state.operatingArea === initial.operatingArea ? undefined : context.state.operatingArea,
				firstName: undefined,
				lastName: context.state.lastName,
				phone: context.state.phone,
				email: context.state.email,
				password: context.state.password,
				confirmedPassword: context.state.confirmedPassword
			});
		}
		
		function _setErrors(errors, context) {
            var newState = {}, keyed = _getErrorKeys(errors);
			for (var name in context.state)
				if (name.endsWith("Error"))
					newState[name] = false;
			newState[error.key + "Error"] = true;
            newState.errorMessage = error.message;
            context.setState(newState);
		}
        
        function _getErrorKeys(errors) {
            var keys = {};
            for (var i = 0; i < errors.length; i++)
                keys[errors[i].key] = errors[i].message;
            return keys;
        }
	},
	
	setDropdownData: function(key, value) {
		var object = {};
		object[key] = value;
		this.setState(object);
	},
	
	setTextData: function(key, event) {
		var object = {};
		object[key] = event.target.value;
		this.setState(object);
	},
	
	render: function () {
        return <div className="modal fade" id="new-user-modal" tabindex="-1" role="dialog"aria-hidden="true">
          <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title" id="myModalLabel">New User</h4>
                    </div>
                    <div className="modal-body container">
						<div className="row">
							<div className="col col-md-4" data-validation-key="role">
								<Dropdown error={this.state.roleError} placeholder={this.state.role} list={this.state.roles} select={this.setDropdownData.bind(this, "role")} />
							</div>
							<div className="col col-md-4 form-group">
								<Dropdown error={this.state.companyError} placeholder={this.state.company} list={this.state.companies} select={this.setDropdownData.bind(this, "company")} />
							</div>
							<div className="col col-md-4 form-group">
								<Dropdown error={this.state.operatingAreaError} placeholder={this.state.operatingArea} list={this.state.operatingAreas} select={this.setDropdownData.bind(this, "operatingArea")} />
							</div>
						</div>
						<div className="row">
							<div className="col col-md-6 form-group" data-validation-key="firstName">
								<input type="text" className="form-control" value={this.state.firstName} onChange={this.setTextData.bind(this, "firstName")} placeholder="First name..." />
							</div>
							<div className="col col-md-6 form-group">
								<input type="text" className="form-control" value={this.state.lastName} onChange={this.setTextData.bind(this, "lastName")} placeholder="Last name..." />
							</div>
						</div>
						<div className="row">
							<div className="col col-md-6">
								<input type="text" className="form-control" value={this.state.phone} onChange={this.setTextData.bind(this, "phone")} placeholder="Phone number..." />
							</div>
							<div className="col col-md-6">
								<input type="text" className="form-control" value={this.state.email} onChange={this.setTextData.bind(this, "email")} placeholder="Email address..." />
							</div>
						</div>
						<div className="row">
							<div className="col col-md-6">
								<input type="password" className="form-control" value={this.state.password} onChange={this.setTextData.bind(this, "password")} placeholder="Password..." />
							</div>
							<div className="col col-md-6">
								<input type="password" className="form-control" value={this.state.confirmedPassword} onChange={this.setTextData.bind(this, "confirmedPassword")} placeholder="Confirm password..." />
							</div>
						</div>
                    </div>
                    <div className="modal-footer">
                        <span className="error-message">{this.state.errorMessage}</span>
                        <button type="button" className="btn btn-default" disabled={this.state.loading} data-dismiss="modal" onClick={this.reset}>Close</button>
                        <button type="button" className="btn btn-primary" disabled={this.state.loading} onClick={this.save}>Save</button>
                    </div>
                </div>
            </div>
        </div>;
    }
});