/* jshint node: true */
"use strict";

var React = require("react"),
    Greeting = require("components/greeting"),
    technologies = require("technologies");

module.exports = React.createClass({
    getTechnologies: function(){
        var items = _.map(technologies.get(), function(item){
            return <li key={ item.name }><a href={ item.href } target={ item.name }>{ item.name }</a></li>;
        });

        return <ul>
            { items }
        </ul>
    },

    render: function(){
        return <div className="container">
            <Greeting />
            <span className="lead">For all your Backbone+Flux+React needs.</span>
            <h3>Technologies</h3>
            { this.getTechnologies() }
        </div>;
    }
});