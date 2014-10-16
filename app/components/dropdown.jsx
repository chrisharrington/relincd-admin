/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
	render: function () {
        return <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                { this.props.placeholder }
                <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                {this.props.list.map(function(object) {
                    return <li role="presentation" onClick={this.props.select.bind(this, object)}><a role="menuitem" tabindex="-1">{object.name}</a></li>
                })}
            </ul>    
        </div>
    }
});