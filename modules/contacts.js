/**
 * @access public
 * @description Takes contacts stored on the device and SIM or ICC card(s) and saves them
 * to a JSON file on an external SD card.
 */
var Contacts = function() {
  this.contacts = [];
};

/**
 * @access public
 * @description Saves all contacts from the device and SIM/ICC cards to a JSON file on the SD card.
 * Note: Calls getContactsFromSIM() calls getContactsFromOS() on completion.
 */
Contacts.prototype.backup = function() {
  this.getContactsFromSIM();
};

/**
 * @access public
 * @description Loads contacts from a JSON file on the SD card onto the phone.
 */
Contacts.prototype.restore = function() {
  var that = this;
  var reader = new FileReader();

  reader.onloadend = function() {
    var contents = this.result;
    var data;
    try {
      data = JSON.parse(contents);
    } catch (SyntaxError) {
      alert('Invalid contacts.');
      return;
    }
    for (var i = 0; i < data.length; ++i) {
      var myContact = new mozContact(data[i]);
      myContact.givenName = [data[i].name];
      navigator.mozContacts.save(myContact);
    }
  };


  var path = '/sdcard1/' + ffosbr.settings.backupPaths.contacts + '/contacts.json';

  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var request = sdcard.get(path);

  request.onsuccess = function() {
    reader.readAsText(this.result);
  };

  request.onerror = function() {};
};

/**
 * @access private
 * @description Deletes contacts.json from the SD card if it exists.
 */
Contacts.prototype.clean = function(oncomplete) {
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.contacts + '/contacts.json';
  var that = this;
  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var remove = sdcard.delete(path);

  remove.onsuccess = function() {
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete('Clean success');
    }
  };

  remove.onerror = function() {
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(remove.error);
    }
  };
};

/**
 * @access private
 * @description Gets contacts from main memory.
 * Calls putContactsOnSD() on completion.
 */
Contacts.prototype.getContactsFromOS = function() {
  var that = this;
  var allContactsCursor;

  allContactsCursor = navigator.mozContacts.getAll({
    sortBy: 'name',
    sortOrder: 'ascending'
  });

  allContactsCursor.onsuccess = function() {
    var contact = this.result;
    if (contact) {
      that.contacts.push(contact);
      allContactsCursor.continue();
    } else {
      that.putContactsOnSD(function() {
        //------Log what is written to the sdcard--------//
        var sdcard = navigator.getDeviceStorages('sdcard')[1];
        var cursor = sdcard.enumerate();
        cursor.onsuccess = function() {};
      });
    }
  };

  allContactsCursor.onerror = function() {
    that.putContactsOnSD(function() {
      //------Log what is written to the sdcard--------//
      var sdcard = navigator.getDeviceStorages('sdcard')[1];
      var cursor = sdcard.enumerate();
      cursor.onsuccess = function() {};
    });
  };
};

/**
 * @access private
 * @description Gets contacts from SIM or ICC cards.
 * Calls getContactsFromOS upon completion.
 */
Contacts.prototype.getContactsFromSIM = function() {
  var that = this;
  var cards = navigator.mozMobileConnections;
  var request = null;
  var numSIMCards = 0;
  var numHandlersCalled = 0;

  var onSuccessFunction = function() {
    var contact = this.result;
    ++numHandlersCalled;
    if (contact) {
      that.contacts = that.contacts.concat(contact);
    }
    if (numHandlersCalled === numSIMCards) {
      that.getContactsFromOS();
    }
  };

  var onErrorFunction = function() {
    ++numHandlersCalled;
    if (numHandlersCalled === numSIMCards) {
      that.getContactsFromOS();
    }
  };

  for (var x = 0; x < cards.length; ++x) {
    if (cards[x].iccId) {
      ++numSIMCards;
    }
  }


  for (var i = 0; i < cards.length; ++i) {
    if (cards[i].iccId) {
      var id = cards[i].iccId;
      var icc = navigator.mozIccManager.getIccById(id);
      request = icc.readContacts('adn');
      request.onsuccess = onSuccessFunction;
      request.onerror = onErrorFunction;
    }
  }
  if (numSIMCards === 0) {
    this.getContactsFromOS();
  }
};

/**
 * @access private
 * @description Writes the resulting JSON file to the SD card, removing any preexisting
 * file with the same name.
 */
Contacts.prototype.putContactsOnSD = function(oncomplete) {
  var that = this;
  this.clean(function(err) {
    var sdcard = navigator.getDeviceStorages('sdcard')[1];
    file = new Blob([JSON.stringify(that.contacts)], {
      type: 'text/json'
    });

    var sdcardAvailable = sdcard.available();

    sdcardAvailable.onsuccess = function() {
      if (this.result == 'available') {

        var path = ffosbr.settings.backupPaths.contacts + '/contacts.json';
        var request = sdcard.addNamed(file, path);
        request.onsuccess = function() {
          if (window.ffosbr.utils.isFunction(oncomplete)) {
            oncomplete();
          }
        };

        // An error typically occurs if a file with the same name already exists
        request.onerror = function() {
          var error = this.error;
          if (window.ffosbr.utils.isFunction(oncomplete)) {
            oncomplete(error);
          }
        };
      }
    };

    sdcardAvailable.onerror = function() {
      console.warn('SDcard Error');
    };
  });
};

// Defines Ffosbr contact
module.exports = new Contacts();
