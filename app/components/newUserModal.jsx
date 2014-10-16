/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            role: "Role...",
            roles: [],
			company: "Company...",
			companies: [],
			operatingArea: "Operating Area...",
			operatingAreas: []
        }  
    },
	
	setDropdownData: function(key, value) {
		var object = {};
		object[key] = value;
		this.setState(object);
	},
	
    componentWillMount: function() {
        this.setState({
            roles: [{ name: "Supervisor" }, { name: "Operator" }, { name: "Company Admin" }, { name: "Relincd" }],
			companies: [{ name: "Test Company 1" }, { name: "Test Company 2" }, { name: "Test Company 3" }],
			operatingAreas: [{ name: "Operating Area 1" }, { name: "Operating Area 2" }, { name: "Operating Area 3" }]
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
                    <div className="modal-body container">
						<div className="row">
							<div className="col-md-4">
								<Dropdown placeholder={this.state.role} list={this.state.roles} select={this.setDropdownData.bind(this, "role")} />
							</div>
							<div className="col-md-4">
								<Dropdown placeholder={this.state.company} list={this.state.companies} select={this.setDropdownData.bind(this, "company")} />
							</div>
							<div className="col-md-4">
								<Dropdown placeholder={this.state.operatingArea} list={this.state.operatingAreas} select={this.setDropdownData.bind(this, "operatingArea")} />
							</div>
						</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>;
    }
});