Traveller
===============

Traveller is a simple helper for finding and collecting property values from json object by using simple selectors. 

NOTE
----

This project is not maintained anymore. It's here just for a reference if somebody want's to create something similar. 

Installation
------------
	npm install traveller

Usage
-----

Traveller uses a simple selector format to find specified property from an object. It returns a array of matched property values, if nothing was matched it will return a empty array.

Selector is a string of containing dot separated list of property names. Asterisk (*) can be used to match any property name.

Example of finding from object:

```javascript
var traveller = require('traveller');

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
```

Example of finding from JSON file:

```javascript
var traveller = require('traveller');
var fs = require('fs');

var json = fs.readFileSync('sample.json');
var obj = JSON.parse(json);

var result = traveller('key.value', obj);
```

Todo
----
 - Array selectors. Selector for specified index, range or group.
 - Partial wildcards, needed?
 - Async version, needed?

License
-------

Licensed under MIT

Copyright (c) 2014 Harri Kovalainen
