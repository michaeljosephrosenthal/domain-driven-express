module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


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
	exports.default = Application;

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _domainMiddlewareGenerator = __webpack_require__(3);

	var _domainMiddlewareGenerator2 = _interopRequireDefault(_domainMiddlewareGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Application(_ref) {
	    var app = _ref.app;
	    var domains = _ref.domains;
	    var _ref$middlewareGenera = _ref.middlewareGenerators;
	    var middlewareGenerators = _ref$middlewareGenera === undefined ? [_domainMiddlewareGenerator2.default] : _ref$middlewareGenera;

	    app = app || new _express2.default();
	    middlewareGenerators.forEach(function (generator) {
	        return Object.values(generator(domains)).forEach(function (middleware) {
	            return app.use(middleware);
	        });
	    });
	    return app;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.domainMiddlewareGenerator = domainMiddlewareGenerator;

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function routeBuilder(router, routes) {
	    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    Object.keys(routes).forEach(function (endpoint) {
	        var _routes$endpoint = routes[endpoint];
	        var methods = _routes$endpoint.methods;
	        var handlers = _routes$endpoint.handlers;

	        methods.forEach(function (method) {
	            var _router$method;

	            (_router$method = router[method]).call.apply(_router$method, [router, prefix + endpoint].concat(_toConsumableArray(handlers)));
	        });
	    });
	    return router;
	};

	function domainRoutes(_ref) {
	    var prefix = _ref.prefix;
	    var routes = _ref.routes;

	    return routeBuilder(_express2.default.Router(), routes, '/' + prefix);
	}
	function domainMiddlewareGenerator(domains) {
	    return Object.values(domains).filter(function (domain) {
	        return domain.routes;
	    }).map(domainRoutes);
	}

/***/ }
/******/ ]);