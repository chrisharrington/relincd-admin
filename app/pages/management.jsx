/* jshint node: true */
"use strict";

var React = require("react"),
    UserModal = require("components/userModal"),
    UserList = require("components/userList");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            user: undefined
        };
    },
    
    createUser: function() {
         $("#new-user-modal").modal("show"); 
    },
    
    render: function(){
        return <div className="container management-container">
            <h2>Management</h2>
			<div className="actions">
                <button type="button" className="btn btn-primary" onClick={this.createUser}>New User</button>    
            </div>
            <UserModal onSave={this.addUser} user={this.user} />
            <UserList onEdit={this.createUser} user={this.user} />
        </div>;
    }
});