/**
 * Wrapper module that allows Music to be backed up using standard backup/restore/clean
 * methods.
 */
function Music() {}

/**
 * @access private
 * @description Music initializer.
 */
Music.prototype.initialize = function() {};

/**
 * @access public
 * @description Wrapper that calls ffosbr.backup('music').
 *  Oncomplete callback is invoked upon completion; if an error occurred,
 *  it will be passed as the first parameter to the callback.
 * @param {callback} oncomplete
 */
Music.prototype.backup = function(oncomplete) {
  ffosbr.backup('music', function() {
    oncomplete();
  });
};

/**
 * @access public
 * @description Wrapper for ffosbr.restore('music').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Music.prototype.restore = function(oncomplete) {
  ffosbr.restore('music', function() {
    oncomplete();
  });
};

/**
 * @access public
 * @description Wrapper for ffosbr.clean('music').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Music.prototype.clean = function(oncomplete) {
  ffosbr.clean('music', oncomplete);
};

module.exports = new Music();
