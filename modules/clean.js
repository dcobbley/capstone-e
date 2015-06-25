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

  // TODO - replace with actual file paths
  // TODO - this should be stored in settings
  var paths = {
    apps: 'backup/apps/',
    music: 'backup/music/',
    photos: 'backup/photos/',
    videos: 'backup/videos/',
    contacts: 'backup/videos/',
    settings: 'backup/settings/'
  };

  if (typeof(paths[type]) === undefined) {
    throw new Error('Invalid data type. Cannot clean type ' + type);
  } else if (paths[type] === 'contacts' ) {
		return cleanContacts();		
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
	
	var cleanContacts = function() {
		ffosbr.media.remove(paths['contacts'] + "contacts.vcf", oncomplete);
	}
};

// Defines Ffosbr clean
module.exports = clean;
