/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
    render: function () {
        return <span>{ this.getTestValue() }</span>;
    }
});