/* jshint node: true */
"use strict";

var React = require("react"),
    UserActions = require("actions/user"),
    
    emitter = require("dispatcher/emitter"),
    dispatcher = require("dispatcher/dispatcher"),
    constants = require("constants");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            users: []
        }  
    },
    
    componentWillMount: function() {
        var me = this;
        
        emitter.on(constants.user.ALL_USERS, function(users) {
            me.setState({ users: users });
        });
        
        emitter.on(constants.user.USER_CREATED, function(user) {
            var users = me.state.users;
            users.push(user);
            me.setState({ users: users });
        });
        
        dispatcher.dispatch(UserActions.all());
    },
    
	render: function () {
        var me = this;
        var users = this.state.users.map(function(user) {
            return <tr>
                <td>{user.attributes.firstName + " " + user.attributes.lastName}</td>
                <td>{user.attributes.email}</td>
                <td>{user.attributes.phone}</td>
                <td>{user.attributes.role}</td>
                <td>{user.attributes.company}</td>
                <td>{user.attributes.operatingArea}</td>
                <td className="actions">
                    <i className="fa fa-pencil" onClick={me.props.onEdit.bind(null, user)}></i>
                    <i className="fa fa-trash"></i>
                </td>
            </tr>
        });
        
        return <div className="user-list">
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Name</th>
                    <th>Email Addresss</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Operating Area</th>
                    <th></th>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        </div>
    }
});