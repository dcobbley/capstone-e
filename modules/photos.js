/**
 * Wrapper module that allows Photos to be backed up using standard backup/restore/clean
 * methods.
 */
function Photos() {}

/**
 * @access private
 * @description Photos initializer.
 */
Photos.prototype.initialize = function() {};

/**
 * @access public
 * @description Wrapper that calls ffosbr.backup('photos').
 *  Oncomplete callback is invoked upon completion; if an error occurred,
 *  it will be passed as the first parameter to the callback.
 * @param {callback} oncomplete
 */
Photos.prototype.backup = function(oncomplete) {
  ffosbr.backup('photos', function() {
    oncomplete();
  });
};

/**
 * @access public
 * @description Wrapper for ffosbr.restore('photos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Photos.prototype.restore = function(oncomplete) {
  ffosbr.restore('photos', function() {
    oncomplete();
  });
};

/**
 * @access public
 * @description Wrapper for ffosbr.clean('photos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Photos.prototype.clean = function(oncomplete) {
  ffosbr.clean('photos', oncomplete);
};

module.exports = new Photos();
