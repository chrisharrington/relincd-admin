/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown"),
	User = require("models/user"),
    UserActions = require("actions/user"),
    
	constants = require("constants"),
    dispatcher = require("dispatcher/dispatcher"),
	emitter = require("dispatcher/emitter");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            roles: [],
			companies: [],
			operatingAreas: [],
            errorMessage: "",
			loading: false,
			roleError: false,
			companyError: false,
			operatingAreaError: false,
			firstNameError: false,
			lastNameError: false,
			phoneError: false,
			emailError: false,
			passwordError: false,
			confirmedPasswordError: false
        };
    },
	
	componentWillMount: function() {
        var me = this;
        emitter.on(constants.user.USER_CREATED, function(user) { $("#new-user-modal").modal("hide"); });
		emitter.on(constants.role.ALL, function(roles) { me.setState({ roles: roles }); });
		emitter.on(constants.company.ALL, function(companies) { me.setState({ companies: companies }); });
		emitter.on(constants.operatingArea.ALL, function(operatingAreas) { me.setState({ operatingAreas: operatingAreas }); });
		$("#user-modal").on("shown", function() { me.user = _.clone(me.props.user); });
	},
    
	reset: function() {
		//this.props.user = this.user;
	},
	
	save: function() {
		var user = this.props.user;
		var errors = user.validate();
		_setErrors(errors, this);
		if (errors.length === 0) {
            var me = this;
            this.setState({ loading: true });
            dispatcher.dispatch(UserActions.create(user));
        }
		
		function _setErrors(errors, context) {
            var newState = {}, keyed = errors.dict("key"), count = 0, message;
			for (var name in context.state)
				if (name.endsWith("Error")) {
					var error = keyed[name.replace("Error", "")];
					newState[name] = error !== undefined;
					if (error !== undefined) {
						if (count === 0)
							message = error.message;
						count++;
					}
				}
			newState.errorMessage = count === 0 ? "" : count === 1 ? message : "Please fix the fields outlined in red.";
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
		this.props.user.set(key, value);
	
	},
	
	setTextData: function(key, event) {
		var object = {};
		object[key] = event.target.value;
		this.setState(object);
	},
	
	render: function () {
        return <div className="modal fade" id="user-modal" tabindex="-1" role="dialog"aria-hidden="true">
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
							<div className="col-md-4">
								<label>Role</label>
							</div>
							<div className="col-md-8">
								<Dropdown error={this.state.roleError} list={this.state.roles} bindTo={this.props.user.role} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-4">
								<label>Company</label>
							</div>
							<div className="col-md-8">
								
							</div>
						</div>
						<div className="row">
							<div className="col-md-4">
								<label>Operating Area</label>
							</div>
							<div className="col-md-8">
								
							</div>
						</div>
						<div className={"row" + (this.state.firstNameError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>First Name</label>
							</div>
							<div className="col-md-8">
								<input type="text" className="form-control" value={this.props.user.get("firstName")} onChange={this.setTextData.bind(this, "firstName")} />
							</div>
						</div>
						<div className={"row" + (this.state.lastNameError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>Last Name</label>
							</div>
							<div className="col-md-8">
								<input type="text" className="form-control" value={this.props.user.get("lastName")} onChange={this.setTextData.bind(this, "lastName")} />
							</div>
						</div>
						<div className={"row" + (this.state.emailError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>Email Address</label>
							</div>
							<div className="col-md-8">
								<input type="text" className="form-control" value={this.props.user.get("email")} onChange={this.setTextData.bind(this, "email")} />
							</div>
						</div>
						<div className={"row" + (this.state.phoneError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>Phone Number</label>
							</div>
							<div className="col-md-8">
								<input type="text" className="form-control" value={this.props.user.get("phone")} onChange={this.setTextData.bind(this, "phone")} />
							</div>
						</div>
						<div className={"row" + (this.state.passwordError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>Password</label>
							</div>
							<div className="col-md-8">
								<input type="password" className="form-control" value={this.props.user.get("password")} onChange={this.setTextData.bind(this, "password")} />
							</div>
						</div>
						<div className={"row" + (this.state.confirmedPasswordError ? " has-error" : "")}>
							<div className="col-md-4">
								<label>Confirmed Password</label>
							</div>
							<div className="col-md-8">
								<input type="password" className="form-control" value={this.props.user.get("confirmedPassword")} onChange={this.setTextData.bind(this, "confirmedPassword")} />
							</div>
						</div>
                    </div>
                    <div className="modal-footer">
						<div className="row">
							<div className="col col-md-6">
								<span className={"error-message" + (this.state.errorMessage === "" ? "" : " show")}>{this.state.errorMessage}</span>
							</div>
							<div className="col col-md-6">
								<button type="button" className="btn btn-default" disabled={this.state.loading} data-dismiss="modal" onClick={this.reset}>Close</button>
								<button type="button" className="btn btn-primary" disabled={this.state.loading} onClick={this.save}>Save</button>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>;
    }
});