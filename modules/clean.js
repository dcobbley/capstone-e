/**
 * @access public
 * @description Deletes specified file types from external storage
 *   device. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to
 *   the callback, "oncomplete".
 * @param {string} type
 * @param {callback} oncomplete
 * @throws On invalid data type
 */
var clean = function(type, oncomplete) {
  var paths = ffosbr.settings.getBackupDirectoryPaths();

  if (paths[type] === undefined) {
    throw new Error('Invalid data type. Cannot clean type ' + type);
  }

  ffosbr.media.get('sdcard1', paths[type], function(file) {
    if (!file) {
      return;
    }

    var filename = paths[type] + file.name;
    window.ffosbr.media.remove(file.name, function(error) {
      if (error) {
        throw error;
      }
    });
  }, ffosbr.utils.isFunction(oncomplete) ? function(error) {
    oncomplete(error);
  } : undefined);

};

// Defines Ffosbr clean
module.exports = clean;
