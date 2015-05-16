module.exports = function(grunt) {

  // Load task modules
  grunt.loadNpmTasks('grunt-contrib-uglify'); // -- Minifies JS
  grunt.loadNpmTasks('grunt-browserify'); // ------ Injects dependencies
  grunt.loadNpmTasks('grunt-execute'); // --------- Run node tasks
  grunt.loadNpmTasks('grunt-jscs'); // ------------ JS style guide
  grunt.loadNpmTasks('grunt-contrib-jshint'); // -- Code checker
  grunt.loadNpmTasks('grunt-jsbeautifier'); // ---- Beautify code

  // Configure tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'modules/*.js', 'testrunner/tests/*.js']
    },

    jsbeautifier: {
      files: '<%= jshint.all %>',
      options: {
        js: {
          indentChar: ' ',
          indentSize: 2
        }
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: '<%= jshint.all %>'
    },

    /* Provides CommonJS dependency functionality */
    browserify: {
      options: {
        // Generates inline source maps
        browserifyOptions: {
          debug: true
        }
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


  grunt.registerTask('default', function() {
    console.log('No opitions specified defaulting to push to any device then simulator');
    grunt.task.run([
      'build',
      'execute'
    ]);
  });


  grunt.registerTask('help', function() {
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
  grunt.registerTask('build', function() {
    grunt.task.run([
      'jshint',
      'jsbeautifier',
      'jscs',
      'browserify',
      'uglify'
    ]);
  });


  /**
   * Deploys Qunit tests to device or simulators.
   * [ default ] Deploy and run all tests under "./test/"
   * --sim=VERSION Deploy app to specific runtime.
   */
  grunt.registerTask('test', function() {

    if (grunt.option('sim')) {
      var simVersion = grunt.option('sim').toFixed(1);
      grunt.config.set('execute.options.args', ['pushToVersion', simVersion]);
    } else {
      grunt.config.set('execute.options.args', ['pushToAnything']);
    }

    grunt.task.run([
      'build',
      'execute'
    ]);
  });
};
