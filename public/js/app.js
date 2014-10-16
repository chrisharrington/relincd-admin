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

require.register("components/dropdown", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react");

module.exports = React.createClass({displayName: 'exports',
	render: function () {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++)
			items.push(React.DOM.li({role: "presentation", onClick:  this.props.select.bind(this, this.props.list[i].name) }, React.DOM.a({role: "menuitem", tabindex: "-1"}, this.props.list[i].name)));
		
        return React.DOM.div({className: "dropdown"}, 
            React.DOM.button({className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", 'data-toggle': "dropdown"}, 
                 this.props.placeholder, 
                React.DOM.span({className: "caret"})
            ), 
            React.DOM.ul({className: "dropdown-menu", role: "menu", 'aria-labelledby': "dropdownMenu1"}, 
				items
            )
        )
    }
});
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

require.register("components/newUserModal", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown");

module.exports = React.createClass({displayName: 'exports',
    getInitialState: function() {
        return {
            role: "Role...",
            roles: [],
			company: "Company...",
			companies: [],
			operatingArea: "Operating Area...",
			operatingAreas: []
        }  
    },
	
	setDropdownData: function(key, value) {
		var object = {};
		object[key] = value;
		this.setState(object);
	},
	
    componentWillMount: function() {
        this.setState({
            roles: [{ name: "Supervisor" }, { name: "Operator" }, { name: "Company Admin" }, { name: "Relincd" }],
			companies: [{ name: "Test Company 1" }, { name: "Test Company 2" }, { name: "Test Company 3" }],
			operatingAreas: [{ name: "Operating Area 1" }, { name: "Operating Area 2" }, { name: "Operating Area 3" }]
        });  
    },
    
	render: function () {
        return React.DOM.div({className: "modal fade", id: "new-user-modal", tabindex: "-1", role: "dialog", 'aria-hidden': "true"}, 
          React.DOM.div({className: "modal-dialog"}, 
                React.DOM.div({className: "modal-content"}, 
                    React.DOM.div({className: "modal-header"}, 
                        React.DOM.button({type: "button", className: "close", 'data-dismiss': "modal"}, 
                            React.DOM.span({'aria-hidden': "true"}, "×"), 
                            React.DOM.span({className: "sr-only"}, "Close")
                        ), 
                        React.DOM.h4({className: "modal-title", id: "myModalLabel"}, "New User")
                    ), 
                    React.DOM.div({className: "modal-body container"}, 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col-md-4"}, 
								Dropdown({placeholder: this.state.role, list: this.state.roles, select: this.setDropdownData.bind(this, "role")})
							), 
							React.DOM.div({className: "col-md-4"}, 
								Dropdown({placeholder: this.state.company, list: this.state.companies, select: this.setDropdownData.bind(this, "company")})
							), 
							React.DOM.div({className: "col-md-4"}, 
								Dropdown({placeholder: this.state.operatingArea, list: this.state.operatingAreas, select: this.setDropdownData.bind(this, "operatingArea")})
							)
						)
                    ), 
                    React.DOM.div({className: "modal-footer"}, 
                        React.DOM.button({type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Close"), 
                        React.DOM.button({type: "button", className: "btn btn-primary"}, "Save")
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

var React = require("react"),
    NewUserModal = require("components/newUserModal");

module.exports = React.createClass({displayName: 'exports',
	addUser: function() {
		
	},
	
    render: function(){
        return React.DOM.div({className: "container management-container"}, 
            React.DOM.h1(null, "Management"), 
			React.DOM.div({className: "actions"}, 
                React.DOM.button({type: "button", className: "btn btn-primary", 'data-toggle': "modal", 'data-target': "#new-user-modal"}, "New User")
            ), 
            NewUserModal({onSave:  this.addUser})
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