require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.domainRouteMiddlewareGenerator = domainRouteMiddlewareGenerator;
	exports.genericDomainMiddlewareGenerator = genericDomainMiddlewareGenerator;
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function filterDomainsForType(domains, type) {
	    return Object.keys(domains).map(function (k) {
	        return domains[k];
	    }).filter(function (domain) {
	        return Object.keys(domain.get(type)).length;
	    });
	}
	
	function routeBuilder(_ref) {
	    var router = _ref.router;
	    var routes = _ref.routes;
	    var order = _ref.order;
	    var _ref$prefix = _ref.prefix;
	    var prefix = _ref$prefix === undefined ? '' : _ref$prefix;
	
	    var keys = order || Object.keys(routes);
	    keys.forEach(function (endpoint) {
	        var _routes$endpoint = routes[endpoint];
	        var methods = _routes$endpoint.methods;
	        var handlers = _routes$endpoint.handlers;
	
	        methods.forEach(function (method) {
	            router[method].apply(router, [prefix + endpoint].concat(_toConsumableArray(handlers)));
	        });
	    });
	    return router;
	};
	
	function domainRoutes(_ref2) {
	    var prefix = _ref2.prefix;
	    var routes = _ref2.routes;
	    var order = _ref2.order;
	
	    return routeBuilder({ router: _express2.default.Router(), routes: routes, order: order, prefix: '/' + prefix });
	}
	
	function genericMiddlewareFlattener(domains) {
	    return filterDomainsForType(domains, 'middleware').reduce(function (list, domain) {
	        return [].concat(_toConsumableArray(list), _toConsumableArray(domain.get('middleware')));
	    }, []).filter(function (middleware) {
	        return typeof middleware == 'function';
	    });
	}
	
	function domainRouteMiddlewareGenerator(domains) {
	    return filterDomainsForType(domains, 'routes').map(domainRoutes);
	}
	
	function genericDomainMiddlewareGenerator(domains) {
	    return genericMiddlewareFlattener(domains);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var server = ( true ? __webpack_require__(4) : require('./representation')).default;
	exports.default = server;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduck = __webpack_require__(5);
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(6);
	
	var _domainMiddlewareGenerator = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _strictduckDomainDrivenFullstack.server.implement({
	    name: 'DomainDrivenExpress',
	    constructor: function constructor(_ref) {
	        var domains = _ref.Domains;
	        var persister = _ref.DomainDrivenStorePersistencePlugin;
	        var _ref$middlewareGenera = _ref.middlewareGenerators;
	        var middlewareGenerators = _ref$middlewareGenera === undefined ? [_domainMiddlewareGenerator.genericDomainMiddlewareGenerator, _domainMiddlewareGenerator.domainRouteMiddlewareGenerator] : _ref$middlewareGenera;
	        var _ref$server = _ref.server;
	        var server = _ref$server === undefined ? (0, _express2.default)() : _ref$server;
	        var container = _ref.container;
	
	        if (!(persister instanceof Error)) {
	            persister.provide(domains);
	            domains = persister.provideInjectionForDomainRouteHandlers(domains);
	        }
	
	        server._domains = server._domains || {};
	        server.generateMiddleware = function (domains) {
	            var _this = this;
	
	            middlewareGenerators.forEach(function (generator) {
	                return generator(domains).forEach(function (middleware) {
	                    return _this.use(middleware);
	                });
	            });
	            Object.assign(this._domains, domains);
	        };
	        server.generateMiddleware.bind(server)(domains);
	        return [server];
	    },
	    provider: function provider(_ref2) {
	        var _ref2$port = _ref2.port;
	        var port = _ref2$port === undefined ? 3000 : _ref2$port;
	        var client = _ref2.DomainDrivenClient;
	
	        if (client) {
	            this.generateMiddleware.bind(this)({ '': client.provide() });
	        }
	
	        var app = (0, _express2.default)();
	        app.use(this);
	        app.listen(port, function (error) {
	            if (error) {
	                console.error(error);
	            } else {
	                console.info('==> Listening on port ' + port + '. Open up http://localhost:' + port + '/ in your browser.');
	            }
	        });
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("strictduck");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("strictduck-domain-driven-fullstack");

/***/ }
/******/ ]);
//# sourceMappingURL=node_development.js.map