/* jshint node: true */
"use strict";

var React = require("react"),
    cityStore = require("stores/city");

module.exports = React.createClass({
    componentWillMount: function () {
        cityStore.on("add remove reset", function () {
            this.forceUpdate();
        }, this);
    },

    componentWillUnmount: function(){
        cityStore.off(null, null, this);
    },

    getName: function(){
        if(cityStore.length === 0){
            return this.getLoading();
        }
        else{
            return <span className="text-success">{ cityStore.at(getRandom(0, cityStore.length)).get("name") }</span>;
        }
    },

    getLoading: function(){
        return <i className="fa fa-spinner fa-spin"></i>;
    },

    render: function () {
        return <h1>Hello, { this.getName() }</h1>;
    }
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}