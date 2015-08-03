/**
 * Wrapper module that allows Videos to be backed up using standard backup/restore/clean
 * methods.
 */
function Videos() {}

/**
 * @access private
 * @description Videos initializer.
 */
Videos.prototype.initialize = function() {};

/**
 * @access public
 * @description Wrapper that calls ffosbr.media.backup('videos').
 *  Oncomplete callback is invoked upon completion; if an error occurred,
 *  it will be passed as the first parameter to the callback.
 * @param {callback} oncomplete
 */
Videos.prototype.backup = function(oncomplete) {
  ffosbr.media.backup('videos', oncomplete);
};

/**
 * @access public
 * @description Wrapper for ffosbr.media.restore('videos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Videos.prototype.restore = function(oncomplete) {
  ffosbr.media.restore('videos', oncomplete);
};

/**
 * @access public
 * @description Wrapper for ffosbr.media.clean('videos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Videos.prototype.clean = function(oncomplete) {
  ffosbr.media.clean('videos', oncomplete);
};

module.exports = new Videos();
