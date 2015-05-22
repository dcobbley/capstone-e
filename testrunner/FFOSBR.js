(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(Ffosbr) {

  // contributors:
  //   KevinGrandon  https://github.com/KevinGrandon
  //   punamdahiya   https://github.com/punamdahiya
  // source:
  //   https://github.com/mozilla-b2g/gaia/blob/master/shared/js/device_storage/get_storage_if_available.js

  'use strict';

  // Get a DeviceStorage object for the specified kind of storage and, if it
  // is available, and if the specified number of bytes of storage space are
  // free then asynchronously pass the DeviceStorage object to the success
  // callback. Otherwise, invoke the error callback, if one is specified. If
  // the error callback is called because device storage is not available, the
  // argument will be a DeviceStorage status string like 'unavailable' or
  // 'shared'. If the error callback is called because there is not enough
  // storage space, the argument will be the number of bytes that are available.

  Ffosbr.prototype.getStorageIfAvailable = function(kind, size, success, error) {
    var storage = navigator.getDeviceStorage(kind);
    storage.available().onsuccess = function(e) {
      if (e.target.result !== 'available') {
        if (error) {
          error(e.target.result);
        }
      } else {
        storage.freeSpace().onsuccess = function(e) {
          if (e.target.result < size) {
            if (error) {
              error(e.target.result);
            }
          } else {
            success(storage);
          }
        };
      }
    };
  };
};

},{}],2:[function(require,module,exports){
(function() {

  function Ffsobr() {}

  /* Import modules */
  require('./getStorageIfAvailable')(Ffsobr);
  require('./writeTo.js');
  require('./square')(Ffsobr);

  window.ffosbr = new Ffsobr();
})();

},{"./getStorageIfAvailable":1,"./square":3,"./writeTo.js":4}],3:[function(require,module,exports){
module.exports = function(Ffosbr) {

  Ffosbr.prototype.square = function(num) {
    return num * num;
  };

};

},{}],4:[function(require,module,exports){
module.exports = function(Ffosbr) {

  'use strict';

  /**
   * Extend Ffosbr library to provide "write to external storage" functionality.
   * @param {string} target Specifies the destination of the data. (e.g. SD card)
   * @param {Blob|FileHandle} data Can be either raw data (e.g. file or blob?), or
   *     a function which produces raw data.
   * @param {requestCallback} success Provides callback for successful writes.
   * @param {requestCallback} error Provides callback for unsuccessful writes.
   */
  Ffosbr.prototype.writeTo = function(target, data, success, error) {

    // NOTE: data generators currently not supported

    try {

      if (typeof data === undefined) {
        throw new Error('Cannot write data type undefined.');
      }

      // TODO - get type of data (e.g. Blob, FileHandle, etc)

      // NOTE: just testing
      target = 'sdcard';

      // TODO - get size of data
      var size = 1000; // in Bytes? = 1 MB
      // TODO - get kind of data
      var kind = Blob; // ?

      var storage = getStorageIfAvailable();

    } catch (err) {
      console.error(err);
    }

  };
};

},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL2dldFN0b3JhZ2VJZkF2YWlsYWJsZS5qcyIsIm1vZHVsZXMvbWFpbi5qcyIsIm1vZHVsZXMvc3F1YXJlLmpzIiwibW9kdWxlcy93cml0ZVRvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEZmb3Nicikge1xuXG4gIC8vIGNvbnRyaWJ1dG9yczpcbiAgLy8gICBLZXZpbkdyYW5kb24gIGh0dHBzOi8vZ2l0aHViLmNvbS9LZXZpbkdyYW5kb25cbiAgLy8gICBwdW5hbWRhaGl5YSAgIGh0dHBzOi8vZ2l0aHViLmNvbS9wdW5hbWRhaGl5YVxuICAvLyBzb3VyY2U6XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEtYjJnL2dhaWEvYmxvYi9tYXN0ZXIvc2hhcmVkL2pzL2RldmljZV9zdG9yYWdlL2dldF9zdG9yYWdlX2lmX2F2YWlsYWJsZS5qc1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBHZXQgYSBEZXZpY2VTdG9yYWdlIG9iamVjdCBmb3IgdGhlIHNwZWNpZmllZCBraW5kIG9mIHN0b3JhZ2UgYW5kLCBpZiBpdFxuICAvLyBpcyBhdmFpbGFibGUsIGFuZCBpZiB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBieXRlcyBvZiBzdG9yYWdlIHNwYWNlIGFyZVxuICAvLyBmcmVlIHRoZW4gYXN5bmNocm9ub3VzbHkgcGFzcyB0aGUgRGV2aWNlU3RvcmFnZSBvYmplY3QgdG8gdGhlIHN1Y2Nlc3NcbiAgLy8gY2FsbGJhY2suIE90aGVyd2lzZSwgaW52b2tlIHRoZSBlcnJvciBjYWxsYmFjaywgaWYgb25lIGlzIHNwZWNpZmllZC4gSWZcbiAgLy8gdGhlIGVycm9yIGNhbGxiYWNrIGlzIGNhbGxlZCBiZWNhdXNlIGRldmljZSBzdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUsIHRoZVxuICAvLyBhcmd1bWVudCB3aWxsIGJlIGEgRGV2aWNlU3RvcmFnZSBzdGF0dXMgc3RyaW5nIGxpa2UgJ3VuYXZhaWxhYmxlJyBvclxuICAvLyAnc2hhcmVkJy4gSWYgdGhlIGVycm9yIGNhbGxiYWNrIGlzIGNhbGxlZCBiZWNhdXNlIHRoZXJlIGlzIG5vdCBlbm91Z2hcbiAgLy8gc3RvcmFnZSBzcGFjZSwgdGhlIGFyZ3VtZW50IHdpbGwgYmUgdGhlIG51bWJlciBvZiBieXRlcyB0aGF0IGFyZSBhdmFpbGFibGUuXG5cbiAgRmZvc2JyLnByb3RvdHlwZS5nZXRTdG9yYWdlSWZBdmFpbGFibGUgPSBmdW5jdGlvbihraW5kLCBzaXplLCBzdWNjZXNzLCBlcnJvcikge1xuICAgIHZhciBzdG9yYWdlID0gbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2Uoa2luZCk7XG4gICAgc3RvcmFnZS5hdmFpbGFibGUoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS50YXJnZXQucmVzdWx0ICE9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcihlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdG9yYWdlLmZyZWVTcGFjZSgpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQucmVzdWx0IDwgc2l6ZSkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIGVycm9yKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3Moc3RvcmFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH07XG59O1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gIGZ1bmN0aW9uIEZmc29icigpIHt9XG5cbiAgLyogSW1wb3J0IG1vZHVsZXMgKi9cbiAgcmVxdWlyZSgnLi9nZXRTdG9yYWdlSWZBdmFpbGFibGUnKShGZnNvYnIpO1xuICByZXF1aXJlKCcuL3dyaXRlVG8uanMnKTtcbiAgcmVxdWlyZSgnLi9zcXVhcmUnKShGZnNvYnIpO1xuXG4gIHdpbmRvdy5mZm9zYnIgPSBuZXcgRmZzb2JyKCk7XG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihGZm9zYnIpIHtcblxuICBGZm9zYnIucHJvdG90eXBlLnNxdWFyZSA9IGZ1bmN0aW9uKG51bSkge1xuICAgIHJldHVybiBudW0gKiBudW07XG4gIH07XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEZmb3Nicikge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogRXh0ZW5kIEZmb3NiciBsaWJyYXJ5IHRvIHByb3ZpZGUgXCJ3cml0ZSB0byBleHRlcm5hbCBzdG9yYWdlXCIgZnVuY3Rpb25hbGl0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCBTcGVjaWZpZXMgdGhlIGRlc3RpbmF0aW9uIG9mIHRoZSBkYXRhLiAoZS5nLiBTRCBjYXJkKVxuICAgKiBAcGFyYW0ge0Jsb2J8RmlsZUhhbmRsZX0gZGF0YSBDYW4gYmUgZWl0aGVyIHJhdyBkYXRhIChlLmcuIGZpbGUgb3IgYmxvYj8pLCBvclxuICAgKiAgICAgYSBmdW5jdGlvbiB3aGljaCBwcm9kdWNlcyByYXcgZGF0YS5cbiAgICogQHBhcmFtIHtyZXF1ZXN0Q2FsbGJhY2t9IHN1Y2Nlc3MgUHJvdmlkZXMgY2FsbGJhY2sgZm9yIHN1Y2Nlc3NmdWwgd3JpdGVzLlxuICAgKiBAcGFyYW0ge3JlcXVlc3RDYWxsYmFja30gZXJyb3IgUHJvdmlkZXMgY2FsbGJhY2sgZm9yIHVuc3VjY2Vzc2Z1bCB3cml0ZXMuXG4gICAqL1xuICBGZm9zYnIucHJvdG90eXBlLndyaXRlVG8gPSBmdW5jdGlvbih0YXJnZXQsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKSB7XG5cbiAgICAvLyBOT1RFOiBkYXRhIGdlbmVyYXRvcnMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcblxuICAgIHRyeSB7XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHdyaXRlIGRhdGEgdHlwZSB1bmRlZmluZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE8gLSBnZXQgdHlwZSBvZiBkYXRhIChlLmcuIEJsb2IsIEZpbGVIYW5kbGUsIGV0YylcblxuICAgICAgLy8gTk9URToganVzdCB0ZXN0aW5nXG4gICAgICB0YXJnZXQgPSAnc2RjYXJkJztcblxuICAgICAgLy8gVE9ETyAtIGdldCBzaXplIG9mIGRhdGFcbiAgICAgIHZhciBzaXplID0gMTAwMDsgLy8gaW4gQnl0ZXM/ID0gMSBNQlxuICAgICAgLy8gVE9ETyAtIGdldCBraW5kIG9mIGRhdGFcbiAgICAgIHZhciBraW5kID0gQmxvYjsgLy8gP1xuXG4gICAgICB2YXIgc3RvcmFnZSA9IGdldFN0b3JhZ2VJZkF2YWlsYWJsZSgpO1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuXG4gIH07XG59O1xuIl19
