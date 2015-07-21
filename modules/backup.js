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

  var paths = window.ffosbr.settings.getBackupDirectoryPaths();

  if (typeof(ffosbr.settings.getPath(type)) === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  }

  window.ffosbr.media.get(type, function(file) {
    if (!file) {
      return;
    }

    var filename = paths[type] + photo.name;
    window.ffosbr.media.put('sdcard1', photo, filename, function() {
      oncomplete();
    });
  });
};

// Defines Ffosbr backup
module.exports = backup;
