/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			user: {}
		};
	},
	
	componentWillMount: function() {
		this.setState({
			user: {
				name: "Chris"
			}
		})
	},
	
    render: function () {
        return <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      		<div className="container">
        		<div className="navbar-header">
          			<a className="navbar-brand logo">Relincd</a>
        		</div>
        		<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li className="active"><a href="#">Management</a></li>
						<li><a href="#about">Company Hierarchies</a></li>
					</ul>
					<div className="account-info">
						<span>Welcome, { this.state.user.name }!</span>
						<br />
						<a>Sign Out</a>
					</div>
        		</div>
      		</div>
		</div>;
    }
});