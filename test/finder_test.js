/* jshint unused: false */
"use strict";

require('./asserts');

var finder = require('..');

var TEST_OBJ = {
	"string_key": "hello",
	"object_key": {
		"first_key": "hello first",
		"second_key": 43
	},
	"string_array": [ "hello", "world" ],
	"object_array": [
		{
			"key": "value"
		},
		{
			"key": "value"
		},
		{
			"name": "hello",
			"key": "value"
		}
	],
	"layer": {
		"layer": {
			"layer": {
				"layer": {
					"value": "hello"
				}
			}
		}
	},
	"dummy": {
		"first": {
			"name": "hello",
			"data": "world"
		},
		"second": {
			"name": "jotain",
			"data": "muuta"
		}
	}
};

exports['arguments'] = {
	"no arguments": function(test) {
		test.willThrow(finder, [], 'no arguments');
		test.done();
	},
	"selector not string": function(test) {
		test.willThrow(finder, [null], 'selector is null');
		test.willThrow(finder, [123], 'selector is number');
		test.willThrow(finder, [[]], 'selector is array');
		test.willThrow(finder, [{}], 'selector is object');
		test.done();
	},
	"source not object": function(test) {
		test.willThrow(finder, ['', null], 'source is null');
		test.willThrow(finder, ['', ''], 'source is string');
		test.willThrow(finder, ['', 123], 'source is number');
		test.willThrow(finder, ['', []], 'source is array');
		test.done();
	},
	"empty arguments": function(test) {
		test.willNotThrow(finder, ['', {}], 'should not throw');
		test.done();
	}
};

exports['test selectors'] = {
	"find missing property": function(test) {
		var res = finder('none', TEST_OBJ);

		test.ok(Array.isArray(res), 'should be array');
		test.equal(res.length, 0, 'should be empty');

		test.done();
	},
	"find property": function(test) {
		var res = finder('string_key', TEST_OBJ);

		test.ok(Array.isArray(res), 'should be array');
		test.equal(res.length, 1, 'should have one');
		test.equal(res[0], TEST_OBJ.string_key);

		test.done();
	},

	"find child property": function(test) {
		var res = finder('object_key.first_key', TEST_OBJ);

		test.isArray(res, 'should be array');
		test.equal(res.length, 1, 'should have one');
		test.equal(res[0], TEST_OBJ.object_key.first_key);
		test.done();
	},
	"find child array": function(test) {
		var res = finder('object_array', TEST_OBJ);

		test.equal(res.length, 3, 'should have three');
		for (var i in TEST_OBJ.object_array) {
			test.equal(res[i], TEST_OBJ.object_array[i]);
		}

		test.done();
	},
	"find child array property": function(test) {
		var res = finder('object_array.key', TEST_OBJ);
		
		for (var i in res) {
			test.equal(res[i], 'value');
		}

		test.done();
	},
	"find all": function(test) {
		var res = finder('object_key.*', TEST_OBJ);
		
		test.equal(res[0], TEST_OBJ.object_key['first_key']);
		test.equal(res[1], TEST_OBJ.object_key['second_key']);

		test.done();
	},
	"find deep": function(test) {
		var res = finder('layer.layer.layer.value', TEST_OBJ);

		test.equal(res[0], TEST_OBJ['layer']['layer']['layer']['value']);

		test.done();
	},
	"find with wildcards": function(test) {
		var res = finder('dummy.*.name', TEST_OBJ);

		test.equal(res[0], TEST_OBJ['dummy']['first']['name']);
		test.equal(res[1], TEST_OBJ['dummy']['second']['name']);

		test.done();
	},
	"find too long selector": function(test) {
		var res = finder('dummy.first.name.too.long.selector', TEST_OBJ);

		test.equal(res.length, 0, "should be empty array");

		test.done();
	}
};

function startBlock(done) {
	console.error("----------");
	console.error("TEST START");
	console.error("----------");
	done();
}

function endBlock(done) {
	console.error("----------");
	console.error("TEST END");
	console.error("----------");
	done();
}
