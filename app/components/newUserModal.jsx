/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
	render: function () {
        return <div className="custom-modal new-user-modal">
            <div className="content">
                <h2>New User</h2>
                <select>
                    <option>Role...</option>    
                </select>
                <select>
                    <option>Company...</option>    
                </select>
                <select>
                    <option>Operating Area...</option>    
                </select>
            </div>
            <div className="overlay"></div>
        </div>;
    }
});