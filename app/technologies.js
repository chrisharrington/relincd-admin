var technologies = [
    {
        "name": "React",
        "href": "http://facebook.github.io/react"
    },
    {
        "name": "Flux",
        "href": "http://facebook.github.io/flux"
    },
    {
        "name": "jQuery",
        "href": "http://jquery.com"
    },
    {
        "name": "Underscore",
        "href": "http://underscorejs.org"
    },
    {
        "name": "Backbone",
        "href": "http://backbonejs.org"
    },
    {
        "name": "Backbone Marionette",
        "href": "http://marionettejs.com"
    },
    {
        "name": "Moment",
        "href": "http://momentjs.com"
    },
    {
        "name": "Stylus",
        "href": "http://learnboost.github.io/stylus"
    },
    {
        "name": "Bootstrap",
        "href": "http://getbootstrap.com"
    },
    {
        "name": "Font Awesome",
        "href": "http://fortawesome.github.io/Font-Awesome"
    }
];

module.exports = {
    get: function(){
        return JSON.parse(JSON.stringify(technologies));
    }
};