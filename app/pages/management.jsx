/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
    render: function(){
        return <div className="container management-container">
            <h1>Management</h1>
			<div className="actions"></div>
        </div>;
    }
});