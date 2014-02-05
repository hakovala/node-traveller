"use strict";

module.exports = function(selector, obj) {
	if (typeof selector !== 'string')
		throw new TypeError(selector + " must be a string");
	if (!obj || typeof obj !== 'object' || Array.isArray(obj))
		throw new TypeError(obj + " must be an object");

	function findRecursive(selector, obj) {
		if (!selector || selector.length === 0) // if no more selectors, return the current object
			return obj;

		var res = [];
		if (selector[0] === '*') { // if selector is wildcard, check each property
			for (var k in obj) {
				res = res.concat(findRecursive(selector.slice(1), obj[k]));
			}
		} else if (Array.isArray(obj)) { // if object is array, check each value, but don't consume selector
			for (var i in obj) {
				res = res.concat(findRecursive(selector, obj[i]));
			}
		} else if (obj !== null && typeof obj === 'object') { // if it's object check for wanted property name
			if (selector[0] in obj) {
				var r = findRecursive(selector.slice(1), obj[selector[0]]);
				res = res.concat(r);
			}
		} else if (selector.length === 0) { // anything else should be just just a value
			res = obj;
		} // if nothing matched, then the wanted property does not exist

		return res;
	}

	selector = selector.split('.');

	return  findRecursive(selector, obj);
};


