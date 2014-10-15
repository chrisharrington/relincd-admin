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

require.register("components/header", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {
			user: {}
		};
	},
	
	componentWillMount: function() {
		this.setState({
			user: {
				name: "Chris"
			}
		})
	},
	
    render: function () {
        return React.DOM.div({className: "navbar navbar-inverse navbar-fixed-top", role: "navigation"}, 
      		React.DOM.div({className: "container"}, 
        		React.DOM.div({className: "navbar-header"}, 
          			React.DOM.a({className: "navbar-brand logo"}, "Relincd")
        		), 
        		React.DOM.div({className: "collapse navbar-collapse"}, 
					React.DOM.ul({className: "nav navbar-nav"}, 
						React.DOM.li({className: "active"}, React.DOM.a({href: "#"}, "Management")), 
						React.DOM.li(null, React.DOM.a({href: "#about"}, "Company Hierarchies"))
					), 
					React.DOM.div({className: "account-info"}, 
						React.DOM.span(null, "Welcome, ",  this.state.user.name, "!"), 
						React.DOM.br(null), 
						React.DOM.a(null, "Sign Out")
					)
        		)
      		)
		);
    }
});
});

require.register("controller", function(exports, require, module) {
/* jshint node: true */
"use strict";

var React = require("react"),
    Management = require("pages/management");

var Controller = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    management: function () {
        React.renderComponent(new Management(), this.container);
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
	Header = require("components/header"),
    Controller = require("controller"),
    Router = require("router");

$(function () {
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});

		React.renderComponent(new Header(), $("header")[0]);
    });

    app.start();
});

});

require.register("pages/management", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({displayName: 'exports',
    render: function(){
        return React.DOM.div({className: "container management-container"}, 
            React.DOM.h1(null, "Management"), 
			React.DOM.div({className: "actions"})
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
        "": "management"
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


//# sourceMappingURL=app.js.map