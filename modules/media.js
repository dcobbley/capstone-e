/**
 * Manages internal and external storages, or handles to storage
 * devices, and their various data sets, including apps, music,
 * pictures, sdcard, and videos.
 */
function Media() {

  // Public data members

  // Each storage contains a store {DeviceStorage} and a ready {boolean}
  this.internal = {
    apps: {},
    music: {},
    pictures: {},
    sdcard: {},
    videos: {}
  };

  // Each storage contains a store {DeviceStorage} and a ready {boolean}
  this.external = {
    apps: {},
    music: {},
    pictures: {},
    sdcard: {},
    videos: {}
  };


  // Private data members

  var appStores; // {array of DeviceStorage}
  var musicStores; // {array of DeviceStorage}
  var picturesStores; // {array of DeviceStorage}
  var sdcardStores; // {array of DeviceStorage}
  var videosStores; // {array of DeviceStorage}


  // Constructor

  appStores = navigator.getDeviceStorages('apps');
  musicStores = navigator.getDeviceStorages('music');
  picturesStores = navigator.getDeviceStorages('pictures');
  sdcardStores = navigator.getDeviceStorages('sdcard');
  videosStores = navigator.getDeviceStorages('video');


  // TODO -- we need a way of tracking which of the above
  // calls failed.


  // initialize app storage
  this.internal.apps = this.getInternalStorage(appStores);
  this.external.apps = this.getExternalStorage(appStores);

  // initialize music storage
  this.internal.music = this.getInternalStorage(musicStores);
  this.external.music = this.getExternalStorage(musicStores);

  // initialize picture storage
  this.internal.pictures = this.getInternalStorage(picturesStores);
  this.external.pictures = this.getExternalStorage(picturesStores);

  // initialize sdcard storage
  this.internal.sdcard = this.getInternalStorage(sdcardStores);
  this.external.sdcard = this.getExternalStorage(sdcardStores);

  // initialize video storage
  this.internal.videos = this.getInternalStorage(videosStores);
  this.external.videos = this.getExternalStorage(videosStores);
}

/**
 * @access public
 * @description Takes an array of DeviceStorage objects and returns
 *   whichever represents the internal storage.
 * @param {array of DeviceStorage} stores
 * @returns {DeviceStorage}
 */
Media.prototype.getInternalStorage = function(stores) {

  // TODO - if there are multiple internal
  // storages, do we just use the largest?
  for (var i = 0; i < stores.length; ++i) {
    if (stores[i].isRemovable === false) {
      return {
        store: stores[i],
        ready: true
      };
    }
  }

  return {
    store: null,
    ready: false
  };
};

/**
 * @access private
 * @description Takes an array of DeviceStorage objects and returns
 *   whichever represents the external storage.
 * @param {array of DeviceStorage} stores
 * @returns {DeviceStorage}
 */
Media.prototype.getExternalStorage = function(stores) {

  // TODO - if there are multiple external
  // storages, do we just use the largest?
  for (var i = 0; i < stores.length; ++i) {
    if (stores[i].isRemovable === true) {
      return {
        store: stores[i],
        ready: true
      };
    }
  }

  return {
    store: null,
    ready: false
  };
};

/**
 * @access public
 * @description Takes a string describing which type of storage
 *   is desired. Valid options are: apps, music, pictures,
 *   sdcard, videos. Returns an option containing the appropriate
 *   internal and external storages.
 * @param {String} type
 * @returns {Object}
 */
Media.prototype.getStorageByName = function(type) {

  var stores = {
    internal: null,
    external: null
  };

  switch (type) {
    case 'apps':
      {
        stores.internal = this.internal.apps;
        stores.external = this.external.apps;
        break;
      }
    case 'music':
      {
        stores.internal = this.internal.music;
        stores.external = this.external.music;
        break;
      }
    case 'pictures':
      {
        stores.internal = this.internal.pictures;
        stores.external = this.external.pictures;
        break;
      }
    case 'sdcard':
      {
        stores.internal = this.internal.sdcard;
        stores.external = this.external.sdcard;
        break;
      }
    case 'videos':
      {
        stores.internal = this.internal.videos;
        stores.external = this.external.videos;
        break;
      }
    default:
      {
        throw new Error('Invalid media type: ' + type);
      }
  }

  return stores;
};

/**
 * @access public
 * @description Fetches files from both internal and external storages
 *   via DOMRequest. The type of files fetched (e.g. pictures, music) is
 *   specified by the 'type' parameter. Each file fetched will be passed
 *   to the provided 'forEach' handler as a File object. If the 'type'
 *   parameter is 'sdcard1' and a 'directory' parameter is provided, only
 *   files found in the specified directory will be returned.
 *   (Note: 'directory' must not have a trailing '/')
 *   (Note: File extends Blob)
 * @param {String} type
 * @param {String} directory (optional)
 * @param {callback} forEach
 */
