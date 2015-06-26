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
  } else if (paths[type] === 'contacts') {
    return backupContacts();
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
  var backupContacts = function() {

    console.log('At least I got called..'); //rmv

    var allContactsCursor,
      selectedContacts = [];

    allContactsCursor = navigator.mozContacts.getAll({
      sortBy: 'name',
      sortOrder: 'ascending'
    });

    allContactsCursor.onsuccess = function() {
      if (allContactsCursor.result) {
        var contact = allContactsCursor.result;
        console.log('new result:' + contact.name);
        selectedContacts.push(contact);
        allContactsCursor.continue();
      }
    };

    allContactsCursor.onerror = function() {
      alert('Error getting contacts');
    };

    var vCard = '',
      i = 0,
      len = 0;
    for (i = 0, len = selectedContacts.length; i < len; i++) {
      vCard += ffosbr.utils.contactToVcard(selectedContacts[i]);
      vCard += '\r\n';
    }

    ffosbr.clean('contacts', function() {
      var sdcard = ffosbr.media.getStorageByName('sdcard').external,
        file = new Blob([vCard], {
          type: 'text/vcard'
        }),
        request = null;

      if (sdcard.ready === true) {
        request = sdcard.store.addNamed(file, paths.contacts + 'contacts.vcf');
      } else {
        // error
      }

      request.onsuccess = function() {
        var name = this.result;
        console.log('File \"' + name + '\" successfully wrote on the sdcard storage area');
        alert('Contacts saved to SD Card');
      };

      // An error typically occur if a file with the same name already exist
      request.onerror = function() {
        console.warn('Unable to write the file: ' + this.error.name);
        alert('Could not save contacts: ' + this.error.name);
      };
    });
  };
};

// Defines Ffosbr backup
module.exports = backup;
