/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
	render: function () {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++)
			items.push(<li role="presentation" onClick={ this.props.select.bind(this, this.props.list[i].name) }><a role="menuitem" tabindex="-1">{this.props.list[i].name}</a></li>);
		
        return <div className={"dropdown" + (this.props.error ? " error" : "")}>
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                { this.props.placeholder }
                <i className="fa fa-caret-down"></i>
            </button>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
				{items}
            </ul>    
        </div>
    }
});