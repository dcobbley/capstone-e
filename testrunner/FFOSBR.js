(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

  var Ffosbr = function() {

    /* Import modules */
    this.settings = require('./settings');
  };

  window.ffosbr = new Ffosbr();
})();

},{"./settings":2}],2:[function(require,module,exports){
function Settings() {
  var timeInMilliSec = 0;

  var options = {
    photos: false,
    videos: false,
    contacts: false,
    text: false,
    intervalTime: 0, // pass in value in hours
    id: 0,
    registeredTimer: false,
    repeat: false
  };



  Settings.prototype.Options = function(myDictionary) {
    if (!myDictionary) {
      return options;
    }


    if (myDictionary.photos !== undefined && typeof myDictionary.photos === "boolean") {
      options.photos = myDictionary.photos;
    }

    if (myDictionary.videos !== undefined && typeof myDictionary.videos === "boolean") {
      options.videos = myDictionary.videos;
    }

    if (myDictionary.contacts !== undefined && typeof myDictionary.contacts === "boolean") {
      options.contacts = myDictionary.contacts;
    }

    if (myDictionary.text !== undefined && typeof myDictionary.text === "boolean") {
      options.text = myDictionary.text;
    }

    if (myDictionary.id !== undefined && typeof myDictionary.id === "number") {
      options.id = myDictionary.id;
    }

    if (myDictionary.registeredTimer !== undefined && typeof myDictionary.registeredTimer === "boolean") {
      options.registeredTimer = myDictionary.registeredTimer;
    }

    if (myDictionary.repeat !== undefined && typeof myDictionary.repeat === "boolean") {
      options.repeat = myDictionary.repeat;
    }
    //////pass in the value in hours /////////
    if (myDictionary.intervalTime !== undefined && typeof myDictionary.intervalTime === "number") {
      timeInMilliSec = myDictionary.intervalTime * 1000 * 60 * 60;
      options.intervalTime = timeInMilliSec;
    }


    return options;

  };

}
module.exports = new Settings();

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBGZm9zYnIgPSBmdW5jdGlvbigpIHtcblxuICAgIC8qIEltcG9ydCBtb2R1bGVzICovXG4gICAgdGhpcy5zZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbiAgfTtcblxuICB3aW5kb3cuZmZvc2JyID0gbmV3IEZmb3NicigpO1xufSkoKTtcbiIsImZ1bmN0aW9uIFNldHRpbmdzKCkge1xuICB2YXIgdGltZUluTWlsbGlTZWMgPSAwO1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHBob3RvczogZmFsc2UsXG4gICAgdmlkZW9zOiBmYWxzZSxcbiAgICBjb250YWN0czogZmFsc2UsXG4gICAgdGV4dDogZmFsc2UsXG4gICAgaW50ZXJ2YWxUaW1lOiAwLCAvLyBwYXNzIGluIHZhbHVlIGluIGhvdXJzXG4gICAgaWQ6IDAsXG4gICAgcmVnaXN0ZXJlZFRpbWVyOiBmYWxzZSxcbiAgICByZXBlYXQ6IGZhbHNlXG4gIH07XG5cblxuXG4gIFNldHRpbmdzLnByb3RvdHlwZS5PcHRpb25zID0gZnVuY3Rpb24obXlEaWN0aW9uYXJ5KSB7XG4gICAgaWYgKCFteURpY3Rpb25hcnkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuXG4gICAgaWYgKG15RGljdGlvbmFyeS5waG90b3MgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgbXlEaWN0aW9uYXJ5LnBob3RvcyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIG9wdGlvbnMucGhvdG9zID0gbXlEaWN0aW9uYXJ5LnBob3RvcztcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LnZpZGVvcyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBteURpY3Rpb25hcnkudmlkZW9zID09PSBcImJvb2xlYW5cIikge1xuICAgICAgb3B0aW9ucy52aWRlb3MgPSBteURpY3Rpb25hcnkudmlkZW9zO1xuICAgIH1cblxuICAgIGlmIChteURpY3Rpb25hcnkuY29udGFjdHMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgbXlEaWN0aW9uYXJ5LmNvbnRhY3RzID09PSBcImJvb2xlYW5cIikge1xuICAgICAgb3B0aW9ucy5jb250YWN0cyA9IG15RGljdGlvbmFyeS5jb250YWN0cztcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LnRleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgbXlEaWN0aW9uYXJ5LnRleHQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBvcHRpb25zLnRleHQgPSBteURpY3Rpb25hcnkudGV4dDtcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LmlkICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG15RGljdGlvbmFyeS5pZCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgb3B0aW9ucy5pZCA9IG15RGljdGlvbmFyeS5pZDtcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LnJlZ2lzdGVyZWRUaW1lciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBteURpY3Rpb25hcnkucmVnaXN0ZXJlZFRpbWVyID09PSBcImJvb2xlYW5cIikge1xuICAgICAgb3B0aW9ucy5yZWdpc3RlcmVkVGltZXIgPSBteURpY3Rpb25hcnkucmVnaXN0ZXJlZFRpbWVyO1xuICAgIH1cblxuICAgIGlmIChteURpY3Rpb25hcnkucmVwZWF0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG15RGljdGlvbmFyeS5yZXBlYXQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBvcHRpb25zLnJlcGVhdCA9IG15RGljdGlvbmFyeS5yZXBlYXQ7XG4gICAgfVxuICAgIC8vLy8vL3Bhc3MgaW4gdGhlIHZhbHVlIGluIGhvdXJzIC8vLy8vLy8vL1xuICAgIGlmIChteURpY3Rpb25hcnkuaW50ZXJ2YWxUaW1lICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG15RGljdGlvbmFyeS5pbnRlcnZhbFRpbWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRpbWVJbk1pbGxpU2VjID0gbXlEaWN0aW9uYXJ5LmludGVydmFsVGltZSAqIDEwMDAgKiA2MCAqIDYwO1xuICAgICAgb3B0aW9ucy5pbnRlcnZhbFRpbWUgPSB0aW1lSW5NaWxsaVNlYztcbiAgICB9XG5cblxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIH07XG5cbn1cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNldHRpbmdzKCk7XG4iXX0=
