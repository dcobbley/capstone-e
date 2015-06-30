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

  this.options = {
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
  var retrievedOptions = localStorage.getItem('ffosbrOptions');

  if (retrievedOptions !== null) {
    this.options = JSON.parse(retrievedOptions);
  }
}

Settings.prototype.validate = function(potentialOptions, value) {

  var valid = true;
  var opts = null;
  var validTypes = {
    photos: 'boolean',
    videos: 'boolean',
    contacts: 'boolean',
    text: 'boolean',
    intervalTime: 'number',
    id: 'number',
    registeredTimer: 'boolean',
    repeat: 'boolean'
  };

  if (typeof potentialOptions === 'object') {
    opts = potentialOptions; // validate parameter object
  } else if (typeof potentialOptions === 'string') {
    opts = {}; // single field check
    if (typeof value === 'undefined') {
      opts[potentialOptions] = this.options[potentialOptions];
    } else {
      opts[potentialOptions] = value;
    }
  } else if (typeof potentialOptions === 'undefined') {
    opts = this.options; // validate current options
  } else {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid validate parameter', field);
  }

  // Support partial validation
  for (var field in opts) {
    if (typeof this.options[field] === 'undefined') {
      // TODO - replace with ErrorHandler module
      console.log('Unrecognized settings option', field);
      valid = false;
    } else if (typeof opts[field] !== validTypes[field]) {
      // TODO - replace with ErrorHandler module
      console.log('Invalid type for settings option', field);


      // alert(field + ': ' + typeof opts[field] + ' vs ' + typeof validTypes[field]); //rmv


      valid = false;
    }
  }

  return valid;
};

Settings.prototype.set = function(newOptions) {

  if (typeof newOptions === 'undefined') {
    return;
  } else if (typeof newOptions !== 'object') {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid config object', newOptions);
  }

  if (this.validate('photos', newOptions.photos)) {
    this.options.photos = newOptions.photos;
  }

  if (this.validate('videos', newOptions.videos)) {
    this.options.videos = newOptions.videos;
  }

  if (this.validate('contacts', newOptions.contacts)) {
    this.options.contacts = newOptions.contacts;
  }

  if (this.validate('text', newOptions.text)) {
    this.options.text = newOptions.text;
  }

  if (this.validate('id', newOptions.id)) {
    this.options.id = newOptions.id;
  }

  if (this.validate('registeredTimer', newOptions.registeredTimer)) {
    this.options.registeredTimer = newOptions.registeredTimer;
  }

  if (this.validate('repeat', newOptions.repeat)) {
    this.options.repeat = newOptions.repeat;
  }

  //////pass in the value in hours /////////
  if (this.validate('intervalTime', newOptions.intervalTime)) {
    this.options.intervalTime = newOptions.intervalTime;
  }

  localStorage.setItem('ffosbrOptions', JSON.stringify(this.options));
};

Settings.prototype.get = function(field) {

  if (typeof field === 'undefined') {
    return this.options;
  } else if (typeof field !== 'string') {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid settings field', newOptions);
  }

  return this.options[field];
};

