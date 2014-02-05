/* jslint node: true */
"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodeunit: {
			all: ['test/*_test.js']
		},
		watch: {
			src: {
				files: ['**/*.js', '!test/**/*_test.js'],
				tasks: ['nodeunit:all']
			},
			test: {
				files: ['test/**/*_test.js'],
				tasks: ['nodeunit:all']
			}
		}
	});

	grunt.option('force', true);

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['nodeunit:all', 'watch']);

	grunt.registerTask('test', function() {
		var tests = Array.prototype.slice.call(arguments, 0).map(function(test) {
			return 'test/' + test + '_test.js';
		});
		if (tests.length > 0) grunt.config('nodeunit.all', tests);
		grunt.task.run('nodeunit');
	});
};
