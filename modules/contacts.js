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

  var dirname = 'backup/contacts/'.substr(0, '/backup/contacts/'.lastIndexOf('/'));
  console.log('dirname is: ' + dirname);

  var reader = new FileReader();

  reader.onloadend = function() {
    var contents = this.result;
    console.log(typeof contents);
    var data = JSON.parse(contents);
    for (var i = 0; i < data.length; ++i) {
      navigator.mozContacts.save(data[i]);
    }
  };


/******************
BROKEN
Failes if you attempt to get a contacts.json that doesn't exist
Must make sure what ever it gets is a valid json file before it is passed to the 
JSON.parse
************/

  ffosbr.media.get('sdcard1', dirname + 'contacts.json', function(file, err) {
    if (err) {
      alert('get' + err.message);
    } else {
      console.log('got file');
      console.log(file);
      reader.readAsText(file);
    }
  });
};

/**
 * @access public
 * @description TODO
 */

Contacts.prototype.clean = function(oncomplete) {
  console.log('remove');
  console.log('/backup/contacts/');
  ffosbr.media.remove('/backup/contacts/' + 'contacts.json', function(err) {
    if (err) {
      console.log('clean err: ');
      console.log(err);
    }
    console.log('clean success');
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete();
    }

  });
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

  console.log('getContactsFromSIM');


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

Contacts.prototype.putContactsOnSD = function(oncomplete) {
  console.log('putContactsOnSD');

  var that = this;

  ffosbr.clean('contacts', function(err) {
    var sdcard = ffosbr.media.getStorageByName('sdcard').external;
    var file = new Blob([JSON.stringify(that.contacts)], {
      type: 'text/json'
    });
    var filename = 'contacts.json';
    var request = null;


    if (sdcard.ready === true) {

      console.log('/backup/contacts/');
      request = sdcard.store.addNamed(file, '/backup/contacts/' + filename);

    } else {
      // TODO - handle errors
      alert('external sdcard not ready'); //rmv
    }

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
  });
};

// Defines Ffosbr contact
module.exports = new Contacts();