module.exports = new Settings();

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBGZm9zYnIgPSBmdW5jdGlvbigpIHtcblxuICAgIC8qIEltcG9ydCBtb2R1bGVzICovXG4gICAgdGhpcy5zZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbiAgfTtcblxuICB3aW5kb3cuZmZvc2JyID0gbmV3IEZmb3NicigpO1xufSkoKTtcbiIsImZ1bmN0aW9uIFNldHRpbmdzKCkge1xuXG4gIHRoaXMub3B0aW9ucyA9IHtcbiAgICBwaG90b3M6IHRydWUsXG4gICAgdmlkZW9zOiB0cnVlLFxuICAgIGNvbnRhY3RzOiB0cnVlLFxuICAgIHRleHQ6IHRydWUsXG4gICAgaW50ZXJ2YWxUaW1lOiAyNCwgLy8gcGFzcyBpbiB2YWx1ZSBpbiBob3Vyc1xuICAgIGlkOiAwLFxuICAgIHJlZ2lzdGVyZWRUaW1lcjogZmFsc2UsXG4gICAgcmVwZWF0OiB0cnVlXG4gIH07XG5cbiAgLy8gTG9hZCBvcHRpb25zIGlmIHByZXNlbnRcbiAgdmFyIHJldHJpZXZlZE9wdGlvbnMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmZvc2JyT3B0aW9ucycpO1xuXG4gIGlmIChyZXRyaWV2ZWRPcHRpb25zICE9PSBudWxsKSB7XG4gICAgdGhpcy5vcHRpb25zID0gSlNPTi5wYXJzZShyZXRyaWV2ZWRPcHRpb25zKTtcbiAgfVxufVxuXG5TZXR0aW5ncy5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbihwb3RlbnRpYWxPcHRpb25zLCB2YWx1ZSkge1xuXG4gIHZhciB2YWxpZCA9IHRydWU7XG4gIHZhciBvcHRzID0gbnVsbDtcbiAgdmFyIHZhbGlkVHlwZXMgPSB7XG4gICAgcGhvdG9zOiAnYm9vbGVhbicsXG4gICAgdmlkZW9zOiAnYm9vbGVhbicsXG4gICAgY29udGFjdHM6ICdib29sZWFuJyxcbiAgICB0ZXh0OiAnYm9vbGVhbicsXG4gICAgaW50ZXJ2YWxUaW1lOiAnbnVtYmVyJyxcbiAgICBpZDogJ251bWJlcicsXG4gICAgcmVnaXN0ZXJlZFRpbWVyOiAnYm9vbGVhbicsXG4gICAgcmVwZWF0OiAnYm9vbGVhbidcbiAgfTtcblxuICBpZiAodHlwZW9mIHBvdGVudGlhbE9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHBvdGVudGlhbE9wdGlvbnM7IC8vIHZhbGlkYXRlIHBhcmFtZXRlciBvYmplY3RcbiAgfSBlbHNlIGlmICh0eXBlb2YgcG90ZW50aWFsT3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRzID0ge307IC8vIHNpbmdsZSBmaWVsZCBjaGVja1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBvcHRzW3BvdGVudGlhbE9wdGlvbnNdID0gdGhpcy5vcHRpb25zW3BvdGVudGlhbE9wdGlvbnNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzW3BvdGVudGlhbE9wdGlvbnNdID0gdmFsdWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBwb3RlbnRpYWxPcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdHMgPSB0aGlzLm9wdGlvbnM7IC8vIHZhbGlkYXRlIGN1cnJlbnQgb3B0aW9uc1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE8gLSByZXBsYWNlIHdpdGggRXJyb3JIYW5kbGVyIG1vZHVsZVxuICAgIHJldHVybiBjb25zb2xlLmxvZygnSW52YWxpZCB2YWxpZGF0ZSBwYXJhbWV0ZXInLCBmaWVsZCk7XG4gIH1cblxuICAvLyBTdXBwb3J0IHBhcnRpYWwgdmFsaWRhdGlvblxuICBmb3IgKHZhciBmaWVsZCBpbiBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnNbZmllbGRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVE9ETyAtIHJlcGxhY2Ugd2l0aCBFcnJvckhhbmRsZXIgbW9kdWxlXG4gICAgICBjb25zb2xlLmxvZygnVW5yZWNvZ25pemVkIHNldHRpbmdzIG9wdGlvbicsIGZpZWxkKTtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0c1tmaWVsZF0gIT09IHZhbGlkVHlwZXNbZmllbGRdKSB7XG4gICAgICAvLyBUT0RPIC0gcmVwbGFjZSB3aXRoIEVycm9ySGFuZGxlciBtb2R1bGVcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHR5cGUgZm9yIHNldHRpbmdzIG9wdGlvbicsIGZpZWxkKTtcblxuXG4gICAgICAvLyBhbGVydChmaWVsZCArICc6ICcgKyB0eXBlb2Ygb3B0c1tmaWVsZF0gKyAnIHZzICcgKyB0eXBlb2YgdmFsaWRUeXBlc1tmaWVsZF0pOyAvL3JtdlxuXG5cbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbGlkO1xufTtcblxuU2V0dGluZ3MucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5ld09wdGlvbnMpIHtcblxuICBpZiAodHlwZW9mIG5ld09wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdPcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIC8vIFRPRE8gLSByZXBsYWNlIHdpdGggRXJyb3JIYW5kbGVyIG1vZHVsZVxuICAgIHJldHVybiBjb25zb2xlLmxvZygnSW52YWxpZCBjb25maWcgb2JqZWN0JywgbmV3T3B0aW9ucyk7XG4gIH1cblxuICBpZiAodGhpcy52YWxpZGF0ZSgncGhvdG9zJywgbmV3T3B0aW9ucy5waG90b3MpKSB7XG4gICAgdGhpcy5vcHRpb25zLnBob3RvcyA9IG5ld09wdGlvbnMucGhvdG9zO1xuICB9XG5cbiAgaWYgKHRoaXMudmFsaWRhdGUoJ3ZpZGVvcycsIG5ld09wdGlvbnMudmlkZW9zKSkge1xuICAgIHRoaXMub3B0aW9ucy52aWRlb3MgPSBuZXdPcHRpb25zLnZpZGVvcztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbGlkYXRlKCdjb250YWN0cycsIG5ld09wdGlvbnMuY29udGFjdHMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmNvbnRhY3RzID0gbmV3T3B0aW9ucy5jb250YWN0cztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbGlkYXRlKCd0ZXh0JywgbmV3T3B0aW9ucy50ZXh0KSkge1xuICAgIHRoaXMub3B0aW9ucy50ZXh0ID0gbmV3T3B0aW9ucy50ZXh0O1xuICB9XG5cbiAgaWYgKHRoaXMudmFsaWRhdGUoJ2lkJywgbmV3T3B0aW9ucy5pZCkpIHtcbiAgICB0aGlzLm9wdGlvbnMuaWQgPSBuZXdPcHRpb25zLmlkO1xuICB9XG5cbiAgaWYgKHRoaXMudmFsaWRhdGUoJ3JlZ2lzdGVyZWRUaW1lcicsIG5ld09wdGlvbnMucmVnaXN0ZXJlZFRpbWVyKSkge1xuICAgIHRoaXMub3B0aW9ucy5yZWdpc3RlcmVkVGltZXIgPSBuZXdPcHRpb25zLnJlZ2lzdGVyZWRUaW1lcjtcbiAgfVxuXG4gIGlmICh0aGlzLnZhbGlkYXRlKCdyZXBlYXQnLCBuZXdPcHRpb25zLnJlcGVhdCkpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVwZWF0ID0gbmV3T3B0aW9ucy5yZXBlYXQ7XG4gIH1cblxuICAvLy8vLy9wYXNzIGluIHRoZSB2YWx1ZSBpbiBob3VycyAvLy8vLy8vLy9cbiAgaWYgKHRoaXMudmFsaWRhdGUoJ2ludGVydmFsVGltZScsIG5ld09wdGlvbnMuaW50ZXJ2YWxUaW1lKSkge1xuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbFRpbWUgPSBuZXdPcHRpb25zLmludGVydmFsVGltZTtcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmZm9zYnJPcHRpb25zJywgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zKSk7XG59O1xuXG5TZXR0aW5ncy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpIHtcblxuICBpZiAodHlwZW9mIGZpZWxkID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykge1xuICAgIC8vIFRPRE8gLSByZXBsYWNlIHdpdGggRXJyb3JIYW5kbGVyIG1vZHVsZVxuICAgIHJldHVybiBjb25zb2xlLmxvZygnSW52YWxpZCBzZXR0aW5ncyBmaWVsZCcsIG5ld09wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9uc1tmaWVsZF07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTZXR0aW5ncygpO1xuIl19
