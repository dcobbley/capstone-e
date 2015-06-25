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

  var options = {
    photos: true,
    videos: true,
    contacts: true,
    text: true,
    intervalTime: 24, // pass in value in hours
    id: 0,
    registeredTimer: false,
    repeat: true
  };

  // Load options if present
  (function() {
    var retrievedOptions = localStorage.getItem('ffosbrOptions');

    if (retrievedOptions !== null) {
      options = JSON.parse(retrievedOptions);
    }
  })();

  Settings.prototype.options = function(myDictionary) {
    if (!myDictionary) {
      return options;
    }

    if (myDictionary.photos !== undefined &&
      typeof myDictionary.photos === 'boolean') {
      options.photos = myDictionary.photos;
    }

    if (myDictionary.videos !== undefined &&
      typeof myDictionary.videos === 'boolean') {
      options.videos = myDictionary.videos;
    }

    if (myDictionary.contacts !== undefined &&
      typeof myDictionary.contacts === 'boolean') {
      options.contacts = myDictionary.contacts;
    }

    if (myDictionary.text !== undefined &&
      typeof myDictionary.text === 'boolean') {
      options.text = myDictionary.text;
    }

    if (myDictionary.id !== undefined &&
      typeof myDictionary.id === 'number') {
      options.id = myDictionary.id;
    }

    if (myDictionary.registeredTimer !== undefined &&
      typeof myDictionary.registeredTimer === 'boolean') {
      options.registeredTimer = myDictionary.registeredTimer;
    }

    if (myDictionary.repeat !== undefined &&
      typeof myDictionary.repeat === 'boolean') {
      options.repeat = myDictionary.repeat;
    }
    //////pass in the value in hours /////////
    if (myDictionary.intervalTime !== undefined &&
      typeof myDictionary.intervalTime === 'number') {
      options.intervalTime = myDictionary.intervalTime;
    }

    localStorage.setItem('ffosbrOptions', JSON.stringify(options));
    return options;
  };
}

module.exports = new Settings();

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICB2YXIgRmZvc2JyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvKiBJbXBvcnQgbW9kdWxlcyAqL1xuICAgIHRoaXMuc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG4gIH07XG5cbiAgd2luZG93LmZmb3NiciA9IG5ldyBGZm9zYnIoKTtcbn0pKCk7XG4iLCJmdW5jdGlvbiBTZXR0aW5ncygpIHtcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBwaG90b3M6IHRydWUsXG4gICAgdmlkZW9zOiB0cnVlLFxuICAgIGNvbnRhY3RzOiB0cnVlLFxuICAgIHRleHQ6IHRydWUsXG4gICAgaW50ZXJ2YWxUaW1lOiAyNCwgLy8gcGFzcyBpbiB2YWx1ZSBpbiBob3Vyc1xuICAgIGlkOiAwLFxuICAgIHJlZ2lzdGVyZWRUaW1lcjogZmFsc2UsXG4gICAgcmVwZWF0OiB0cnVlXG4gIH07XG5cbiAgLy8gTG9hZCBvcHRpb25zIGlmIHByZXNlbnRcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXRyaWV2ZWRPcHRpb25zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zmb3Nick9wdGlvbnMnKTtcblxuICAgIGlmIChyZXRyaWV2ZWRPcHRpb25zICE9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gSlNPTi5wYXJzZShyZXRyaWV2ZWRPcHRpb25zKTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgU2V0dGluZ3MucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihteURpY3Rpb25hcnkpIHtcbiAgICBpZiAoIW15RGljdGlvbmFyeSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgaWYgKG15RGljdGlvbmFyeS5waG90b3MgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG15RGljdGlvbmFyeS5waG90b3MgPT09ICdib29sZWFuJykge1xuICAgICAgb3B0aW9ucy5waG90b3MgPSBteURpY3Rpb25hcnkucGhvdG9zO1xuICAgIH1cblxuICAgIGlmIChteURpY3Rpb25hcnkudmlkZW9zICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHR5cGVvZiBteURpY3Rpb25hcnkudmlkZW9zID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG9wdGlvbnMudmlkZW9zID0gbXlEaWN0aW9uYXJ5LnZpZGVvcztcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LmNvbnRhY3RzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHR5cGVvZiBteURpY3Rpb25hcnkuY29udGFjdHMgPT09ICdib29sZWFuJykge1xuICAgICAgb3B0aW9ucy5jb250YWN0cyA9IG15RGljdGlvbmFyeS5jb250YWN0cztcbiAgICB9XG5cbiAgICBpZiAobXlEaWN0aW9uYXJ5LnRleHQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG15RGljdGlvbmFyeS50ZXh0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG9wdGlvbnMudGV4dCA9IG15RGljdGlvbmFyeS50ZXh0O1xuICAgIH1cblxuICAgIGlmIChteURpY3Rpb25hcnkuaWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG15RGljdGlvbmFyeS5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMuaWQgPSBteURpY3Rpb25hcnkuaWQ7XG4gICAgfVxuXG4gICAgaWYgKG15RGljdGlvbmFyeS5yZWdpc3RlcmVkVGltZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG15RGljdGlvbmFyeS5yZWdpc3RlcmVkVGltZXIgPT09ICdib29sZWFuJykge1xuICAgICAgb3B0aW9ucy5yZWdpc3RlcmVkVGltZXIgPSBteURpY3Rpb25hcnkucmVnaXN0ZXJlZFRpbWVyO1xuICAgIH1cblxuICAgIGlmIChteURpY3Rpb25hcnkucmVwZWF0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHR5cGVvZiBteURpY3Rpb25hcnkucmVwZWF0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG9wdGlvbnMucmVwZWF0ID0gbXlEaWN0aW9uYXJ5LnJlcGVhdDtcbiAgICB9XG4gICAgLy8vLy8vcGFzcyBpbiB0aGUgdmFsdWUgaW4gaG91cnMgLy8vLy8vLy8vXG4gICAgaWYgKG15RGljdGlvbmFyeS5pbnRlcnZhbFRpbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG15RGljdGlvbmFyeS5pbnRlcnZhbFRpbWUgPT09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLmludGVydmFsVGltZSA9IG15RGljdGlvbmFyeS5pbnRlcnZhbFRpbWU7XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zmb3Nick9wdGlvbnMnLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNldHRpbmdzKCk7XG4iXX0=
