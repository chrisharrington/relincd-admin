(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    Router = require("router"),
    Controller = require("controller");

var app = new Backbone.Marionette.Application();

app.on("start", function () {
    Backbone.history.start();
});

module.exports = app;
});

require.register("components/greeting", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    cityStore = require("stores/city");

module.exports = React.createClass({displayName: 'exports',
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
            return React.DOM.span({className: "text-success"},  cityStore.at(getRandom(0, cityStore.length)).get("name") );
        }
    },

    getLoading: function(){
        return React.DOM.i({className: "fa fa-spinner fa-spin"});
    },

    render: function () {
        return React.DOM.h1(null, "Hello, ",  this.getName() );
    }
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
});

;require.register("components/test", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({displayName: 'exports',
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
        return React.DOM.span(null,  this.getTestValue() );
    }
});
});

require.register("controller", function(exports, require, module) {
/* jshint node: true */
"use strict";

var React = require("react"),
    Welcome = require("pages/welcome");

var Controller = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    show: function () {
        React.renderComponent(new Welcome(), this.container);
    }
});

module.exports = Controller;
});

require.register("dispatchers/city", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Dispatcher = require("flux").Dispatcher;

module.exports = new Dispatcher();
});

require.register("initialize", function(exports, require, module) {
/* jshint node: true */
"use strict";

var app = require("application"),
    Controller = require("controller"),
    Router = require("router"),
    cityDispatcher = require("dispatchers/city");

$(function () {
    app.addInitializer(function initializeRouter() {
        var container = $("#app")[0];

        new Router({controller: new Controller({container: container})});
    });

    app.addInitializer(function(){
        cityDispatcher.dispatch({
            actionType: "fetch"
        });
    });

    app.start();
});

});

require.register("pages/welcome", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    Greeting = require("components/greeting"),
    Test = require("components/test"),
    technologies = require("technologies");

module.exports = React.createClass({displayName: 'exports',
    getTechnologies: function(){
        var items = _.map(technologies.get(), function(item){
            return React.DOM.li({key:  item.name}, React.DOM.a({href:  item.href, target:  item.name},  item.name));
        });

        return React.DOM.ul(null, 
            items 
        )
    },

    render: function(){
        return React.DOM.div({className: "container"}, 
            Greeting(null), 
            Test(null), 
            React.DOM.span({className: "lead"}, "For all your Backbone+Flux+React needs."), 
            React.DOM.h3(null, "Technologies"), 
             this.getTechnologies() 
        );
    }
});
});

require.register("router", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Backbone = require("backbone");

module.exports = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
        "": "show"
    }
});
});

require.register("stores/city", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    dispatcher = require("../dispatchers/city");

var Model = Backbone.Model.extend({});

var Store = Backbone.Collection.extend({
    url: "/api/geodata/city_county_links_for_state_of/CA.json",
    model: Model
});

var store = new Store();

store.dispatchToken = dispatcher.register(function dispatchCallback(payload) {
    switch (payload.actionType) {
        case "fetch":
            store.fetch();
    }
});

module.exports = store;
});

require.register("technologies", function(exports, require, module) {
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
});


//# sourceMappingURL=app.js.map