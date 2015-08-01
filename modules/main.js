(function() {

  var Ffosbr = function() {

    /* Import modules */
    this.utils = require('./utils');
    this.media = require('./media');
    this.backup = require('./backup');
    this.restore = require('./restore');
    this.clean = require('./clean');
    this.settings = require('./settings');
    this.history = require('./history');
    this.messages = require('./messages');
    this.systemSettings = require('./systemSettings');
  };

  window.ffosbr = new Ffosbr();
})();
