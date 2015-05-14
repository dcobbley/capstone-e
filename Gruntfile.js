module.exports = function (grunt) {

	// Load task modules
	grunt.loadNpmTasks('grunt-contrib-uglify');  // -- Minifies JS
	grunt.loadNpmTasks('grunt-browserify');  // ------ Injects dependencies
  grunt.loadNpmTasks('grunt-execute'); // Run node tasks

	// Configure tasks
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/* Provides CommonJS dependency functionality */
		browserify: {
			options: {
				// Generates inline source maps
				browserifyOptions: { debug: true }
			},
			js: {
				src: ['modules/*.js'],
				dest: 'ourlib.js'
			}
		},

		/* Compresses javascript */
		uglify: {
			js: {
				src: 'ourlib.js',
				dest: 'ourlib.min.js'
			}
		},

    execute: {
      target: {
        src: 'node-firefox-scripts/launch-firefoxos.js'
      }
    }
	});


	grunt.registerTask('default', function () {
    console.log('No opitions specified defaulting to push to any device then simulator');
    grunt.task.run(['execute']);
	});


  grunt.registerTask('help', function () {
    console.log('Registered tasks are:\n');
    console.log('grunt build -- Create distributable from modules/main.');
    console.log('grunt test -- Deploy and run all tests. Will check for device, then simulator.');
    console.log('  opt: sim [version] -- Try to connect to a specific simulator.');
    console.log('  opt: create -- Create new unit test.');
  });


	/**
	 * Fetch and inject dependencies of all source files,
	 * and create source maps for improved debugging.
	 * Also create a minified version of the library.
	 * This causes the loss of source map debugging.
	*/
	grunt.registerTask('build', function () {
		grunt.task.run([
			'browserify',
			'uglify'
		]);
	});


	/**
	 * Deploys Qunit tests to device, and provides boiler-plate
	 * code for new Qunit test modules.
	 * @param [ default ] Deploy and run all tests under "./test/"
	 * @param --creat Create a new test using questionaire responses.
	*/
	grunt.registerTask('test', function () {

		if (grunt.option('create')) {
			createQunitTest(grunt.option('create'));
		}
		else if (grunt.option('sim')) {
      var simVersion = grunt.option('sim').toFixed(1);
      grunt.config.set('execute.options.args', ['pushToVersion', simVersion]);
      grunt.task.run(['execute']);
		}
		else {
      grunt.config.set('execute.options.args', ['pushToAnything']);
      grunt.task.run(['execute']);
		}
	});

  /**
   * TODO ?
   * This mght not be necessary.
  */
  function createQunitTest(name) {
    grunt.log.writeln('TODO - make ' + name); //rmv
    grunt.log.writeln('Do we really need this?'); //rmv
  }
};
