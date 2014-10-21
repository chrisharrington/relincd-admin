/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
	select: function(value) {
		this.props.bindTo = value;
		this.forceUpdate();
	},
	
	render: function () {
		var value = this.props.bindTo || (this.props.list.length > 0 ? this.props.list[0].get("name") : undefined);
		if (!value)
			this.props.bindTo = value;
		var items = [];
		for (var i = 0; i < this.props.list.length; i++)
			items.push(<li role="presentation" onClick={this.select.bind(this, this.props.list[i].get("name"))}><a role="menuitem" tabindex="-1">{this.props.list[i].get("name")}</a></li>);
		
        return <div className={"dropdown" + (this.props.error ? " error" : "")}>
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
				{value}
                <i className="fa fa-caret-down"></i>
            </button>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
				{items}
            </ul>
        </div>
    }
});