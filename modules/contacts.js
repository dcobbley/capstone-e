/**
 * Takes contacts stored on the device and SIM or ICC card(s) and saves them
 * to a JSON file on an external SD card.
 */
var Contacts = function() {};

/**
 * @access public
 * @description List of contacts initialized, as well as onprogress and oncomplete for checking the status of the current backup
 */
Contacts.prototype.initialize = function() {
  this.running = false;
  this.contacts = [];
  this.SIMfinished = false;
  this.OSfinished = false;
  this.onprogress = null; // user defined function
  this.oncomplete = null; // user defined function
};

/**
 * @access public
 * @description Checks the progress of the current backup
 */
Contacts.prototype.checkProgress = function() {
  var that = this;
  var delay = 250; // 1/4 sec in ms

  if (!this.SIMfinished || !this.OSfinished) {

    if (this.onprogress) {
      this.onprogress();
    }

    // recurse!
    setTimeout(function() {
      that.checkProgress();
    }, delay);

  } else if (this.oncomplete) {
    this.oncomplete('contacts');
    this.SIMfinished = false; //Reset for next backup
    this.OSfinished = false; //Reset for next backup
    this.running = false;
  }
};

/**
 * @access public
 * @description Saves all contacts from the device and SIM/ICC cards to a JSON file on the SD card.
 *   Note: Calls getContactsFromSIM() calls getContactsFromOS() on completion.
 * @param {callback} oncomplete
 */
Contacts.prototype.backup = function(oncomplete) {
  if (!this.running) {
    this.oncomplete = oncomplete;
    this.running = true;
    this.checkProgress();
    this.contacts = [];
    this.getContactsFromSIM();
  }
};

/**
 * @access public
 * @description Loads contacts from a JSON file on the external SD card back
 *   onto the phone.
 * @param {callback} oncomplete
 */
Contacts.prototype.restore = function(oncomplete) {
  var that = this;
  var reader = new FileReader();
  var cursor = {};

  reader.onloadend = function() {
    var contents = this.result;
    var data;

    try {
      data = JSON.parse(contents);
    } catch (SyntaxError) {
      return oncomplete('contacts', new Error('Invalid contacts JSON file.'));
    }

    for (var i = 0; i < data.length; ++i) {
      var myContact = new mozContact(data[i]);
      var nameSplit = data[i].name[0].split(' ');
      if (nameSplit.length === 2) {
        myContact.givenName = [nameSplit[0]];
        myContact.familyName = [nameSplit[1]];
      } else {
        myContact.givenName = [data[i].name];
      }

      navigator.mozContacts.save(myContact);
    }

    // NOTE: mozContacts.save is an asynchronous call. Currently, we are not
    // checking whether this request is successful or not. However, it's more
    // difficult to do so than other DOMRequests. Mozilla should add support
    // for accepting multiple contacts as an argument, which would make tracking
    // the status of the request much easier.
    oncomplete('contacts');
  };


  var path = '/sdcard1/' + ffosbr.settings.backupPaths.contacts + '/contacts.json';

  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var request = {};

  if (sdcard) {
    request = sdcard.get(path);
  } else {
    oncomplete('contacts', new Error('Cannot load contacts JSON file.'));
  }

  request.onsuccess = function() {
    reader.readAsText(this.result);
  };

  request.onerror = function() {
    oncomplete('contacts', new Error('Failed to load contacts JSON file.'));
  };
};

/**
 * @access private
 * @description Deletes contacts.json from the SD card if it exists.
 * @param {callback} oncomplete
 */
Contacts.prototype.clean = function(oncomplete) {
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.contacts + '/contacts.json';
  var that = this;
  var sdcard = navigator.getDeviceStorages('sdcard')[1];
  var remove = {}; // cursor

  if (!ffosbr.utils.isFunction(oncomplete)) {
    oncomplete = function() {};
  }

  if (sdcard) {
    remove = sdcard.delete(path);
  } else {
    return oncomplete('contacts', new Error('Cannot remove contacts JSON file.'));
  }

  remove.onsuccess = function() {
<<<<<<< HEAD

    ffosbr.history.set('contacts', {
      title: 'Contacts',
      lastBackupDate: null,
      backupSize: 0,
    });

    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete('Clean success');
    }
=======
    oncomplete('contacts');
>>>>>>> master
  };

  remove.onerror = function() {
    oncomplete('contacts', this.error);
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
        that.OSfinished = true;
      });
    }
  };

  allContactsCursor.onerror = function() {
    that.putContactsOnSD(function() {
      //------Log what is written to the sdcard--------//
      var sdcard = navigator.getDeviceStorages('sdcard')[1];
      var cursor = sdcard.enumerate();
      cursor.onsuccess = function() {};
      that.OSfinished = true;
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

  // Nothing to backup from SIM
  if (!cards || cards.length === 0) {
    that.SIMfinished = true;
    return this.getContactsFromOS();
  }

  var onSuccessFunction = function() {
    var contact = this.result;
    ++numHandlersCalled;
    if (contact) {
      that.contacts = that.contacts.concat(contact);
    }
    if (numHandlersCalled === numSIMCards) {
      that.SIMfinished = true;
      that.getContactsFromOS();
    }
  };

  var onErrorFunction = function() {
    ++numHandlersCalled;
    if (numHandlersCalled === numSIMCards) {
      that.SIMfinished = true;
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
    that.SIMfinished = true;
    this.getContactsFromOS();
  }
};

/**
 * @access private
 * @description Writes the resulting JSON file to the SD card, removing any preexisting
 * file with the same name.
 * @param {callback} oncomplete
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

          ffosbr.history.set('contacts', {
            title: 'Contacts',
            lastBackupDate: new Date(),
            backupSize: file.size,
          });

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
