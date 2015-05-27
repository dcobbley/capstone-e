(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

  function FFOSBR() {}

  /* Import modules */
  // require('./examples/square')(Ffsobr);

  require('./utils');
  require('./media');

  window.ffosbr = new Ffsobr();
})();

},{"./media":2,"./utils":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = function(Ffosbr) {


  /**
   * Kitchen sink for useful functions.
   */
  function Utilities() {}

  /**
   * @access public
   * @description Determines whether an object is a function.
   * @param {any} functionToCheck
   * @returns {boolean}
   */
  Utilities.prototype.isFunction = function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };


  // Extend Ffosbr library
  Ffosbr.utils = new Utilities();
};

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL21lZGlhLmpzIiwibW9kdWxlcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gIGZ1bmN0aW9uIEZGT1NCUigpIHt9XG5cbiAgLyogSW1wb3J0IG1vZHVsZXMgKi9cbiAgLy8gcmVxdWlyZSgnLi9leGFtcGxlcy9zcXVhcmUnKShGZnNvYnIpO1xuXG4gIHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgcmVxdWlyZSgnLi9tZWRpYScpO1xuXG4gIHdpbmRvdy5mZm9zYnIgPSBuZXcgRmZzb2JyKCk7XG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihGZm9zYnIpIHtcblxuXG4gIC8qKlxuICAgKiBNYW5hZ2VzIGludGVybmFsIGFuZCBleHRlcm5hbCBzdG9yYWdlcywgb3IgaGFuZGxlcyB0byBzdG9yYWdlXG4gICAqIGRldmljZXMsIGFuZCB0aGVpciB2YXJpb3VzIGRhdGEgc2V0cywgaW5jbHVkaW5nIGFwcHMsIG11c2ljLFxuICAgKiBwaWN0dXJlcywgc2RjYXJkLCBhbmQgdmlkZW9zLlxuICAgKi9cbiAgZnVuY3Rpb24gTWVkaWEoKSB7XG5cbiAgICAvLyBQdWJsaWMgZGF0YSBtZW1iZXJzXG5cbiAgICB0aGlzLmludGVybmFsID0ge1xuICAgICAgYXBwczogbnVsbCwgLy8ge0RldmljZVN0b3JhZ2V9IGludGVybmFsIGFwcHNcbiAgICAgIG11c2ljOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgbXVzaWNcbiAgICAgIHBpY3R1cmVzOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgcGljdHVyZXNcbiAgICAgIHNkY2FyZDogbnVsbCwgLy8ge0RldmljZVN0b3JhZ2V9IGludGVybmFsIFNEIGNhcmRcbiAgICAgIHZpZGVvczogbnVsbCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgdmlkZW9zXG4gICAgfTtcblxuICAgIHRoaXMuZXh0ZXJuYWwgPSB7XG4gICAgICBhcHBzOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gZXh0ZXJuYWwgYXBwc1xuICAgICAgbXVzaWM6IG51bGwsIC8vIHtEZXZpY2VTdG9yYWdlfSBleHRlcm5hbCBtdXNpY1xuICAgICAgcGljdHVyZXM6IG51bGwsIC8vIHtEZXZpY2VTdG9yYWdlfSBleHRlcm5hbCBwaWN0dXJlc1xuICAgICAgc2RjYXJkOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gZXh0ZXJuYWwgU0QgY2FyZFxuICAgICAgdmlkZW9zOiBudWxsIC8vIHtEZXZpY2VTdG9yYWdlfSBleHRlcm5hbCB2aWRlb3NcbiAgICB9O1xuXG5cbiAgICAvLyBQcml2YXRlIGRhdGEgbWVtYmVyc1xuXG4gICAgdmFyIGFwcFN0b3JlczsgLy8ge2FycmF5IG9mIERldmljZVN0b3JhZ2V9XG4gICAgdmFyIG11c2ljU3RvcmVzOyAvLyB7YXJyYXkgb2YgRGV2aWNlU3RvcmFnZX1cbiAgICB2YXIgcGljdHVyZXNTdG9yZXM7IC8vIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfVxuICAgIHZhciBzZGNhcmRTdG9yZXM7IC8vIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfVxuICAgIHZhciB2aWRlb3NTdG9yZXM7IC8vIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfVxuXG5cbiAgICAvLyBDb25zdHJ1Y3RvclxuXG4gICAgYXBwU3RvcmVzID0gbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2VzKCdhcHBzJyk7XG4gICAgbXVzaWNTdG9yZXMgPSBuYXZpZ2F0b3IuZ2V0RGV2aWNlU3RvcmFnZXMoJ211c2ljJyk7XG4gICAgcGljdHVyZXNTdG9yZXMgPSBuYXZpZ2F0b3IuZ2V0RGV2aWNlU3RvcmFnZXMoJ3BpY3R1cmVzJyk7XG4gICAgc2RjYXJkU3RvcmVzID0gbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2VzKCdzZGNhcmQnKTtcbiAgICB2aWRlb3NTdG9yZXMgPSBuYXZpZ2F0b3IuZ2V0RGV2aWNlU3RvcmFnZXMoJ3ZpZGVvJyk7XG5cbiAgICAvLyBpbml0aWFsaXplIGFwcCBzdG9yYWdlXG4gICAgdGhpcy5pbnRlcm5hbC5hcHBzID0gZ2V0SW50ZXJuYWxTdG9yYWdlKGFwcFN0b3Jlcyk7XG4gICAgdGhpcy5leHRlcm5hbC5hcHBzID0gZ2V0RXh0ZXJuYWxTdG9yYWdlKGFwcFN0b3Jlcyk7XG5cbiAgICAvLyBpbml0aWFsaXplIG11c2ljIHN0b3JhZ2VcbiAgICB0aGlzLmludGVybmFsLm11c2ljID0gZ2V0SW50ZXJuYWxTdG9yYWdlKG11c2ljU3RvcmVzKTtcbiAgICB0aGlzLmV4dGVybmFsLm11c2ljID0gZ2V0RXh0ZXJuYWxTdG9yYWdlKG11c2ljU3RvcmVzKTtcblxuICAgIC8vIGluaXRpYWxpemUgcGljdHVyZSBzdG9yYWdlXG4gICAgdGhpcy5pbnRlcm5hbC5waWN0dXJlcyA9IGdldEludGVybmFsU3RvcmFnZShwaWN0dXJlc1N0b3Jlcyk7XG4gICAgdGhpcy5leHRlcm5hbC5waWN0dXJlcyA9IGdldEV4dGVybmFsU3RvcmFnZShwaWN0dXJlc1N0b3Jlcyk7XG5cbiAgICAvLyBpbml0aWFsaXplIHNkY2FyZCBzdG9yYWdlXG4gICAgdGhpcy5pbnRlcm5hbC5zZGNhcmQgPSBnZXRJbnRlcm5hbFN0b3JhZ2Uoc2RjYXJkU3RvcmVzKTtcbiAgICB0aGlzLmV4dGVybmFsLnNkY2FyZCA9IGdldEV4dGVybmFsU3RvcmFnZShzZGNhcmRTdG9yZXMpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB2aWRlbyBzdG9yYWdlXG4gICAgdGhpcy5pbnRlcm5hbC52aWRlb3MgPSBnZXRJbnRlcm5hbFN0b3JhZ2UodmlkZW9zU3RvcmVzKTtcbiAgICB0aGlzLmV4dGVybmFsLnZpZGVvcyA9IGdldEV4dGVybmFsU3RvcmFnZSh2aWRlb3NTdG9yZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBkZXNjcmlwdGlvbiBUYWtlcyBhbiBhcnJheSBvZiBEZXZpY2VTdG9yYWdlIG9iamVjdHMgYW5kIHJldHVybnNcbiAgICogICB3aGljaGV2ZXIgcmVwcmVzZW50cyB0aGUgaW50ZXJuYWwgc3RvcmFnZS5cbiAgICogQHBhcmFtIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfSBzdG9yZXNcbiAgICogQHJldHVybnMge0RldmljZVN0b3JhZ2V9XG4gICAqL1xuICBNZWRpYS5wcm90b3R5cGUuZ2V0SW50ZXJuYWxTdG9yYWdlID0gZnVuY3Rpb24oc3RvcmVzKSB7XG5cbiAgICAvLyBUT0RPIC0gaWYgdGhlcmUgYXJlIG11bHRpcGxlIGludGVybmFsXG4gICAgLy8gc3RvcmFnZXMsIGRvIHdlIGp1c3QgdXNlIHRoZSBsYXJnZXN0P1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoc3RvcmVzW2ldLmlzUmVtb3ZhYmxlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gc3RvcmVzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBkZXNjcmlwdGlvbiBUYWtlcyBhbiBhcnJheSBvZiBEZXZpY2VTdG9yYWdlIG9iamVjdHMgYW5kIHJldHVybnNcbiAgICogICB3aGljaGV2ZXIgcmVwcmVzZW50cyB0aGUgZXh0ZXJuYWwgc3RvcmFnZS5cbiAgICogQHBhcmFtIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfSBzdG9yZXNcbiAgICogQHJldHVybnMge0RldmljZVN0b3JhZ2V9XG4gICAqL1xuICBNZWRpYS5wcm90b3R5cGUuZ2V0RXh0ZXJuYWxTdG9yYWdlID0gZnVuY3Rpb24oc3RvcmVzKSB7XG5cbiAgICAvLyBUT0RPIC0gaWYgdGhlcmUgYXJlIG11bHRpcGxlIGV4dGVybmFsXG4gICAgLy8gc3RvcmFnZXMsIGRvIHdlIGp1c3QgdXNlIHRoZSBsYXJnZXN0P1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoc3RvcmVzW2ldLmlzUmVtb3ZhYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZXNbaV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGRlc2NyaXB0aW9uIFRha2VzIGEgc3RyaW5nIGRlc2NyaWJpbmcgd2hpY2ggdHlwZSBvZiBzdG9yYWdlXG4gICAqICAgaXMgZGVzaXJlZC4gVmFsaWQgb3B0aW9ucyBhcmU6IGFwcHMsIG11c2ljLCBwaWN0dXJlcyxcbiAgICogICBzZGNhcmQsIHZpZGVvcy4gUmV0dXJucyBhbiBvcHRpb24gY29udGFpbmluZyB0aGUgYXBwcm9wcmlhdGVcbiAgICogICBpbnRlcm5hbCBhbmQgZXh0ZXJuYWwgc3RvcmFnZXMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdG9yYWdlQnlOYW1lKHR5cGUpIHtcblxuICAgIHZhciBzdG9yZXMgPSB7XG4gICAgICBpbnRlcm5hbDogbnVsbCxcbiAgICAgIGV4dGVybmFsOiBudWxsXG4gICAgfTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXBwcyc6XG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZXMuaW50ZXJuYWwgPSB0aGlzLmludGVybmFsLmFwcHM7XG4gICAgICAgICAgc3RvcmVzLmV4dGVybmFsID0gdGhpcy5leHRlcm5hbC5hcHBzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdtdXNpYyc6XG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZXMuaW50ZXJuYWwgPSB0aGlzLmludGVybmFsLm11c2ljO1xuICAgICAgICAgIHN0b3Jlcy5leHRlcm5hbCA9IHRoaXMuZXh0ZXJuYWwubXVzaWM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ3BpY3R1cmVzJzpcbiAgICAgICAge1xuICAgICAgICAgIHN0b3Jlcy5pbnRlcm5hbCA9IHRoaXMuaW50ZXJuYWwucGljdHVyZXM7XG4gICAgICAgICAgc3RvcmVzLmV4dGVybmFsID0gdGhpcy5leHRlcm5hbC5waWN0dXJlcztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSAnc2RjYXJkJzpcbiAgICAgICAge1xuICAgICAgICAgIHN0b3Jlcy5pbnRlcm5hbCA9IHRoaXMuaW50ZXJuYWwuc2RjYXJkO1xuICAgICAgICAgIHN0b3Jlcy5leHRlcm5hbCA9IHRoaXMuZXh0ZXJuYWwuc2RjYXJkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICd2aWRlb3MnOlxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVzLmludGVybmFsID0gdGhpcy5pbnRlcm5hbC52aWRlb3M7XG4gICAgICAgICAgc3RvcmVzLmV4dGVybmFsID0gdGhpcy5leHRlcm5hbC52aWRlb3M7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWVkaWEgdHlwZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3JlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAZGVzY3JpcHRpb24gRmV0Y2hlcyBmaWxlcyBmcm9tIGJvdGggaW50ZXJuYWwgYW5kIGV4dGVybmFsIHN0b3JhZ2VzXG4gICAqICAgdmlhIERPTVJlcXVlc3QuIFRoZSB0eXBlIG9mIGZpbGVzIGZldGNoIChlLmcuIHBpY3R1cmVzLCBtdXNpYykgaXNcbiAgICogICBzcGVjaWZpZWQgYnkgdGhlIHR5cGUgcGFyYW1ldGVyLiBFYWNoIGZpbGUgZmV0Y2hlZCB3aWxsIGJlIHBhc3NlZFxuICAgKiAgIHRvIHRoZSBwcm92aWRlZCBcImZvci1lYWNoXCIgaGFuZGxlciBhcyBhIEZpbGUgb2JqZWN0LlxuICAgKiAgIChOb3RlOiBGaWxlIGV4dGVuZHMgQmxvYilcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtjYWxsYmFja30gZm9yRWFjaFxuICAgKi9cbiAgTWVkaWEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHR5cGUsIGZvckVhY2gpIHtcblxuICAgIHZhciBpbnRlcm5hbCA9IG51bGw7XG4gICAgdmFyIGV4dGVybmFsID0gbnVsbDtcbiAgICB2YXIgaW50ZXJuYWxGaWxlcyA9IG51bGw7XG4gICAgdmFyIGV4dGVybmFsRmlsZXMgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZih0eXBlKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBvciBpbnZhbGlkIG1lZGlhIHR5cGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy5mZm9zYnIudXRpbHMuaXNGdW5jdGlvbihmb3JFYWNoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG9yIGludmFsaWQgY2FsbGJhY2snKTtcbiAgICB9XG5cbiAgICBpbnRlcm5hbCA9IGdldFN0b3JhZ2VCeU5hbWUodHlwZSkuaW50ZXJuYWw7XG4gICAgZXh0ZXJuYWwgPSBnZXRTdG9yYWdlQnlOYW1lKHR5cGUpLmV4dGVybmFsO1xuICAgIGludGVybmFsRmlsZXMgPSBpbnRlcm5hbC5lbnVtZXJhdGUoKTtcbiAgICBleHRlcm5hbEZpbGVzID0gZXh0ZXJuYWwuZW51bWVyYXRlKCk7XG5cbiAgICBpbnRlcm5hbEZpbGVzLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yRWFjaCh0aGlzLnJlc3VsdCk7XG4gICAgfTtcbiAgICBleHRlcm5hbEZpbGVzLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yRWFjaCh0aGlzLnJlc3VsdCk7XG4gICAgfTtcbiAgfTtcblxuXG4gIC8vIEV4dGVuZCBGZm9zYnIgbGlicmFyeVxuICBGZm9zYnIubWVkaWEgPSBuZXcgTWVkaWEoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEZmb3Nicikge1xuXG5cbiAgLyoqXG4gICAqIEtpdGNoZW4gc2luayBmb3IgdXNlZnVsIGZ1bmN0aW9ucy5cbiAgICovXG4gIGZ1bmN0aW9uIFV0aWxpdGllcygpIHt9XG5cbiAgLyoqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBkZXNjcmlwdGlvbiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gb2JqZWN0IGlzIGEgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7YW55fSBmdW5jdGlvblRvQ2hlY2tcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBVdGlsaXRpZXMucHJvdG90eXBlLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcbiAgICB2YXIgZ2V0VHlwZSA9IHt9O1xuICAgIHJldHVybiBmdW5jdGlvblRvQ2hlY2sgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG5cblxuICAvLyBFeHRlbmQgRmZvc2JyIGxpYnJhcnlcbiAgRmZvc2JyLnV0aWxzID0gbmV3IFV0aWxpdGllcygpO1xufTtcbiJdfQ==
