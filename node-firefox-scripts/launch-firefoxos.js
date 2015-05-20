
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
var appPath = path.join(__dirname, '../testrunner');


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
      console.warn('No simulators found');
    }
    else {

      var target = null;

      if (version == 'any') {
        target = simulators[simulators.length-1];
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
        console.log('Launching simulator at version', target.version);

        startSimulator({detached: true, version: target.version})
          .then(function(simulator) {
          console.log('Installing App');

          connect(simulator.port)
            .then(pushTheApp)
            .then(launchTheApp)
            .then(quit);
        });
      }
      else {
        console.warn('No simulator at version ' + version + ' found');
      }
    }
  }).catch(function(e) {
    console.error(e);
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
      console.warn('No devices found');
      pushToVersion('any');
    }
    else {
      Promise.all(devices.map(function(device) {
        console.log(device);
        return connectDevice(device)
          .then(pushTheApp)
          .then(launchTheApp);
      })).then(quit);
    }
  })
  .catch(function(err) {
    console.error(err);
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
  process.exit(0);
}

// Main
if (process.argv.length == 2) {
  pushToAnything();
} else if (process.argv[2] == 'pushToAnything') {
  pushToAnything();
} else if (process.argv[2] == 'pushToVersion') {
  if (process.argv[3] === 'true') {
    console.warn('No simulator version specificed, defaulting to 3.0.');
    pushToVersion('3.0')
    return;
  }

  pushToVersion(process.argv[3])
} else {
  console.error("Second command line argument not understood, please use 'pushToAnything' or 'pushToVersion'.");
  quit();
}

