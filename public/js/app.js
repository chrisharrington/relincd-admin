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
require.register("actions/base", function(exports, require, module) {
module.exports = function(constants) {
	this.all = function() {
		return {
			type: constants.ALL
		};
	};
	
	this.create = function(content) {
		return {
			type: constants.CREATE,
			content: content
		};
	};
};
});

require.register("actions/company", function(exports, require, module) {
var constants = require("../constants"),
	BaseAction = require("actions/base");

module.exports = new BaseAction(constants.company);
});

require.register("actions/index", function(exports, require, module) {
var actions = {}, location = "actions/";
["role", "user", "company", "operatingArea"].forEach(function(action) {
	actions[action] = require(location + action);
});
module.exports = actions;
});

require.register("actions/operatingArea", function(exports, require, module) {
var BaseAction = require("actions/base"),
	constants = require("constants");

module.exports = new BaseAction(constants.operatingArea);
});

require.register("actions/role", function(exports, require, module) {
var BaseAction = require("actions/base"),
	constants = require("../constants");

module.exports = new BaseAction(constants.role);
});

require.register("actions/user", function(exports, require, module) {
var BaseAction = require("actions/base"),
	constants = require("../constants");

module.exports = new BaseAction(constants.user);
});

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
			items.push(React.DOM.li({role: "presentation", onClick: this.select.bind(this, this.props.list[i].get("name"))}, React.DOM.a({role: "menuitem", tabindex: "-1"}, this.props.list[i].get("name"))));
		
        return React.DOM.div({className: "dropdown" + (this.props.error ? " error" : "")}, 
            React.DOM.button({className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", 'data-toggle': "dropdown"}, 
				value, 
                React.DOM.i({className: "fa fa-caret-down"})
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

require.register("components/userList", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    UserActions = require("actions/user"),
    
    emitter = require("dispatcher/emitter"),
    dispatcher = require("dispatcher/dispatcher"),
    constants = require("constants");

module.exports = React.createClass({displayName: 'exports',
    getInitialState: function() {
        return {
            users: []
        }  
    },
    
    componentWillMount: function() {
        var me = this;
        
        emitter.on(constants.user.ALL, function(users) {
			me.setState({ users: users });
		});
        
        emitter.on(constants.user.USER_CREATED, function(user) {
            var users = me.state.users;
            users.push(user);
            me.setState({ users: users });
        });
        
        dispatcher.dispatch(UserActions.all());
    },
    
	render: function () {
        var me = this;
        var users = this.state.users.map(function(user) {
            return React.DOM.tr(null, 
                React.DOM.td(null, user.attributes.firstName + " " + user.attributes.lastName), 
                React.DOM.td(null, user.attributes.email), 
                React.DOM.td(null, user.attributes.phone), 
                React.DOM.td(null, user.attributes.role), 
                React.DOM.td(null, user.attributes.company), 
                React.DOM.td(null, user.attributes.operatingArea), 
                React.DOM.td({className: "actions"}, 
                    React.DOM.i({className: "fa fa-pencil", 'data-toggle': "modal", 'data-target': "#user-modal", onClick: me.props.onEdit.bind(null, user)}), 
                    React.DOM.i({className: "fa fa-trash"})
                )
            )
        });
        
        return React.DOM.div({className: "user-list"}, 
            React.DOM.table({className: "table table-striped table-bordered"}, 
                React.DOM.thead(null, 
                    React.DOM.th(null, "Name"), 
                    React.DOM.th(null, "Email Addresss"), 
                    React.DOM.th(null, "Phone Number"), 
                    React.DOM.th(null, "Role"), 
                    React.DOM.th(null, "Company"), 
                    React.DOM.th(null, "Operating Area"), 
                    React.DOM.th(null)
                ), 
                React.DOM.tbody(null, 
                    users
                )
            )
        )
    }
});
});

require.register("components/userModal", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown"),
	User = require("models/user"),
    UserActions = require("actions/user"),
    
	constants = require("constants"),
    dispatcher = require("dispatcher/dispatcher"),
	emitter = require("dispatcher/emitter");

module.exports = React.createClass({displayName: 'exports',
    getInitialState: function() {
        return {
            roles: [],
			companies: [],
			operatingAreas: [],
            errorMessage: "",
			loading: false,
			roleError: false,
			companyError: false,
			operatingAreaError: false,
			firstNameError: false,
			lastNameError: false,
			phoneError: false,
			emailError: false,
			passwordError: false,
			confirmedPasswordError: false
        };
    },
	
	componentWillMount: function() {
        var me = this;
        emitter.on(constants.user.USER_CREATED, function(user) { $("#new-user-modal").modal("hide"); });
		emitter.on(constants.role.ALL, function(roles) { me.setState({ roles: roles }); });
		emitter.on(constants.company.ALL, function(companies) { me.setState({ companies: companies }); });
		emitter.on(constants.operatingArea.ALL, function(operatingAreas) { me.setState({ operatingAreas: operatingAreas }); });
		$("#user-modal").on("shown", function() { me.user = _.clone(me.props.user); });
	},
    
	reset: function() {
		//this.props.user = this.user;
	},
	
	save: function() {
		var user = this.props.user;
		var errors = user.validate();
		_setErrors(errors, this);
		if (errors.length === 0) {
            var me = this;
            this.setState({ loading: true });
            dispatcher.dispatch(UserActions.create(user));
        }
		
		function _setErrors(errors, context) {
            var newState = {}, keyed = errors.dict("key"), count = 0, message;
			for (var name in context.state)
				if (name.endsWith("Error")) {
					var error = keyed[name.replace("Error", "")];
					newState[name] = error !== undefined;
					if (error !== undefined) {
						if (count === 0)
							message = error.message;
						count++;
					}
				}
			newState.errorMessage = count === 0 ? "" : count === 1 ? message : "Please fix the fields outlined in red.";
            context.setState(newState);
		}
        
        function _getErrorKeys(errors) {
            var keys = {};
            for (var i = 0; i < errors.length; i++)
                keys[errors[i].key] = errors[i].message;
            return keys;
        }
	},
	
	setDropdownData: function(key, value) {
		this.props.user.set(key, value);
	
	},
	
	setTextData: function(key, event) {
		var object = {};
		object[key] = event.target.value;
		this.setState(object);
	},
	
	render: function () {
        return React.DOM.div({className: "modal fade", id: "user-modal", tabindex: "-1", role: "dialog", 'aria-hidden': "true"}, 
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
								React.DOM.label(null, "Role")
							), 
							React.DOM.div({className: "col-md-8"}, 
								Dropdown({error: this.state.roleError, list: this.state.roles, bindTo: this.props.user.role})
							)
						), 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Company")
							), 
							React.DOM.div({className: "col-md-8"}
								
							)
						), 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Operating Area")
							), 
							React.DOM.div({className: "col-md-8"}
								
							)
						), 
						React.DOM.div({className: "row" + (this.state.firstNameError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "First Name")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "text", className: "form-control", value: this.props.user.get("firstName"), onChange: this.setTextData.bind(this, "firstName")})
							)
						), 
						React.DOM.div({className: "row" + (this.state.lastNameError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Last Name")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "text", className: "form-control", value: this.props.user.get("lastName"), onChange: this.setTextData.bind(this, "lastName")})
							)
						), 
						React.DOM.div({className: "row" + (this.state.emailError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Email Address")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "text", className: "form-control", value: this.props.user.get("email"), onChange: this.setTextData.bind(this, "email")})
							)
						), 
						React.DOM.div({className: "row" + (this.state.phoneError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Phone Number")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "text", className: "form-control", value: this.props.user.get("phone"), onChange: this.setTextData.bind(this, "phone")})
							)
						), 
						React.DOM.div({className: "row" + (this.state.passwordError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Password")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "password", className: "form-control", value: this.props.user.get("password"), onChange: this.setTextData.bind(this, "password")})
							)
						), 
						React.DOM.div({className: "row" + (this.state.confirmedPasswordError ? " has-error" : "")}, 
							React.DOM.div({className: "col-md-4"}, 
								React.DOM.label(null, "Confirmed Password")
							), 
							React.DOM.div({className: "col-md-8"}, 
								React.DOM.input({type: "password", className: "form-control", value: this.props.user.get("confirmedPassword"), onChange: this.setTextData.bind(this, "confirmedPassword")})
							)
						)
                    ), 
                    React.DOM.div({className: "modal-footer"}, 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col col-md-6"}, 
								React.DOM.span({className: "error-message" + (this.state.errorMessage === "" ? "" : " show")}, this.state.errorMessage)
							), 
							React.DOM.div({className: "col col-md-6"}, 
								React.DOM.button({type: "button", className: "btn btn-default", disabled: this.state.loading, 'data-dismiss': "modal", onClick: this.reset}, "Close"), 
								React.DOM.button({type: "button", className: "btn btn-primary", disabled: this.state.loading, onClick: this.save}, "Save")
							)
						)
                    )
                )
            )
        );
    }
});
});

