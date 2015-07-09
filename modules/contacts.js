/**
 * @access public
 * @description TODO
 */
var Contacts = function() {

  this.requestsFinished = 0;
  this.requestsNeeded = 2; // getContactsFromOS and getContactsFromSIM

  this.contacts = [];
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.backup = function() {
  this.getContactsFromOS();
  this.getContactsFromSIM();
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.restore = function() {

  var dirname = "/backups/contacts/".substr(0, "/backups/contacts/".lastIndexOf('/'));
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
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.clean = function() {
  console.log("remove");
  console.log("/backups/contacts/");
  ffosbr.media.remove("/backups/contacts/" + 'contacts.json', function (err) {
    if (err) alert('I have errored!');
    alert('I am calling back');
  });
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.getContactsFromOS = function() {
  console.log('getContactsFromOS');
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
      that.requestsFinished += 1;

      allContactsCursor.continue();
    } else {
      if (that.requestsFinished === that.requestsNeeded) {
        that.putContactsOnSD();
      }
    }
  };

  allContactsCursor.onerror = function() {
    alert('Error getting contacts');
  };

  that.requestsFinished += 1;
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.getContactsFromSIM = function() {
  console.log("getContactsFromSIM");

  var that = this;

  // Array of { MozMobileConnectionArray }
  var cards = navigator.mozMobileConnections;
  var request = null;
  var onSuccessFunction = function() {
    var result = this.result;
    if (result) {
      that.contacts = that.contacts.concat(result);

      if (that.requestsFinished === that.requestsNeeded) {
        that.putContactsOnSD();
      }
    }
  };

  var onErrorFunction = function(err) {
    throw err;
  };

  for (var i = 0; i < cards.length; ++i) {
    if (cards[i].iccId) {
      var id = navigator.mozIccManager.iccIds[i];
      var icc = navigator.mozIccManager.getIccById(id);
      request = icc.readContacts('adn');

      request.onsuccess = onSuccessFunction;
      request.onerror = onErrorFunction;

    }
  }
  that.requestsFinished += 1;
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.putContactsOnSD = function() {
  console.log('putContactsOnSD');
  var that = this;

  ffosbr.clean('contacts', function() {
    var sdcard = ffosbr.media.getStorageByName('sdcard').external;
    var file = new Blob([JSON.stringify(that.contacts)], {
      type: 'text/json'
    });
    var filename = 'contacts.json';
    var request = null;


    if (sdcard.ready === true) {
      console.log("/backups/contacts/");
      request = sdcard.store.addNamed(file, "/backups/contacts/" + filename);
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
};

// Defines Ffosbr contact
module.exports = new Contacts();
