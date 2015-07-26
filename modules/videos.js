/**
 * Wrapper module that allows Videos to be backed up using standard backup/restore/clean
 * methods.
 */
function Videos() {}

/**
 * @description Videos initializer.
 */
Videos.prototype.initialize = function() {};

/**
 * @description Wrapper that calls ffosbr.backup('videos').
 *  Oncomplete callback is invoked upon completion; if an error occurred,
 *  it will be passed as the first parameter to the callback.
 * @param {callback} oncomplete
 */
Videos.prototype.backup = function(oncomplete) {
  ffosbr.backup('videos', oncomplete);
};

/**
 * @description Wrapper for ffosbr.restore('videos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Videos.prototype.restore = function(oncomplete) {
  ffosbr.restore('videos', oncomplete);
};

/**
 * @description Wrapper for ffosbr.clean('videos').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Videos.prototype.clean = function(oncomplete) {
  ffosbr.clean('videos', oncomplete);
};

module.exports = new Videos();