require.register("config", function(exports, require, module) {
module.exports = {
	fixtures: true
};
});

require.register("constants", function(exports, require, module) {
module.exports = {
	VIEW_ACTION: "view-action",
	
    user: {
        ALL: "all-users",
		CREATE: "create-user"
    },
	
	role: {
		ALL: "all-roles",
		CREATE: "create-role",
	},
	
	company: {
		ALL: "all-companies",
		CREATE: "create-company"
	},
	
	operatingArea: {
		ALL: "all-operating-areas",
		CREATE: "create-operating-area"
	}
};
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

require.register("dispatcher/dispatcher", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Dispatcher = require("flux").Dispatcher;

module.exports = new Dispatcher();
});

require.register("dispatcher/emitter", function(exports, require, module) {
module.exports = new EventEmitter();
});

require.register("extensions/array", function(exports, require, module) {
Array.prototype.dict = function(prop) {
    var obj = {};
    for (var i = 0; i < this.length; i++)
        obj[this[i][prop]] = this[i];
    return obj;
};
});

require.register("extensions/index", function(exports, require, module) {
["string", "array"].forEach(function(location) {
    require("extensions/" + location);  
});
});

require.register("extensions/string", function(exports, require, module) {
String.prototype.endsWith = function(value) {
	if (value.length > this.length)
		return false;
	return value.length <= this.length && this.substr(this.length - value.length, value.length) === value;
};
});

require.register("initialize", function(exports, require, module) {
/* jshint node: true */
"use strict";

var app = require("application"),
	Header = require("components/header"),
    Controller = require("controller"),
    Router = require("router"),
	Actions = require("actions"),
	
	constants = require("constants"),
	dispatcher = require("dispatcher/dispatcher"),
	stores = require("stores");

require("extensions");
require("stores");

$(function () {
	app.data = {};
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});
		React.renderComponent(new Header(), $("header")[0]);
		
		dispatcher.dispatch(Actions["role"].all());
		dispatcher.dispatch(Actions["company"].all());
		dispatcher.dispatch(Actions["operatingArea"].all());
		dispatcher.dispatch(Actions["user"].all());
    });

    app.start();
});

});

