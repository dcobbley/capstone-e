module.exports = function (grunt) {

	// Load task modules
	grunt.loadNpmTasks('grunt-contrib-uglify');  // -- Minifies JS
	grunt.loadNpmTasks('grunt-browserify');  // ------ Injects dependencies

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
		}
	});


	/**
	 * Rather than support a default task, "grunt"
	 * will return a simple list of registered
	 * grunt tasks, similar to a "--help" option.
	*/
	grunt.registerTask('default', function () {
		console.log('\nSorry, no "default" grunt task.');
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
			pushToVersion(grunt.option('sim'));
		}
		else {
			pushToAnything();
		}
	});


	/*---------------------------------------------------------------*/
	/*---------------------- UTILITY FUNCTIONS ----------------------*/
	/*---------------------------------------------------------------*/

	var fs = require('fs');  // ----- Node's Filesystem module
	var path = require('path');  // - Node's filepath module

	// A boat-load of node-firefox libraries
	var Promise = require('es6-promise').Promise;
	var findDevices = require('node-firefox-find-devices');
	var findSimulators = require('node-firefox-find-simulators');
	var startSimulator = require('node-firefox-start-simulator');
	var forwardPorts = require('node-firefox-forward-ports');
	var connect = require('node-firefox-connect');
	var launchApp = require('node-firefox-launch-app');
	var pushApp = require('push-app');

	// Where our app is located
	var appPath = path.join(__dirname, 'testrunner');


	/**
	 * Push the app (unit tests) to a Firefix OS simulator of a
	 * specific version. You will be notified if the specified
	 * runtime does not exist. You can install runtimes via the
	 * Firefox WebIDE.
	 * If the provided version is "any", it will simply connect
	 * to the first simulator it finds.
	*/
	function pushToVersion(version) {

		findSimulators().then(function(simulators) {

			if(simulators.length == 0) {
				grunt.fail.warn('No simulators found');
			}
			else {

				var target = null;

				if (version == 'any') {
					target = simulators[0];
				}
				else {
					for (var i = 0; i < simulators.length; ++i) {
						if (simulators[i].version == version) {
							target = simulators[i];
							break;
						}
					}
				}

				if (target != null) {
					grunt.log.writeln('Launching simulator at version', target.version);
					startSimulator(target).then(function(res) {
						launchTheApp(res);
					}, function(err) {
						grunt.log.error(err);
					});
				}
				else {
					grunt.fail.warn('No simulator at version ' + version + ' found');
				}
			}
		}).catch(function(e) {
			grunt.log.writeln(e);
		});
	}

	/**
	 * Push the app (unit tests) to any Firefox runtime we can find.
	 * This defaults a physical device, then falls back to a simulator.
	 * It will launch the first simulator it finds.
	*/
	function pushToAnything() {

		findDevices().then(forwardPorts).then(function(devices) {

			if (devices.length == 0) {
				grunt.log.writeln('No devices found');
				pushToVersion('any');
			}
			else {
				Promise.all(devices.map(function(device) {
					return connectDevice(device)
						.then(pushTheApp)
						.then(launchTheApp);
				})).then(quit);
			}
		})
		.catch(function(err) {
			grunt.log.error(err);
		});
	}

	/**
	 * Series of helper functions for launching apps
	*/
	function connectDevice(device) {
		return connect(device.ports[0].port);
	}
	function pushTheApp(client) {
		return pushApp(client, appPath);
	}
	function launchTheApp(res) {
		return launchApp({
			manifestURL: res.app.manifestURL,
			client: res.client
		});
	}
	function quit() {
		grunt.log.writeln('ok bye');
		// process.exit(0); // This would probably break grunt
	}


	/**
	 * TODO ?
	 * This mght not be necessary.
	*/
	function createQunitTest(name) {
		grunt.log.writeln('TODO - make ' + name); //rmv
		grunt.log.writeln('Do we really need this?'); //rmv
	}
};