Media.prototype.get = function(type, directory, forEach) {

  var storages = null;
  var internal = null;
  var external = null;
  var internalFiles = {};
  var externalFiles = {};

  // TODO - write utility/settings function to confirm
  // a valid media type.
  if (typeof(type) !== 'string') {
    throw new Error('Missing or invalid media type');
  }

  if (typeof(directory) !== 'string') {
    if (window.ffosbr.utils.isFunction(directory)) {
      // Parameter 'directory' was not provided, and the
      // second parameter is really the 'forEach' function
      forEach = directory;
    } else if (window.ffosbr.utils.isFunction(forEach)) {
      throw new Error('Missing or invalid directory');
    } else {
      throw new Error('Missing or invalid callback');
    }
    directory = null;
  }

  if (!window.ffosbr.utils.isFunction(forEach)) {
    throw new Error('Missing or invalid callback');
  }

  storages = this.getStorageByName(type === 'sdcard1' ? 'sdcard' : type);
  internal = storages.internal;
  external = storages.external;

  if (type === 'sdcard1' && external.ready === true) {
    if (directory !== null) {
      externalFiles = external.store.enumerate(directory);
    } else {
      externalFiles = external.store.enumerate();
    }
  } else if (type === 'sdcard1' && external.ready === false) {
    throw new Error('Attempt to read from an invalid storage. Abort.');
  } else if (internal.ready === true || external.ready === true) {
    // Fall back to empty objects to avoid errors providing
    // 'onsuccess' callbacks to null variables.
    internalFiles = (internal.ready ? internal.store.enumerate() : {});
    externalFiles = (external.ready ? external.store.enumerate() : {});
  } else {
    throw new Error('Attempt to read from an invalid storage. Abort.');
  }

  function onsuccess() {
    var result = this.result;
    forEach(result, undefined);
  }

  function onerror() {
    var error = this.error;
    forEach(undefined, error);
  }

  internalFiles.onsuccess = onsuccess;
  externalFiles.onsuccess = onsuccess;
  internalFiles.onerror = onerror;
  externalFiles.onerror = onerror;
};


/**
 * @access public
 * @description Writes files to a specified destination. If the file type is
 *   'apps', 'music', 'pictures', 'sdcard', or 'videos' then the file will be
 *   handed off to the OS and any file paths in the 'dest' parameter will be
 *   ignored. If the file type is 'sdcard1' the file will be written to the
 *   external storage device with the exact 'dest' provided. If an oncomplete
 *   callback if provided, it will be called after the file has been written.
 * @param {String} type
 * @param {File} file
 * @param {String} dest
 * @param {requestCallback} oncomplete (option)
 */
Media.prototype.put = function(type, file, dest, oncomplete) {

  var filename = null; // dest without file paths
  var storages = null; // array of DeviceStorage
  var targetStorage = null; // DeviceStorage to write to
  var sname = null; // valid OS media type
  var write = null; // cursor or iterator

  if (typeof(type) !== 'string') {
    throw new Error('Missing or invalid media type');
  }

  if (!(file instanceof File)) {
    throw new Error('Missing or invalid file');
  }

  if (typeof(dest) !== 'string') {
    throw new Error('Missing or invalid write destination');
  }

  if (oncomplete && !window.ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Callback is not a function');
  }

  // strip out the file path
  filename = dest.substr(dest.lastIndexOf('/') + 1, dest.length);

  // If the type is 'sdcard1', use name 'sdcard'
  sname = (type === 'sdcard1' ? 'sdcard' : type);
  storages = this.getStorageByName(sname);

  if (type === 'sdcard1') {
    if (storages.external !== null && storages.external.ready === true) {
      targetStorage = storages.external;
    } else {
      throw new Error('Attempt to write to an invalid storage. Abort.');
    }
  } else {
    targetStorage = (storages.internal === null ? storages.external : storages.internal);
  }

  if (type === 'sdcard1') {
    write = targetStorage.store.addNamed(file, dest);
  } else if (targetStorage.ready === true) {
    write = targetStorage.store.addNamed(file, filename);
  } else {
    throw new Error('Attempt to write to an invalid storage. Abort.');
  }

  write.onsuccess = function(fileWritten) {
    // Only call the oncomplete callback if it was provided
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete();
    }
  };

  write.onerror = function() {
    // TODO -- handle all the terrible things that will undoubtedly
    // go wrong while writing files...
    //     - external doesn't exist
    //     - not enough space for file

    // TODO - this will fail if the file already exists, but this
    // isn't really a failure.. We need a way of determining when
    // this is the case. Also, call the oncomplete callback.

    // Only call the oncomplete callback if it was provided
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(this.error);
    }
  };
};

/**
 * @access public
 * @description Removes a file from the external sdcard. If an oncomplete
 *   callback is provided, it will be called after the file is removed.
 * @param {String} filename - Specifies the full path to the file to be
 *   removed from the external sdcard (sdcard1).
 * @param {requestCallback} oncomplete (optional)
 */
Media.prototype.remove = function(filename, oncomplete) {

  var externalSD = this.getStorageByName('sdcard').external;
  var remove = null; // cursor or iterator

  if (typeof(filename) !== 'string') {
    throw new Error('Missing or invalid filename');
  }

  if (oncomplete && !window.ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Callback is not a function');
  }

  if (externalSD.ready === true) {
    console.log('remove from sd:');
    console.log(filename);
    remove = externalSD.store.delete(filename);
    console.log(remove);
  } else {
    throw new Error('Attempt to delete from invalid storage. Abort.');
  }

  remove.onsuccess = function() {
    // Only call the oncomplete callback if it was provided
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete();
    }
  };

  remove.onerror = function() {
    // TODO -- Found out if this fails when the file doesn't exist.
    // If that's the case, detect it and don't throw any errors. We'll
    // also need to call the oncomplete callback in that case.

    // Only call the oncomplete callback if it was provided
    if (window.ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(this.error);
    }
  };
};

// Extend Ffosbr library
module.exports = new Media();
