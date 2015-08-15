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
      'systemSettings': require('./systemSettings'),
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
  window.mime = require('mime');
  window.ffosbr.initialize();
})();
