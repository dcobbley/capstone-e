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
 * @description Wrapper that calls ffosbr.media.backup('music').
 *  Oncomplete callback is invoked upon completion; if an error occurred,
 *  it will be passed as the first parameter to the callback.
 * @param {callback} oncomplete
 */
Music.prototype.backup = function(oncomplete) {
  ffosbr.media.backup('music', oncomplete);
};

/**
 * @access public
 * @description Wrapper for ffosbr.media.restore('music').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Music.prototype.restore = function(oncomplete) {
  ffosbr.media.restore('music', oncomplete);
};

/**
 * @access public
 * @description Wrapper for ffosbr.media.clean('music').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Music.prototype.clean = function(oncomplete) {
  ffosbr.media.clean('music', oncomplete);
};

module.exports = new Music();
