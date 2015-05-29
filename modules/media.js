module.exports = function(Ffosbr) {


  /**
   * Manages internal and external storages, or handles to storage
   * devices, and their various data sets, including apps, music,
   * pictures, sdcard, and videos.
   */
  function Media() {

    // Public data members

    this.internal = {
      apps: null, // {DeviceStorage} internal apps
      music: null, // {DeviceStorage} internal music
      pictures: null, // {DeviceStorage} internal pictures
      sdcard: null, // {DeviceStorage} internal SD card
      videos: null // {DeviceStorage} internal videos
    };

    this.external = {
      apps: null, // {DeviceStorage} external apps
      music: null, // {DeviceStorage} external music
      pictures: null, // {DeviceStorage} external pictures
      sdcard: null, // {DeviceStorage} external SD card
      videos: null // {DeviceStorage} external videos
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

    // initialize app storage
    this.internal.apps = getInternalStorage(appStores);
    this.external.apps = getExternalStorage(appStores);

    // initialize music storage
    this.internal.music = getInternalStorage(musicStores);
    this.external.music = getExternalStorage(musicStores);

    // initialize picture storage
    this.internal.pictures = getInternalStorage(picturesStores);
    this.external.pictures = getExternalStorage(picturesStores);

    // initialize sdcard storage
    this.internal.sdcard = getInternalStorage(sdcardStores);
    this.external.sdcard = getExternalStorage(sdcardStores);

    // initialize video storage
    this.internal.videos = getInternalStorage(videosStores);
    this.external.videos = getExternalStorage(videosStores);
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
        return stores[i];
      }
    }
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
        return stores[i];
      }
    }
  };

  /**
   * @access private
   * @description Takes a string describing which type of storage
   *   is desired. Valid options are: apps, music, pictures,
   *   sdcard, videos. Returns an option containing the appropriate
   *   internal and external storages.
   * @param {String} type
   * @returns {Object}
   */
  function getStorageByName(type) {

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
          throw new Error('Invalid media type');
        }
    }

    return stores;
  }

  /**
   * @access public
   * @description Fetches files from both internal and external storages
   *   via DOMRequest. The type of files fetch (e.g. pictures, music) is
   *   specified by the type parameter. Each file fetched will be passed
   *   to the provided "for-each" handler as a File object.
   *   (Note: File extends Blob)
   * @param {String} type
   * @param {callback} forEach
   */
  Media.prototype.get = function(type, forEach) {

    var internal = null;
    var external = null;
    var internalFiles = null;
    var externalFiles = null;

    if (typeof(type) !== 'string') {
      throw new Error('Missing or invalid media type');
    }

    if (!window.ffosbr.utils.isFunction(forEach)) {
      throw new Error('Missing or invalid callback');
    }

    internal = getStorageByName(type).internal;
    external = getStorageByName(type).external;
    internalFiles = internal.enumerate();
    externalFiles = external.enumerate();

    internalFiles.onsuccess = function() {
      forEach(this.result);
    };
    externalFiles.onsuccess = function() {
      forEach(this.result);
    };
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
   * @param {requestCallback} oncomplete
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
      throw new Error('Missing or invalid File');
    }

    if (typeof(dest) !== 'string') {
      throw new Error('Missing or invalid write destination');
    }

    // strip out the file path
    filename = dest.substr(dest.lastIndexOf('/') + 1, dest.length);

    // If the type is 'sdcard1', use name 'sdcard'
    sname = (type === 'sdcard1' ? 'sdcard' : type);
    storages = getStorageByName(sname);
    targetStorage = (internal === null ? external : internal);

    if (type === 'sdcard1') {
      write = targetStorage.addNamed(file, dest);
    } else {
      write = targetStorage.addNamed(file, filename);
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

      console.error(this.error); // temporary
    };


    /**
     * @access public
     * @description Removes a file from the external sdcard. If an oncomplete
     *   callback is provided, it will be called after the file is removed.
     * @param {String} filename - Specifies the full path to the file to be
     *   removed from the external sdcard (sdcard1).
     * @param {requestCallback} oncomplete
     */
    Media.prototype.remove = function(filename, oncomplete) {

      var externalSD = this.getStorageByName('sdcard').external;
      var remove = null; // cursor or iterator

      if (typeof(filename) !== 'string') {
        throw new Error('Missing or invalid filename');
      }

      remove = externalSD.delete(filename);

      remove.onsuccess = function(fileRemoved) {
        // Only call the oncomplete callback if it was provided
        if (window.ffosbr.utils.isFunction(oncomplete)) {
          oncomplete();
        }
      };

      remove.onerror = function() {
        // TODO -- Found out if this fails when the file doesn't exist.
        // If that's the case, detect it and don't throw any errors. We'll
        // also need to call the oncomplete callback in that case.

        console.error(this.error); // temporary
      };
    };


  };


  // Extend Ffosbr library
  Ffosbr.media = new Media();
};
