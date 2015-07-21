/**
 * @access public
 * @description Deletes specified file types from external storage
 *   device. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to
 *   the callback, "oncomplete".
 * @param {string} type
 * @param {callback} oncomplete
 */
var clean = function(type, oncomplete) {

  var externalSD = null;
  var listFiles = null;
  var paths = window.ffosbr.settings.getBackupDirectoryPaths();

  if (typeof(paths[type]) === undefined) {
    throw new Error('Invalid data type. Cannot clean type ' + type);
  }

  externalSD = window.ffosbr.media.getStorageByName('sdcard').external;

  if (externalSD.ready === true) {
    listFiles = externalSD.store.enumerate(paths[type]);
  }

  listFiles.onsuccess = function(file) {
    if (!file) {
      return;
    }

    var filename = paths[type] + file.name;
    window.ffosbr.media.remove(filename, function(error) {
      if (error) {
        throw error;
      }
    });
  };

  listFiles.onerror = function(event) {
    oncomplete(event.target.error.name);
  };
};

// Defines Ffosbr clean
module.exports = clean;
