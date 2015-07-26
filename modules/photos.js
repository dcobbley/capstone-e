/**
 * Wrapper module that allows Photos to be backed up using standard backup/restore/clean
 * methods.
 */
function Photos() {}

/**
 * @description Photos initializer.
 */
Photos.prototype.initialize = function() {};

/**
 * @description Wrapper that calls ffosbr.backup('pictures').
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
 * @description Wrapper for ffosbr.restore('pictures').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Photos.prototype.restore = function(oncomplete) {
  ffosbr.restore('pictures', function() {
    oncomplete();
  });
};

/**
 * @description Wrapper for ffosbr.clean('pictures').
 *  Oncomplete callback is invoked upon completion.
 * @param {callback} oncomplete
 */
Photos.prototype.clean = function(oncomplete) {
  ffosbr.clean('pictures', oncomplete);
};

module.exports = new Photos();
