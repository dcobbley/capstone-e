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
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.clean = function() {
  ffosbr.media.remove(paths.contacts + 'contacts.json', oncomplete);
};

/**
 * @access public
 * @description TODO
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
      if (that.requestsFinished === that.requestsNeeded) {
        that.putContactsOnSD();
      }
    }
  };

  allContactsCursor.onerror = function() {
    alert('Error getting contacts');
  };
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.getContactsFromSIM = function() {

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
};

/**
 * @access public
 * @description TODO
 */
Contacts.prototype.putContactsOnSD = function() {

  var that = this;

  ffosbr.clean('contacts', function() {
    var sdcard = ffosbr.media.getStorageByName('sdcard').external;
    var file = new Blob([JSON.stringify(that.contacts)], {
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
};

// Defines Ffosbr contact
module.exports = new Contacts();
