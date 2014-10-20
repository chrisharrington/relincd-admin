/* jshint node: true */
"use strict";

var React = require("react"),
    User = require("models/user"),
    UserModal = require("components/userModal"),
    UserList = require("components/userList");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            user: new User()
        };
    },
    
	newUser: function() {
		this.setState({ user: new User(), isEdit: false });	
	},
	
    editUser: function(user) {
		this.setState({ user: user, isEdit: true });
	},
    
    render: function() {
        return <div className="container management-container">
            <h2>Management</h2>
			<div className="actions">
                <button type="button" className="btn btn-primary" onClick={this.newUser} data-toggle="modal" data-target="#user-modal">New User</button>    
            </div>
			
            <UserModal onSave={this.addUser} user={this.state.user} isEdit={this.state.isEdit} />
            <UserList onEdit={this.editUser} />
        </div>;
    }
});