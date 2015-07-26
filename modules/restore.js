/**
 * @access public
 * @description Writes files stored in a Ffosbr backup back
 *   to Firefox OS. The contents restored depends on the
 *   backup present. Valid data types are: apps, music, photos,
 *   videos, contacts, and settings.
 *   If an error occurs, restore tries to call the "oncomplete"
 *   handler.
 * @param {string} type
 * @param {callback} oncomplete
 */
var restore = function(type, oncomplete) {

  var externalSD = null;
  var restoreFiles = null;
  var paths = ffosbr.settings.getBackupDirectoryPaths();

  ffosbr.media.get('sdcard1', '/' + paths[type], function(file) {
    if (!file) {
      return;
    }

    var fn = file.name;
    var filename = fn.substr(fn.lastIndexOf('/') + 1, fn.length);

    ffosbr.media.put(type === 'photos' ? 'pictures' : type, file, filename, function(error) {
      if (error) {
        oncomplete(error);
      }
    });
  }, function() {
    oncomplete();
  });
};

// Defines Ffosbr restore
module.exports = restore;
