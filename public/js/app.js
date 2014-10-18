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
require.register("actions/user", function(exports, require, module) {
var constants = require("../constants");

module.exports = {
	create: function(user) {
		return {
			type: constants.USER_CREATE,
			user: user
		};
	}
};
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
	render: function () {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++)
			items.push(React.DOM.li({role: "presentation", onClick:  this.props.select.bind(this, this.props.list[i].name) }, React.DOM.a({role: "menuitem", tabindex: "-1"}, this.props.list[i].name)));
		
        return React.DOM.div({className: "dropdown" + (this.props.error ? " error" : "")}, 
            React.DOM.button({className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", 'data-toggle': "dropdown"}, 
                 this.props.placeholder, 
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

require.register("components/newUserModal", function(exports, require, module) {
/** @jsx React.DOM */
/* jshint node: true */
"use strict";

var React = require("react"),
    Dropdown = require("components/dropdown"),
	User = require("models/user"),
    UserActions = require("actions/user"),
    
	constants = require("constants"),
	viewEmitter = require("dispatcher/viewEmitter"),
    storeEmitter = require("dispatcher/storeEmitter");

module.exports = React.createClass({displayName: 'exports',
    getInitialState: function() {
        return {
            roles: [{ name: "Supervisor" }, { name: "Operator" }, { name: "Company Admin" }, { name: "Relincd" }],
			companies: [{ name: "Test Company 1" }, { name: "Test Company 2" }, { name: "Test Company 3" }],
			operatingAreas: [{ name: "Operating Area 1" }, { name: "Operating Area 2" }, { name: "Operating Area 3" }],
            errorMessage: "",
			loading: false,
            role: "Role...",
			roleError: false,
			company: "Company...",
			companyError: false,
			operatingArea: "Operating Area...",
			operatingAreaError: false,
			firstName: "",
			firstNameError: false,
			lastName: "",
			lastNameError: false,
			phone: "",
			phoneError: false,
			email: "",
			emailError: false,
			password: "",
			passwordError: false,
			confirmedPassword: "",
			confirmedPasswordError: false
        };
    },
	
	componentWillMount: function() {
        var me = this;
        storeEmitter.on(constants.USER_CREATE, function(user) {
            // add user to external list
            $("#new-user-modal").modal("hide");
            me.reset();
        });
	},
    
	reset: function() {
		this.setState(this.getInitialState());	
	},
	
	save: function() {
		var user = _buildUser(this);
		var errors = user.validate();
		_setErrors(errors, this);
		//if (errors.length === 0) {
            var me = this;
            this.setState({ loading: true });
            
            viewEmitter.emit(constants.USER_CREATE, user);
        //}
		
		function _buildUser(context) {
			var initial = context.getInitialState();
			
			return new User({
				role: context.state.role === initial.role ? undefined : context.state.role,
				company: context.state.company === initial.company ? undefined : context.state.company,
				operatingArea: context.state.operatingArea === initial.operatingArea ? undefined : context.state.operatingArea,
				firstName: context.state.firstName,
				lastName: context.state.lastName,
				phone: context.state.phone,
				email: context.state.email,
				password: context.state.password,
				confirmedPassword: context.state.confirmedPassword
			});
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
		var object = {};
		object[key] = value;
		this.setState(object);
	},
	
	setTextData: function(key, event) {
		var object = {};
		object[key] = event.target.value;
		this.setState(object);
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
							React.DOM.div({className: "col col-md-4", 'data-validation-key': "role"}, 
								Dropdown({error: this.state.roleError, placeholder: this.state.role, list: this.state.roles, select: this.setDropdownData.bind(this, "role")})
							), 
							React.DOM.div({className: "col col-md-4 form-group"}, 
								Dropdown({error: this.state.companyError, placeholder: this.state.company, list: this.state.companies, select: this.setDropdownData.bind(this, "company")})
							), 
							React.DOM.div({className: "col col-md-4 form-group"}, 
								Dropdown({error: this.state.operatingAreaError, placeholder: this.state.operatingArea, list: this.state.operatingAreas, select: this.setDropdownData.bind(this, "operatingArea")})
							)
						), 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.firstNameError ? " has-error" : "")}, 
								React.DOM.input({type: "text", className: "form-control", value: this.state.firstName, onChange: this.setTextData.bind(this, "firstName"), placeholder: "First name..."})
							), 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.lastNameError ? " has-error" : "")}, 
								React.DOM.input({type: "text", className: "form-control", value: this.state.lastName, onChange: this.setTextData.bind(this, "lastName"), placeholder: "Last name..."})
							)
						), 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.phoneError ? " has-error" : "")}, 
								React.DOM.input({type: "text", className: "form-control", value: this.state.phone, onChange: this.setTextData.bind(this, "phone"), placeholder: "Phone number..."})
							), 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.emailError ? " has-error" : "")}, 
								React.DOM.input({type: "text", className: "form-control", value: this.state.email, onChange: this.setTextData.bind(this, "email"), placeholder: "Email address..."})
							)
						), 
						React.DOM.div({className: "row"}, 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.passwordError ? " has-error" : "")}, 
								React.DOM.input({type: "password", className: "form-control", value: this.state.password, onChange: this.setTextData.bind(this, "password"), placeholder: "Password..."})
							), 
							React.DOM.div({className: "col col-md-6 form-group" + (this.state.confirmedPasswordError ? " has-error" : "")}, 
								React.DOM.input({type: "password", className: "form-control", value: this.state.confirmedPassword, onChange: this.setTextData.bind(this, "confirmedPassword"), placeholder: "Confirm password..."})
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

require.register("constants", function(exports, require, module) {
module.exports = {
	VIEW_ACTION: "view-action",
	SERVER_ACTION: "server-action",
	
	USER_CREATE: "user-create"
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

require.register("dispatcher/storeEmitter", function(exports, require, module) {
module.exports = new EventEmitter();
});

require.register("dispatcher/viewEmitter", function(exports, require, module) {
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
    Router = require("router");

require("extensions");
require("stores");

$(function () {
    app.addInitializer(function initializeRouter() {
        new Router({controller: new Controller({container: $("#app")[0]})});
		React.renderComponent(new Header(), $("header")[0]);
    });

    app.start();
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

require.register("stores/index", function(exports, require, module) {
["user"].forEach(function(location) {
    require("stores/" + location);  
});
});

require.register("stores/user", function(exports, require, module) {
/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
    
	viewEmitter = require("dispatcher/viewEmitter"),
    storeEmitter = require("dispatcher/storeEmitter"),
	constants = require("constants");

var Model = Backbone.Model.extend({});
var Store = Backbone.Collection.extend({ model: Model });

var store = new Store();

viewEmitter.on(constants.USER_CREATE, function(user) {
    // persist.then(function() {
    store.add(user);
    storeEmitter.emit(constants.USER_CREATE, user);
    // });
});

module.exports = store;
});

require.register("utilities/validation", function(exports, require, module) {
module.exports = {
	required: function(value) {
		return value !== undefined && value !== "";
	},
	
	phone: function(value) {
		value = value.replace(/[\D]/g, "");
		return value.length === 10;
	},
	
	email: function(value) {
		return new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
	}
}
});

;
//# sourceMappingURL=app.js.map