(function() {

  var Ffosbr = function() {

    /* Import modules */
    this._modules = {
      'utils': require('./utils'),
      'media': require('./media'),
      'settings': require('./settings'),
      'history': require('./history'),
      'messages': require('./messages'),
      'contacts': require('./contacts'),
      'photos': require('./photos'),
      'videos': require('./videos'),
      'music': require('./music')
    };

    /* Import classes */
    this.Storage = require('./storage');

    /* Import methods */
    this.backup = require('./backup');
    this.restore = require('./restore');
    this.clean = require('./clean');
  };

  Ffosbr.prototype.initialize = function() {
    for (var module in this._modules) {
      // Expose module to public scope
      this[module] = this._modules[module];
      // Invoke module constructor
      this[module].initialize();
    }
  };

  window.ffosbr = new Ffosbr();
  window.ffosbr.initialize();

  // REMOVE - testing purposes only
  window.backup = function() {
    ffosbr.backup(function(type) {
      // on success
      console.log('success ' + type);
    }, function(type, error) {
      // on error
      console.log('error ' + type + ': ' + error.message);
    }, function(type, error) {
      // on complete
      console.log('backup complete!');
    });
  };

  // REMOVE - testing purposes only
  window.restore = function() {
    ffosbr.restore(function(type) {
      // on success
      console.log('success ' + type);
    }, function(type, error) {
      // on error
      console.log('error ' + type + ': ' + error.message);
    }, function(type, error) {
      // on complete
      error = error ? error : {};
      console.log('restore complete!');
    });
  };

  // REMOVE - testing purposes only
  window.clean = function() {
    ffosbr.clean(function(type) {
      // on success
      console.log('success ' + type);
    }, function(type, error) {
      // on error
      console.log('error ' + type + ': ' + error.message);
    }, function(type, error) {
      // on complete
      error = error ? error : {};
      console.log('clean complete!');
    });
  };

  // REMOVE - testing purposes only
  window.put = function() {
    var found = false;
    var file = new File(['ass'], 'assfile.txt');
    var directory = 'test/files/';
    ffosbr.media.put('sdcard1', file, directory, function(error) {
      if (!error) {
        console.log('put successful');
      } else {
        ffosbr.media.external.sdcard.fileExists(directory + file.name, function(exists) {
          if (exists) {
            console.log('file found');
            ffosbr.media.remove(directory + file.name, function(error) {
              if (!error) {
                put();
              } else {
                console.error(error);
              }
            });
          } else {
            console.log('file not found');
          }
        });
      }
    });
  };

})();
