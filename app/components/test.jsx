/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({
    componentWillMount: function() {
        var that = this;
        setInterval(function() {
            that.forceUpdate();  
        }, 500); 
    },
    
    getTestValue: function() {
        return new Date().getTime();  
    },
    
    render: function () {
        return <span>{ this.getTestValue() }</span>;
    }
});