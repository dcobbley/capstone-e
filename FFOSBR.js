(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

  function FFOSBR() {}

  /* Import modules */
  require('./settings')(FFOSBR);
  require('./square')(FFOSBR);

  window.ffosbr = new FFOSBR();
})();

},{"./settings":2,"./square":3}],2:[function(require,module,exports){
 module.exports = function(Ffosbr) {

   var timeInMilliSec = 0;

   {
     options = {
       'photos': false,
       'videos': false,
       'contacts': false,
       'text': false,
       'intervalTime': null, // pass in value in hours
       'id': null,
       'registeredTimer': false,
       'repeat': false
     };
   }


   Ffosbr.prototype.Options = function(my_dictionary) {
     for (var key in my_dictionary) {
       if (key == 'photos') {
         options.photos = my_dictionary.photos;
       }
       if (key == 'videos') {
         options.videos = my_dictionary.videos;
       }
       if (key == 'contacts') {
         options.contacts = my_dictionary.contacts;
       }
       if (key == 'text') {
         options.text = my_dictionary.text;
       }
       if (key == 'id') {
         options.id = my_dictionary.id;
       }
       if (key == 'registeredTimer') {
         options.registeredTimer = my_dictionary.registeredTimer;
       }
       if (key == 'repeat') {
         options.repeat = my_dictionary.repeat;
       }

       //////pass in the value in hours /////////
       if (key == 'intervalTime') {
         timeInMilliSec = my_dictionary.intervalTime * 1000 * 60 * 60;
         options.intervalTime = timeInMilliSec;
       }

     }
     return options;

   };

   //Ffosbr.settings = new Settings();
 };

},{}],3:[function(require,module,exports){
module.exports = function(Ffosbr) {


  Ffosbr.prototype.square = function(num) {
    return num * num;
  };

};

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL3NldHRpbmdzLmpzIiwibW9kdWxlcy9zcXVhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgZnVuY3Rpb24gRkZPU0JSKCkge31cblxuICAvKiBJbXBvcnQgbW9kdWxlcyAqL1xuICByZXF1aXJlKCcuL3NldHRpbmdzJykoRkZPU0JSKTtcbiAgcmVxdWlyZSgnLi9zcXVhcmUnKShGRk9TQlIpO1xuXG4gIHdpbmRvdy5mZm9zYnIgPSBuZXcgRkZPU0JSKCk7XG59KSgpO1xuIiwiIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oRmZvc2JyKSB7XG5cbiAgIHZhciB0aW1lSW5NaWxsaVNlYyA9IDA7XG5cbiAgIHtcbiAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAncGhvdG9zJzogZmFsc2UsXG4gICAgICAgJ3ZpZGVvcyc6IGZhbHNlLFxuICAgICAgICdjb250YWN0cyc6IGZhbHNlLFxuICAgICAgICd0ZXh0JzogZmFsc2UsXG4gICAgICAgJ2ludGVydmFsVGltZSc6IG51bGwsIC8vIHBhc3MgaW4gdmFsdWUgaW4gaG91cnNcbiAgICAgICAnaWQnOiBudWxsLFxuICAgICAgICdyZWdpc3RlcmVkVGltZXInOiBmYWxzZSxcbiAgICAgICAncmVwZWF0JzogZmFsc2VcbiAgICAgfTtcbiAgIH1cblxuXG4gICBGZm9zYnIucHJvdG90eXBlLk9wdGlvbnMgPSBmdW5jdGlvbihteV9kaWN0aW9uYXJ5KSB7XG4gICAgIGZvciAodmFyIGtleSBpbiBteV9kaWN0aW9uYXJ5KSB7XG4gICAgICAgaWYgKGtleSA9PSAncGhvdG9zJykge1xuICAgICAgICAgb3B0aW9ucy5waG90b3MgPSBteV9kaWN0aW9uYXJ5LnBob3RvcztcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAndmlkZW9zJykge1xuICAgICAgICAgb3B0aW9ucy52aWRlb3MgPSBteV9kaWN0aW9uYXJ5LnZpZGVvcztcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAnY29udGFjdHMnKSB7XG4gICAgICAgICBvcHRpb25zLmNvbnRhY3RzID0gbXlfZGljdGlvbmFyeS5jb250YWN0cztcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAndGV4dCcpIHtcbiAgICAgICAgIG9wdGlvbnMudGV4dCA9IG15X2RpY3Rpb25hcnkudGV4dDtcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAnaWQnKSB7XG4gICAgICAgICBvcHRpb25zLmlkID0gbXlfZGljdGlvbmFyeS5pZDtcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAncmVnaXN0ZXJlZFRpbWVyJykge1xuICAgICAgICAgb3B0aW9ucy5yZWdpc3RlcmVkVGltZXIgPSBteV9kaWN0aW9uYXJ5LnJlZ2lzdGVyZWRUaW1lcjtcbiAgICAgICB9XG4gICAgICAgaWYgKGtleSA9PSAncmVwZWF0Jykge1xuICAgICAgICAgb3B0aW9ucy5yZXBlYXQgPSBteV9kaWN0aW9uYXJ5LnJlcGVhdDtcbiAgICAgICB9XG5cbiAgICAgICAvLy8vLy9wYXNzIGluIHRoZSB2YWx1ZSBpbiBob3VycyAvLy8vLy8vLy9cbiAgICAgICBpZiAoa2V5ID09ICdpbnRlcnZhbFRpbWUnKSB7XG4gICAgICAgICB0aW1lSW5NaWxsaVNlYyA9IG15X2RpY3Rpb25hcnkuaW50ZXJ2YWxUaW1lICogMTAwMCAqIDYwICogNjA7XG4gICAgICAgICBvcHRpb25zLmludGVydmFsVGltZSA9IHRpbWVJbk1pbGxpU2VjO1xuICAgICAgIH1cblxuICAgICB9XG4gICAgIHJldHVybiBvcHRpb25zO1xuXG4gICB9O1xuXG4gICAvL0Zmb3Nici5zZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpO1xuIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEZmb3Nicikge1xuXG5cbiAgRmZvc2JyLnByb3RvdHlwZS5zcXVhcmUgPSBmdW5jdGlvbihudW0pIHtcbiAgICByZXR1cm4gbnVtICogbnVtO1xuICB9O1xuXG59O1xuIl19
