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

  if (paths[type] === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  }

  ffosbr.media.get(type === 'photos' ? 'pictures' : type, function(file) {
    if (!file) {
      return;
    }

    var fn = file.name;
    fn = fn.substr(fn.lastIndexOf('/') + 1, fn.length);
    var dest = paths[type] + fn;
    ffosbr.media.put('sdcard1', file, dest, function() {
      // Report progress?
    });
  }, function(error) {
    if (ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(error);
    }
  });
};

// Defines Ffosbr backup
module.exports = backup;
