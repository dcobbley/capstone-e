/**
 * @access public
 * @description Writes files stored in a Ffosbr backup back
 *   to Firefox OS. The contents restored depends on the
 *   backup present. Valid data types are: apps, music, photos,
 *   videos, contacts, and settings.
 *   If an error occurs, restore tries to call the "onerror"
 *   handler.
 * @param {callback} onerror
 */
var restore = function(onerror) {

  // TODO - use real path
  var backupFilePath = 'backup/';
  var externalSD = null;
  var restoreFiles = {};
  var type = null;

  // TODO - replace with actual file paths
  // TODO - this should be stored in settings
  var paths = {
    apps: 'backup/apps/',
    music: 'backup/music/',
    photos: 'backup/photos/',
    videos: 'backup/videos/',
    contacts: 'backup/contacts/',
    settings: 'backup/settings/'
  };

  externalSD = window.ffosbr.media.getStorageByName('sdcard').external;

  if (externalSD.ready === true) {
    restoreFiles = externalSD.store.enumerate(paths[type]);
    ffosbr.contacts.restore();
  }

  restoreFiles.onsuccess = function(file) {
    if (!file) {
      return;
    }

    var fn = file.name;
    var filepath = fn.substr(0, fn.lastIndexOf('/') + 1);
    var filename = fn.substr(fn.lastIndexOf('/') + 1, fn.length);

    for (var i in paths) {
      if (filepath === paths[i]) {
        type = i;
        break;
      }
    }

    // The following data types are passed to the OS
    // in the same fashion. Contacts and settings have
    // to be handled individually.
    if (filepath === paths.apps ||
      filepath === paths.music ||
      filepath === paths.photos ||
      filepath === paths.videos) {

      window.ffosbr.media.put(type, file, '', function(error) {
        if (error) {
          throw error;
        }
      });
    } else if (filepath === paths.contacts) {
      // This is already done for us
    } else if (filepath === paths.settings) {
      // TODO
    } else {
      throw new Error('Failed to determine data type of ' + fn);
    }
  };


  function restoreContacts(fulldir) {

    var dirname = paths.contacts.substr(0, paths.contacts.lastIndexOf('/'));
    var reader = new FileReader();

    reader.onloadend = function() {
      var contents = this.result;
      var data = JSON.parse(contents);
      for (var i = 0; i < data.length; ++i) {
        navigator.mozContacts.save(data[i]);
      }
    };

    ffosbr.media.get('sdcard1', dirname, function(file, err) {
      if (err) {
        alert(err.message);
      } else {
        alert(file.name); //rmv
        reader.readAsText(file);
      }
    });
  }

  function restoreSettings() {
    // TODO
  }
};

// Defines Ffosbr restore
module.exports = restore;
