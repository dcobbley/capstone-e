/**
 * @access private
 * @description Basic "storage" class to help simplify code in the
 *  Media module, and help offload some functionality in detecting
 *  write-collisions. The main purpose of this class is to indicate
 *  the availability of a DeviceStorage object, and to keep track of
 *  all files in the DeviceStorage without having to query as often.
 * @param {string} type: The type of storage being held.
 *   Note: See Media > storageTypes for a list of valid types.
 * @param {DeviceStorage} store: The DeviceStorage used by this
 *   storage instance.
 * @throws on invalid media type of device storage
 */
function Storage(type, store) {

  var that = this;

  this.type = null;
  this.store = null;
  this.files = {};
  this.updating = false;
  this.ready = true;

  if (typeof ffosbr.media.storageTypes.indexOf(type) < 0) {
    throw new Error('Invalid media type ' + type);
  }
  if (store === null) {
    this.ready = false;
    store = {}; // to avoid error adding onchange
  } else if (!(store instanceof DeviceStorage)) {
    throw new Error('Invalid DeviceStorage object');
  }

  this.type = type;
  this.store = store;

  this.store.onchange = function() {
    that.populate();
  };

  this.populate();
}

/**
 * @access private
 * @description Reports whether or not a file exists in a
 *   given storage.
 * @param {string} fname: Name of file to check.
 * @param {callback} oncomplete: It is possible that the files
 *   were being repopulated when this function was called. For
 *   that reason, this method has to be asynchronous and wait
 *   for the update to finish before returning a value.
 */
Storage.prototype.fileExists = function(fname, oncomplete) {

  var that = this;

  if (this.updating === true) {
    setTimeout(function() {
      that.fileExists(fname, oncomplete);
    }, 5);
    return;
  }

  if (this.ready === false) {
    // This storage's DeviceStorage is invalid.
    // Therefore, the file cannot exist.
    oncomplete(false);
  } else if (this.files[this.sanitizeFilename(fname)] === true) {
    oncomplete(true);
  } else {
    oncomplete(false);
  }
};

/**
 * @access private
 * @description Enumerates all files on storage and adds them to
 *   the "files" object. This is used for tracking what files
 *   exist in the storage at all times.
 * @throws if fails access storage
 */
Storage.prototype.populate = function() {

  var that = this;
  var listFiles = {}; // cursor

  if (this.ready === false) {
    // This storage's DeviceStorage is invalid.
    // Therefore, there is nothing to populate.
    return;
  }

  this.updating = true; // files are in flux
  this.files = {}; // erase record of current files

  try {
    listFiles = this.store.enumerate();
  } catch (e) {
    console.error(e.message);
    this.ready = false;
    that.updating = false;
  }

  listFiles.onsuccess = function() {
    var file = this.result;
    if (file) {
      var name = that.sanitizeFilename(file.name);
      that.files[name] = true;
      if (!this.done) {
        this.continue();
      } else {
        that.updating = false;
        that.makePathsRelative();
        that.ready = true;
      }
    } else {
      that.updating = false;
      that.makePathsRelative();
      that.ready = true;
    }
  };

  listFiles.onerror = function() {
    that.updating = false;
    that.ready = false;
    console.error('Failed to list files on storage device ' + that.type);
  };
};

/**
 * @access private
 * @description Sanitizes file names such that they are valid
 *   object keys.
 * @fname File name to sanitize.
 * @returns {string}
 */
Storage.prototype.sanitizeFilename = function(fname) {
  // TODO - This is not legit.
  // Also, this might not be necessary
  fname = fname.replace(/-/g, 'x');
  fname = fname.replace(/\./g, 'y');
  return fname;
};

/**
 * @access private
 * @description Determines whether there exists a common prefix to the
 *   path names in the "files" object and, if so, removes it.
 */
Storage.prototype.makePathsRelative = function() {

  var all = [];

  if (this.files.length === 0) {
    // We cannot accurately do this without
    // at least two files in storage.
    return;
  }

  // Convert to array
  for (var field in this.files) {
    all.push(field);
  }

  // Sort them
  all = all.concat().sort();

  if (all.length === 0) {
    return;
  }

  var a1 = all[0]; // 1st file name
  var a2 = all[all.length - 1]; // nth file name
  var prefix = ''; // common base directory
  var i = 0;

  while (i < a1.length && a1.charAt(i) === a2.charAt(i)) {
    ++i;
  }

  a1 = a1.substring(0, i);
  prefix = a1.substring(0, a1.lastIndexOf('/') + 1);

  for (var name in this.files) {
    var normalized = name.substr(prefix.length, name.length);
    this.files[normalized] = true;
    delete this.files[name];
  }
};

// Extend Ffosbr library
module.exports = Storage;
