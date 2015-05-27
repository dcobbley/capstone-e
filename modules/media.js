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


  // Extend Ffosbr library
  Ffosbr.media = new Media();
};
