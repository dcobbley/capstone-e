(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

  function Ffsobr() {}


  // require('./examples/square')(Ffsobr);

  window.ffosbr = new Ffsobr();
})();

},{}],2:[function(require,module,exports){
module.exports = function(Ffosbr) {


  /**
   * TODO -- describe module
   */
  function Media() {


    // Private member functions

    /**
     * @access private
     * @description Takes an array of DeviceStorage objects and returns
     *   whichever represents the internal storage.
     * @param {array of DeviceStorage} stores
     * @returns {DeviceStorage}
     */
    function getInternalStorage(stores) {
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
     * @param {array of DeviceStorage} stores
     * @returns {DeviceStorage}
     */
    function getExternalStorage(stores) {
      for (var i = 0; i < stores.length; ++i) {
        if (stores[i].isRemovable === true) {
          return stores[i];
        }
      }
    }


    // Public data members

    this.internal = {
      sdcard: null, // {DeviceStorage} internal SD card
      music: null, // {DeviceStorage} internal music
      pictures: null, // {DeviceStorage} internal pictures
      videos: null // {DeviceStorage} internal videos
    };

    this.external = {
      sdcard: null, // {DeviceStorage} external SD card
      music: null, // {DeviceStorage} external music
      pictures: null, // {DeviceStorage} external pictures
      videos: null // {DeviceStorage} external videos
    };


    // Private data members

    var sdcardStores; // {array of DeviceStorage}
    var musicStores; // {array of DeviceStorage}
    var picturesStores; // {array of DeviceStorage}
    var videosStores; // {array of DeviceStorage}


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
   * @param {callback} forEach
   */
  Media.prototype.getPhotos = function(forEach) {
    // TODO
  };


  // Extend Ffosbr library
  Ffosbr.media = new Media();
};

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL21lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgZnVuY3Rpb24gRmZzb2JyKCkge31cblxuXG4gIC8vIHJlcXVpcmUoJy4vZXhhbXBsZXMvc3F1YXJlJykoRmZzb2JyKTtcblxuICB3aW5kb3cuZmZvc2JyID0gbmV3IEZmc29icigpO1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oRmZvc2JyKSB7XG5cblxuICAvKipcbiAgICogVE9ETyAtLSBkZXNjcmliZSBtb2R1bGVcbiAgICovXG4gIGZ1bmN0aW9uIE1lZGlhKCkge1xuXG5cbiAgICAvLyBQcml2YXRlIG1lbWJlciBmdW5jdGlvbnNcblxuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqIEBkZXNjcmlwdGlvbiBUYWtlcyBhbiBhcnJheSBvZiBEZXZpY2VTdG9yYWdlIG9iamVjdHMgYW5kIHJldHVybnNcbiAgICAgKiAgIHdoaWNoZXZlciByZXByZXNlbnRzIHRoZSBpbnRlcm5hbCBzdG9yYWdlLlxuICAgICAqIEBwYXJhbSB7YXJyYXkgb2YgRGV2aWNlU3RvcmFnZX0gc3RvcmVzXG4gICAgICogQHJldHVybnMge0RldmljZVN0b3JhZ2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0SW50ZXJuYWxTdG9yYWdlKHN0b3Jlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHN0b3Jlc1tpXS5pc1JlbW92YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gc3RvcmVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICogQGRlc2NyaXB0aW9uIFRha2VzIGFuIGFycmF5IG9mIERldmljZVN0b3JhZ2Ugb2JqZWN0cyBhbmQgcmV0dXJuc1xuICAgICAqICAgd2hpY2hldmVyIHJlcHJlc2VudHMgdGhlIGV4dGVybmFsIHN0b3JhZ2UuXG4gICAgICogQHBhcmFtIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfSBzdG9yZXNcbiAgICAgKiBAcmV0dXJucyB7RGV2aWNlU3RvcmFnZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRFeHRlcm5hbFN0b3JhZ2Uoc3RvcmVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3Jlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoc3RvcmVzW2ldLmlzUmVtb3ZhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHN0b3Jlc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gUHVibGljIGRhdGEgbWVtYmVyc1xuXG4gICAgdGhpcy5pbnRlcm5hbCA9IHtcbiAgICAgIHNkY2FyZDogbnVsbCwgLy8ge0RldmljZVN0b3JhZ2V9IGludGVybmFsIFNEIGNhcmRcbiAgICAgIG11c2ljOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgbXVzaWNcbiAgICAgIHBpY3R1cmVzOiBudWxsLCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgcGljdHVyZXNcbiAgICAgIHZpZGVvczogbnVsbCAvLyB7RGV2aWNlU3RvcmFnZX0gaW50ZXJuYWwgdmlkZW9zXG4gICAgfTtcblxuICAgIHRoaXMuZXh0ZXJuYWwgPSB7XG4gICAgICBzZGNhcmQ6IG51bGwsIC8vIHtEZXZpY2VTdG9yYWdlfSBleHRlcm5hbCBTRCBjYXJkXG4gICAgICBtdXNpYzogbnVsbCwgLy8ge0RldmljZVN0b3JhZ2V9IGV4dGVybmFsIG11c2ljXG4gICAgICBwaWN0dXJlczogbnVsbCwgLy8ge0RldmljZVN0b3JhZ2V9IGV4dGVybmFsIHBpY3R1cmVzXG4gICAgICB2aWRlb3M6IG51bGwgLy8ge0RldmljZVN0b3JhZ2V9IGV4dGVybmFsIHZpZGVvc1xuICAgIH07XG5cblxuICAgIC8vIFByaXZhdGUgZGF0YSBtZW1iZXJzXG5cbiAgICB2YXIgc2RjYXJkU3RvcmVzOyAvLyB7YXJyYXkgb2YgRGV2aWNlU3RvcmFnZX1cbiAgICB2YXIgbXVzaWNTdG9yZXM7IC8vIHthcnJheSBvZiBEZXZpY2VTdG9yYWdlfVxuICAgIHZhciBwaWN0dXJlc1N0b3JlczsgLy8ge2FycmF5IG9mIERldmljZVN0b3JhZ2V9XG4gICAgdmFyIHZpZGVvc1N0b3JlczsgLy8ge2FycmF5IG9mIERldmljZVN0b3JhZ2V9XG5cblxuICAgIC8vIENvbnN0cnVjdG9yXG5cbiAgICBzZGNhcmRTdG9yZXMgPSBuYXZpZ2F0b3IuZ2V0RGV2aWNlU3RvcmFnZXMoJ3NkY2FyZCcpO1xuICAgIG11c2ljU3RvcmVzID0gbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2VzKCdtdXNpYycpO1xuICAgIHBpY3R1cmVzU3RvcmVzID0gbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2VzKCdwaWN0dXJlcycpO1xuICAgIHZpZGVvc1N0b3JlcyA9IG5hdmlnYXRvci5nZXREZXZpY2VTdG9yYWdlcygndmlkZW8nKTtcblxuICAgIC8vIGluaXRpYWxpemUgc2RjYXJkIHN0b3JhZ2VcbiAgICB0aGlzLmludGVybmFsLnNkY2FyZCA9IGdldEludGVybmFsU3RvcmFnZShzZGNhcmRTdG9yZXMpO1xuICAgIHRoaXMuZXh0ZXJuYWwuc2RjYXJkID0gZ2V0RXh0ZXJuYWxTdG9yYWdlKHNkY2FyZFN0b3Jlcyk7XG5cbiAgICAvLyBpbml0aWFsaXplIG11c2ljIHN0b3JhZ2VcbiAgICB0aGlzLmludGVybmFsLm11c2ljID0gZ2V0SW50ZXJuYWxTdG9yYWdlKG11c2ljU3RvcmVzKTtcbiAgICB0aGlzLmV4dGVybmFsLm11c2ljID0gZ2V0RXh0ZXJuYWxTdG9yYWdlKG11c2ljU3RvcmVzKTtcblxuICAgIC8vIGluaXRpYWxpemUgcGljdHVyZSBzdG9yYWdlXG4gICAgdGhpcy5pbnRlcm5hbC5waWN0dXJlcyA9IGdldEludGVybmFsU3RvcmFnZShwaWN0dXJlc1N0b3Jlcyk7XG4gICAgdGhpcy5leHRlcm5hbC5waWN0dXJlcyA9IGdldEV4dGVybmFsU3RvcmFnZShwaWN0dXJlc1N0b3Jlcyk7XG5cbiAgICAvLyBpbml0aWFsaXplIHZpZGVvIHN0b3JhZ2VcbiAgICB0aGlzLmludGVybmFsLnZpZGVvcyA9IGdldEludGVybmFsU3RvcmFnZSh2aWRlb3NTdG9yZXMpO1xuICAgIHRoaXMuZXh0ZXJuYWwudmlkZW9zID0gZ2V0RXh0ZXJuYWxTdG9yYWdlKHZpZGVvc1N0b3Jlcyk7XG4gIH1cblxuXG4gIC8vIFB1YmxpYyBtZW1iZXIgZnVuY3Rpb25zXG5cbiAgLyoqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBkZXNjcmlwdGlvbiBGZXRjaGVzIHBob3RvcyBmcm9tIGJvdGggaW50ZXJuYWwgYW5kIGV4dGVybmFsIHN0b3JhZ2VzXG4gICAqICAgdmlhIERPTVJlcXVlc3QuIEVhY2ggcGhvdG8gZmV0Y2hlZCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgcHJvdmlkZWRcbiAgICogICBcImZvci1lYWNoXCIgaGFuZGxlci5cbiAgICogQHBhcmFtIHtjYWxsYmFja30gZm9yRWFjaFxuICAgKi9cbiAgTWVkaWEucHJvdG90eXBlLmdldFBob3RvcyA9IGZ1bmN0aW9uKGZvckVhY2gpIHtcbiAgICAvLyBUT0RPXG4gIH07XG5cblxuICAvLyBFeHRlbmQgRmZvc2JyIGxpYnJhcnlcbiAgRmZvc2JyLm1lZGlhID0gbmV3IE1lZGlhKCk7XG59O1xuIl19