require.register("models/company", function(exports, require, module) {
var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = [];
		if (!validation.require(attrs.name))
			errors.push({ key: "name", message: "The name is required." });
        return errors;
	}
});
});

require.register("models/operatingArea", function(exports, require, module) {
var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = [];
		if (!validation.require(attrs.name))
			errors.push({ key: "name", message: "The name is required." });
        return errors;
	}
});
});

require.register("models/role", function(exports, require, module) {
var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = [];
		if (!validation.require(attrs.name))
			errors.push({ key: "name", message: "The name is required." });
        return errors;
	}
});
});

require.register("models/user", function(exports, require, module) {
var validation = require("utilities/validation");

module.exports = Backbone.Model.extend({
	validate: function() {
		var attrs = this.attributes, errors = [];
		if (!validation.required(attrs.role))
			errors.push({ key: "role", message: "The role is required." });
		if (!validation.required(attrs.company))
			errors.push({ key: "company", message: "The company is required." });
		if (!validation.required(attrs.operatingArea))
			errors.push({ key: "operatingArea", message: "The operating area is required." });
		if (!validation.required(attrs.firstName))
			errors.push({ key: "firstName", message: "The first name is required." });
		if (!validation.required(attrs.lastName))
			errors.push({ key: "lastName", message: "The last name is required." });
		if (attrs.phone !== "" && !validation.phone(attrs.phone))
			errors.push({ key: "phone", message: "The phone number is invalid." });
		if (!validation.email(attrs.email))
			errors.push({ key: "email", message: "The email address is invalid." });
		if (!validation.required(attrs.password))
			errors.push({ key: "password", message: "The password is required." });
		if (!validation.required(attrs.confirmedPassword))
			errors.push({ key: "confirmedPassword", message: "The confirmed password is required." });
		if (attrs.password !== attrs.confirmedPassword) {
			errors.push({ key: "password", message: "The passwords must match." });
			errors.push({ key: "confirmedPassword", message: "The passwords must match." });
		}
        return errors;
	}
});
});

