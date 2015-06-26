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
    settings: 'backup/settings/'
  };

  if (typeof(paths[type]) === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  } else if (type === 'contacts') {
    return getContacts();
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


  // back up contacts function
  function getContacts() {

    var selectedContacts = [];
    var allContactsCursor;

    allContactsCursor = navigator.mozContacts.getAll({
      sortBy: 'name',
      sortOrder: 'ascending'
    });

    allContactsCursor.onsuccess = function() {
      var contact = this.result;
      if (contact) {
        selectedContacts.push(contact);
        allContactsCursor.continue();
      } else {
        putContacts(selectedContacts);
      }
    };

    allContactsCursor.onerror = function() {
      alert('Error getting contacts');
    };
  }

  function putContacts(selectedContacts) {

    var cdata = [];

    for (var i = 0; i < selectedContacts.length; ++i) {
      cdata.push(selectedContacts[i]);
    }

    ffosbr.clean('contacts', function() {
      var sdcard = ffosbr.media.getStorageByName('sdcard').external;
      var file = new Blob([JSON.stringify(cdata)], {
        type: 'text/json'
      });
      var filename = 'contacts.json';
      var request = null;


      if (sdcard.ready === true) {
        request = sdcard.store.addNamed(file, paths.contacts + filename);
      } else {
        // TODO - handle errors
        alert('external sdcard not ready'); //rmv
      }

      request.onsuccess = function() {
        oncomplete();
      };

      // An error typically occur if a file with the same name already exist
      request.onerror = function() {
        var error = this.error;
        oncomplete(error);
      };
    });
  }
};

// Defines Ffosbr backup
module.exports = backup;
