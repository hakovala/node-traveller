/* jslint node: true */
"use strict";

var assert = require('nodeunit').assert;

assert.isNull = function(actual, message) {
	assert.ok(actual === null, message);
};

assert.isNotNull = function(actual, message) {
	assert.ok(actual !== null, message);
};

assert.isString = function(actual, message) {
	assert.ok(typeof actual === 'string', message);
};

assert.isNotString = function(actual, message) {
	assert.ok(typeof actual !== 'string', message);
};

assert.isFunction = function(actual, message) {
	assert.ok(typeof actual === 'function', message);
};

assert.isNotFunction = function(actual, message) {
	assert.ok(typeof actual !== 'function', message);
};

assert.isObject = function(actual, message) {
	assert.ok(typeof actual === 'object', message);
};

assert.isNotObject = function(actual, message) {
	assert.ok(typeof actual !== 'object', message);
};

assert.isArray = function(actual, message) {
	assert.ok(Array.isArray(actual), message);
};

assert.isNotArray = function(actual, message) {
	assert.ok(!Array.isArray(actual), message);
};

assert.isUndefined = function(actual, message) {
	assert.ok(typeof actual === 'undefined', message);
};

assert.isNotUndefined = function(actual, message) {
	assert.ok(typeof actual !== 'undefined', message);
};

assert.willThrow = function(method, args, error, message) {
	assert.throws(function() {
		method.apply(null, args);
	}, error, message);
};

assert.willNotThrow = function(method, args, error, message) {
	assert.doesNotThrow(function() {
		method.apply(null, args);
	}, error, message);
};

assert.isTypeOf = function(value, type, message) {
	assert.ok(typeof value === type, message);
};

assert.isNotTypeOf = function(value, type, message) {
	assert.ok(typeof value !== type, message);
};


