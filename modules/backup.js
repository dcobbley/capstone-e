/**
 * @access public
 * @description Saves specified file type to external storage
 *   device. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to
 *   the callback, "oncomplete".
 * @param {string} type
 * @param {callback} oncomplete
 */
var backup = function(type, oncomplete) {

  var paths = ffosbr.settings.getBackupDirectoryPaths();

  if (typeof paths[type] === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  }

  ffosbr.media.get(type, function(file) {
    if (!file) {
      return;
    }

    var filename = paths[type] + file.name;
    ffosbr.media.put('sdcard1', file, filename, function() {
      // Report progress?
    }, oncomplete);
  });
};

// Defines Ffosbr backup
module.exports = backup;
