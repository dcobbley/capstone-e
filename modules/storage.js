/**
 * @description Basic "storage" class to help simplify code in the
 *  Media module, and help offload some functionality in detecting
 *  write-collisions. The main purpose of this class is to indicate
 *  the availability of a DeviceStorage object, and to keep track of
 *  all files in the DeviceStorage without having to query as often.
 * @param {string} type: The type of storage being held.
 *   Note: See Media > storageTypes for a list of valid types.
 * @param {DeviceStorage} store: The DeviceStorage used by this
 *   storage instance.
 */
function Storage(type, store) {

  this.type = null;
  this.store = null;
  this.files = {};
  this.updating = false;

  if (typeof ffosbr.media.storageTypes.indexOf(type) < 0) {
    throw new Error('Invalid media type ' + type);
  }
  if (!store || !(store instanceof DeviceStorage)) {
    throw new Error('Invalid DeviceStorage object');
  }

  this.type = type;
  this.store = store;
  this.populate();
}

/**
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

  if (this.files[this.sanitizeFilename(fname)] === true) {
    oncomplete(true);
  } else {
    oncomplete(false);
  }
};

/**
 * @description Enumerates all files on storage and adds them to
 *   the "files" object. This is used for tracking what files
 *   exist in the storage at all times.
 */
Storage.prototype.populate = function() {

  var that = this;
  var listFiles = {}; // cursor

  this.updating = true; // files are in flux
  this.files = {}; // erase record of current files

  try {
    listFiles = this.store.enumerate();
  } catch (e) {
    throw e;
  }

  listFiles.onsuccess = function() {
    var file = this.result;
    if (file) {
      var name = that.sanitizeFilename(file.name);
      that.files[name] = true;
    } else {
      that.updating = false;
    }
  };

  listFiles.onerror = function() {
    throw new Error('Failed to list files on storage device ' + this.type);
  };
};

/**
 * @description Sanitizes file names such that they are valid
 *   object keys.
 * @fname File name to sanitize.
 * @returns {string}
 */
Storage.prototype.sanitizeFilename = function(fname) {
  // TODO - This is not legit.
  fname = fname.replace(/-/g, 'x');
  fname = fname.replace(/\./g, 'y');
  return fname;
};

// Extend Ffosbr library
module.exports = Storage;
