module.exports = function (Ffosbr) {


  /**
   * TODO -- describe module
  */
  function Media () {


    // Private member functions

    /**
     * @access private
     * @description Takes an array of DeviceStorage objects and returns
     *   whichever represents the internal storage.
     * @param stores {array of DeviceStorage}
     * @returns {DeviceStorage}
    */
    function getInternalStorage (stores) {
      for (var i = 0; i < stores.length; ++i) {
        if (stores[i].isRemovable === false) {
          return stores[i];
        }
      }
    }

    /**
     * @access private
     * @description Takes an array of DeviceStorage objects and returns
     *   whichever represents the external storage.
     * @param stores {array of DeviceStorage}
     * @returns {DeviceStorage}
    */
    function getExternalStorage (stores) {
      for (var i = 0; i < stores.length; ++i) {
        if (stores[i].isRemovable === true) {
          return stores[i];
        }
      }
    }


    // Public data members

    this.internal = {
      sdcard:   null,  // {DeviceStorage} internal SD card
      music:    null,  // {DeviceStorage} internal music
      pictures: null,  // {DeviceStorage} internal pictures
      videos:   null   // {DeviceStorage} internal videos
    };

    this.external = {
      sdcard:   null,  // {DeviceStorage} external SD card
      music:    null,  // {DeviceStorage} external music
      pictures: null,  // {DeviceStorage} external pictures
      videos:   null   // {DeviceStorage} external videos
    };


    // Private data members

    var sdcardStores;    // {array of DeviceStorage}
    var musicStores;     // {array of DeviceStorage}
    var picturesStores;  // {array of DeviceStorage}
    var videosStores;    // {array of DeviceStorage}


    // Constructor

    sdcardStores = navigator.getDeviceStorages('sdcard');
    musicStores = navigator.getDeviceStorages('music');
    picturesStores = navigator.getDeviceStorages('pictures');
    videosStores = navigator.getDeviceStorages('video');

    // initialize sdcard storage
    this.internal.sdcard = getInternalStorage(sdcardStores);
    this.external.sdcard = getExternalStorage(sdcardStores);

    // initialize music storage
    this.internal.music = getInternalStorage(musicStores);
    this.external.music = getExternalStorage(musicStores);

    // initialize picture storage
    this.internal.pictures = getInternalStorage(picturesStores);
    this.external.pictures = getExternalStorage(picturesStores);

    // initialize video storage
    this.internal.videos = getInternalStorage(videosStores);
    this.external.videos = getExternalStorage(videosStores);
	}


  // Public member functions

  /**
   * @access public
   * @description Fetches photos from both internal and external storages
   *   via DOMRequest. Each photo fetched will be passed to the provided
   *   "for-each" handler.
   * @param forEach {callback}
  */
  Media.prototype.getPhotos = function(forEach) {
    // TODO
  };


  // Extend Ffosbr library
	Ffosbr.media = new Media();
}