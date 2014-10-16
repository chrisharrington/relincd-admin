/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            role: "",
            roles: []
        }  
    },
    
    setRole: function(role) {
        debugger;
        this.props.role = role;  
    },
    
    componentWillMount: function() {
        this.setState({
            roles: [{ id: 1, name: "Supervisor" }, { name: "Operator" }, { name: "Company Admin" }, { name: "Relincd" }]
        });  
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
                    <div className="modal-body">
                        <Dropdown placeholder="Role..." list={ this.state.roles } select={ this.setRole } />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Create User</button>
                    </div>
                </div>
            </div>
        </div>;
    }
});