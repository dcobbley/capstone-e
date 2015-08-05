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


  // REMOVE - testing purposes
  window.backup = function() {
    ffosbr.backup(function(type) {
      alert('backup success - ' + type);
    }, function(type, error) {
      alert('backup error - ' + type);
      alert(error ? error : 'no error');
    }, function() {
      alert('backup finished');
    });
  };

  // REMOVE - testing purposes
  window.restore = function() {
    ffosbr.restore(function(type) {
      alert('restore success - ' + type);
    }, function(type, error) {
      alert('restore error - ' + type);
      alert(error ? error : 'no error');
    }, function() {
      alert('restore finished');
    });
  };

  // REMOVE - testing purposes
  window.enumerate = function() {
    var cursor = navigator.getDeviceStorage('videos').enumerate();
    cursor.onsuccess = function() {
      alert(this.result);
      if (!this.result) {
        alert('there aint none');
      }
      if (!this.done) {
        this.continue();
      }
    };
    cursor.onerror = function() {
      console.error(this.error);
    };
  };

})();
