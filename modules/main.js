(function() {

  function FFOSBR() {}

  /* Import modules */
  require('./settings')(FFOSBR);
  require('./square')(FFOSBR);

  window.ffosbr = new FFOSBR();
})();
