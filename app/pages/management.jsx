/* jshint node: true */
"use strict";

var React = require("react"),
    User = require("models/user"),
    UserModal = require("components/userModal"),
    UserList = require("components/userList");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            user: undefined
        };
    },
    
    editUser: function(user) {
        this.user.set(user.attributes);
        debugger;
        $("#new-user-modal").modal("show");
        this.forceUpdate();
    },
    
    render: function(){
        this.user = new User();
        
        return <div className="container management-container">
            <h2>Management</h2>
			<div className="actions">
                <button type="button" className="btn btn-primary" onClick={this.createUser}>New User</button>    
            </div>
            <UserModal onSave={this.addUser} user={this.user} />
            <UserList onEdit={this.editUser} />
        </div>;
    }
});