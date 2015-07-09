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

  // TODO - replace with actual file paths
  // TODO - this should be stored in settings
  var paths = {
    apps: 'backup/apps/',
    music: 'backup/music/',
    photos: 'backup/photos/',
    videos: 'backup/videos/',
    contacts: 'backup/contacts/',
    messages: 'backup/messages/',
    settings: 'backup/settings/'
  };

  if (typeof(paths[type]) === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  } else if (type === 'contacts') {
    return ffosbr.contacts.backup();
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
