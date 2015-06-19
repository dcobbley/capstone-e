(function() {

  var Ffosbr = function() {

    /* Import modules */
    this.utils = require('./utils');
    this.media = require('./media');
    this.backup = require('.backup');
    this.restore = require('.restore');
    this.clean = require('.clean');
  };

  window.ffosbr = new Ffosbr();
})();
