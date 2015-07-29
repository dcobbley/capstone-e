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

  var paths = ffosbr.settings.getBackupDirectoryPaths();

  ffosbr.media.get('sdcard1', paths[type], function(file) {
    if (!file) {
      return;
    }

    var fn = file.name;
    if (fn.endsWith('~')) {
      fn = fn.substr(0, fn.length - 1);
    }
    var filename = fn.substr(fn.lastIndexOf('/') + 1, fn.length);

    var reader = new FileReader();

    reader.onloadend = function() {
      var fc = this.result;
      var newFile = new File([fc], filename, {
        type: 'image/jpeg'
      });
      newFile.type = 'image/jpeg';

      ffosbr.media.put(type === 'photos' ? 'pictures' : type, newFile, filename, oncomplete);
    };

    reader.readAsArrayBuffer(file);
  });
};

// Defines Ffosbr restore
module.exports = restore;
