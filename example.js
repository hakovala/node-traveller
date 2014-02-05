"use strict";

var traveller = require('./');

var obj = {
	name: 'Hello World!',
	data: {
		key: 42,
		value: 'something'
	},
	extras: [
		{
			name: 'first'
		},
		{
			name: 'second'
		},
		{
			name: 'third',
			item: 42
		}
	],
	this: {
		is: {
			deep: {
				value: true
			}
		}
	}
};

var result = traveller('name', obj);
console.dir(result); // prints [ 'Hello World!' ]

result = traveller('data.key', obj);
console.dir(result); // prints [ 42 ]

result = traveller('data.*', obj);
console.dir(result); // prints [ 42, 'something' ]

result = traveller('extras.name', obj);
console.dir(result); // prints [ 'first', 'second', 'third' ]

result = traveller('this.*.*.value', obj);
console.dir(result); // prints [ true ]