require.register("pages/management", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    User = require("models/user"),
    UserModal = require("components/userModal"),
    UserList = require("components/userList");

module.exports = React.createClass({displayName: 'exports',
    getInitialState: function() {
        return {
            user: new User()
        };
    },
    
	newUser: function() {
		this.setState({ user: new User(), isEdit: false });	
	},
	
    editUser: function(user) {
		this.setState({ user: user, isEdit: true });
	},
    
    render: function() {
        return React.DOM.div({className: "container management-container"}, 
            React.DOM.h2(null, "Management"), 
			React.DOM.div({className: "actions"}, 
                React.DOM.button({type: "button", className: "btn btn-primary", onClick: this.newUser, 'data-toggle': "modal", 'data-target': "#user-modal"}, "New User")
            ), 
			
            UserModal({onSave: this.addUser, user: this.state.user, isEdit: this.state.isEdit}), 
            UserList({onEdit: this.editUser})
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

require.register("stores/base", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Config = require("config"),
	Backbone = require("backbone"),
	
	emitter = require("dispatcher/emitter"),
	dispatcher = require("dispatcher/dispatcher"),
	constants = require("constants");

module.exports = function(model, constants, url) {
	var Collection = Backbone.Collection.extend({ model: model, url: url });
	var constants = constants, me = this, collection = new Collection;
	
	this.all = function() {
		return new Promise(function(resolve, reject) {
			collection.fetch({
				success: function(result, response) {
					var models = result.models;
					resolve(models);
					emitter.emit(constants.ALL, models);
				}
			});
		});
	};
	
	dispatcher.register(function(payload) {
		switch (payload.type) {
			case constants.ALL:
				me.all();
				break;
		}
	});
};
});

require.register("stores/company", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Company = require("models/company"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(Company, constants.company, "fixtures/companies.json");
});

require.register("stores/index", function(exports, require, module) {
var stores = {};
["user", "company", "operatingArea", "role"].forEach(function(location) {
    stores[location] = require("stores/" + location);  
});
module.exports = stores;
});

require.register("stores/operatingArea", function(exports, require, module) {
/* jshint node: true */
"use strict";

var OperatingArea = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(OperatingArea, constants.operatingArea, "fixtures/operatingAreas.json");
});

require.register("stores/role", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Role = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(Role, constants.role, "fixtures/roles.json");
});

require.register("stores/user", function(exports, require, module) {
/* jshint node: true */
"use strict";

var User = require("models/role"),
	BaseStore = require("stores/base"),
	
	constants = require("constants");

module.exports = new BaseStore(User, constants.user, "fixtures/users.json");
});

require.register("utilities/validation", function(exports, require, module) {
module.exports = {
	required: function(value) {
		return value !== undefined && value !== "";
	},
	
	phone: function(value) {
		if (value)
			value = value.replace(/[\D]/g, "");
		return value === undefined || value.length === 10;
	},
	
	email: function(value) {
		return new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
	}
}
});

;
//# sourceMappingURL=app.js.map