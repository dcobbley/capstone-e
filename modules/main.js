(function() {

  var Ffosbr = function() {

    /* Import modules */
    this.utils = require('./utils');
    this.media = require('./media');
    this.backup = require('./backup');
    this.restore = require('./restore');
    this.clean = require('./clean');
    this.contacts = require('./contacts');
    this.messages = require('./messages');
  };

  window.ffosbr = new Ffosbr();
})();
