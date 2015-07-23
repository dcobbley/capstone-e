/**
 * @access public
 * @description this contact backup and restore functionality has the ability to look on your device and the contacts that are stored on the SIM or ICC card(s) as well as internal contacts, and back them up to a JSON file on an external SD card.
 */
var Contacts = function() {
  this.contacts = [];
};

/**
 * @access public
 * @description The backup function is responsible for setting off the chain of functions that effectively backs up all of the contacts from internal memory to an external SD card.
 * There is no need to call getContactsFromOS, this function calls it upon success as to avoid any asynchronous issues.
 */
Contacts.prototype.backup = function() {
  this.getContactsFromSIM();
};

/**
 * @access public
 * @description The Restore function will look for a contacts JSON file existing on an extenal SD card under the directory /backup/contacts/contacts.json. It will parse all the data in that file and transfer them back onto the internal memory in mozContacts
 */
Contacts.prototype.restore = function() {
  var that = this;
  var reader = new FileReader();

  reader.onloadend = function() {
    var contents = this.result;
    var data = JSON.parse(contents);
    for (var i = 0; i < data.length; ++i) {
      var myContact = new mozContact(data[i]);
      myContact.givenName = [data[i].name];
      navigator.mozContacts.save(myContact);
    }
  };

  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var request = sdcard.get('/sdcard1/backup/contacts/contacts.json');

  request.onsuccess = function() {
    reader.readAsText(this.result);
  };

  request.onerror = function() {
  };
};

/**
 * @access public
 * @description The clean function looks for a previous backup contacts.json file and will delete it if it exists as to not let the contacts functionality break when it tries to write its new backup to the external SD card
 */
Contacts.prototype.clean = function(oncomplete) {
  var that = this;
  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var remove = sdcard.delete('/sdcard1/backup/contacts/contacts.json');

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

 * @access public
 * @description This function gets contacts from the main memory where mozContacts are stored. It should only be called by the getContactsFromSIM function to avoid a race condition. Once all the contacts have been fetched by this function, it will call putContactsOnSD which stores the contacts from the SIM card and the internal memory to an external SD card.
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
        cursor.onsuccess = function() {
          if (this.result) {
            var file = this.result;
            if (file.name === '/sdcard1/backup/contacts/contacts.json') {
            }
          }
        };
      });
    }
  };

  allContactsCursor.onerror = function() {
    that.putContactsOnSD(function() {
      //------Log what is written to the sdcard--------//
      var sdcard = navigator.getDeviceStorages('sdcard')[1];
      var cursor = sdcard.enumerate();
      cursor.onsuccess = function() {
        if (this.result) {
          var file = this.result;
          if (file.name === '/sdcard1/backup/contacts/contacts.json') {
            //Used for debugging purposes.
          }
        }
      };
    });
  };
};

/**
 * @access public
 * @description This functionality gets contacts from one or more SIM or ICC cards if they exist. The functions are chained as to avoid a race condition when writing contacts back to the internal memory. Make sure to use the mobileconnections permission. This function calls getContactsFromOS upon completion.
 */
Contacts.prototype.getContactsFromSIM = function() {
  var that = this;
  var cards = navigator.mozMobileConnections;
  var request = null;
  var numSIMCards = 0; // NEW
  var numHandlersCalled = 0; // NEW

  var onSuccessFunction = function() {
    var contact = this.result;
    ++numHandlersCalled; // NEW
    if (contact) {
      that.contacts = that.contacts.concat(contact);
    }
    if (numHandlersCalled === numSIMCards) {
      that.getContactsFromOS();
    }
  };

  var onErrorFunction = function() {
    ++numHandlersCalled; // NEW
    if (numHandlersCalled === numSIMCards) {
      that.getContactsFromOS();
    }
  };

  for (var x = 0; x < cards.length; ++x) {
    if (cards[x].iccId) {
      ++numSIMCards;
    }
  }

  var presentCards = 0;
  for (var i = 0; i < cards.length; ++i) {
    if (cards[i].iccId) {
      presentCards += 1;
      var id = cards[i].iccId;
      var icc = navigator.mozIccManager.getIccById(id);
      request = icc.readContacts('adn');
      request.onsuccess = onSuccessFunction;
      request.onerror = onErrorFunction;
    }
  }
  if (presentCards === 0) {
    this.getContactsFromOS();
  }
};

/**
 * @access public
 * @description Once all the contacts have been gathered from the SIM and internal memory, this function is called and will look for an existing backup contacts.json file, if it exists it will try to delete it before writing the new set of contacts to the external SD card.
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
        var request = sdcard.addNamed(file, 'backup/contacts/contacts.json');
        request.onsuccess = function() {
          if (window.ffosbr.utils.isFunction(oncomplete)) {
            oncomplete();
          }
        };

        // An error typically occur if a file with the same name already exist
        request.onerror = function() {
          var error = this.error;
          if (window.ffosbr.utils.isFunction(oncomplete)) {
            oncomplete(error);
          }
        };
      } else if (this.result == 'unavailable') {
        //Device unavaliable
      } else {
        //device is currently being used by something else
      }
    };

    sdcardAvailable.onerror = function() {
      console.warn('SDcard Error');
    };
  });
};

// Defines Ffosbr contact
module.exports = new Contacts();
