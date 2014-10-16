/* jshint node: true */
"use strict";

var React = require("react"),
    NewUserModal = require("components/newUserModal");

module.exports = React.createClass({
    render: function(){
        return <div className="container management-container">
            <h1>Management</h1>
			<div className="actions">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#new-user-modal">New User</button>    
            </div>
            <NewUserModal />
        </div>;
    }
});