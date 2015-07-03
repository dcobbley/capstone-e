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

    retrievedOptions = JSON.parse(retrievedOptions);

    if (this.validate(retrievedOptions === true)) {
      this.options = retrievedOptions;
    } else {
      // TODO - should we throw an error? Or just let this slide?
      console.log('Fetched an invalid options object from local storage');
    }
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

Settings.prototype.set = function(newOptions, value) {

  var opts = null;

  if (typeof newOptions === 'object') {
    opts = newOptions; // validate parameter object
  } else if (typeof newOptions === 'string') {
    opts = {}; // single field check
    if (typeof value === 'undefined') {
      opts[newOptions] = this.options[newOptions];
    } else {
      opts[newOptions] = value;
    }
  } else {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid set parameter', field);
  }

  if (this.validate(opts) === true) {
    for (var field in opts) {
      this.options[field] = opts[field];
    }
  } else {
    for (var bad in opts) {
      // Slower, but provides a more useful error message.
      if (this.validate(bad, opts[bad]) === false) {
        throw new Error('Cannot set field ' + bad + ' with value ' + opts[bad]);
      }
    }
  }

  localStorage.setItem('ffosbrOptions', JSON.stringify(this.options));


  // if (typeof newOptions === 'undefined') {
  //   return;
  // } else if (typeof newOptions !== 'object') {
  //   // TODO - replace with ErrorHandler module
  //   return console.log('Invalid config object', newOptions);
  // }

  // if (this.validate('photos', newOptions.photos)) {
  //   this.options.photos = newOptions.photos;
  // }

  // if (this.validate('videos', newOptions.videos)) {
  //   this.options.videos = newOptions.videos;
  // }

  // if (this.validate('contacts', newOptions.contacts)) {
  //   this.options.contacts = newOptions.contacts;
  // }

  // if (this.validate('text', newOptions.text)) {
  //   this.options.text = newOptions.text;
  // }

  // if (this.validate('id', newOptions.id)) {
  //   this.options.id = newOptions.id;
  // }

  // if (this.validate('registeredTimer', newOptions.registeredTimer)) {
  //   this.options.registeredTimer = newOptions.registeredTimer;
  // }

  // if (this.validate('repeat', newOptions.repeat)) {
  //   this.options.repeat = newOptions.repeat;
  // }

  // //////pass in the value in hours /////////
  // if (this.validate('intervalTime', newOptions.intervalTime)) {
  //   this.options.intervalTime = newOptions.intervalTime;
  // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL21haW4uanMiLCJtb2R1bGVzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICB2YXIgRmZvc2JyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvKiBJbXBvcnQgbW9kdWxlcyAqL1xuICAgIHRoaXMuc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG4gIH07XG5cbiAgd2luZG93LmZmb3NiciA9IG5ldyBGZm9zYnIoKTtcbn0pKCk7XG4iLCJmdW5jdGlvbiBTZXR0aW5ncygpIHtcblxuICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgcGhvdG9zOiB0cnVlLFxuICAgIHZpZGVvczogdHJ1ZSxcbiAgICBjb250YWN0czogdHJ1ZSxcbiAgICB0ZXh0OiB0cnVlLFxuICAgIGludGVydmFsVGltZTogMjQsIC8vIHBhc3MgaW4gdmFsdWUgaW4gaG91cnNcbiAgICBpZDogMCxcbiAgICByZWdpc3RlcmVkVGltZXI6IGZhbHNlLFxuICAgIHJlcGVhdDogdHJ1ZVxuICB9O1xuXG4gIC8vIExvYWQgb3B0aW9ucyBpZiBwcmVzZW50XG4gIHZhciByZXRyaWV2ZWRPcHRpb25zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zmb3Nick9wdGlvbnMnKTtcblxuICBpZiAocmV0cmlldmVkT3B0aW9ucyAhPT0gbnVsbCkge1xuXG4gICAgcmV0cmlldmVkT3B0aW9ucyA9IEpTT04ucGFyc2UocmV0cmlldmVkT3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy52YWxpZGF0ZShyZXRyaWV2ZWRPcHRpb25zID09PSB0cnVlKSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gcmV0cmlldmVkT3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyAtIHNob3VsZCB3ZSB0aHJvdyBhbiBlcnJvcj8gT3IganVzdCBsZXQgdGhpcyBzbGlkZT9cbiAgICAgIGNvbnNvbGUubG9nKCdGZXRjaGVkIGFuIGludmFsaWQgb3B0aW9ucyBvYmplY3QgZnJvbSBsb2NhbCBzdG9yYWdlJyk7XG4gICAgfVxuICB9XG59XG5cblNldHRpbmdzLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uKHBvdGVudGlhbE9wdGlvbnMsIHZhbHVlKSB7XG5cbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgdmFyIG9wdHMgPSBudWxsO1xuICB2YXIgdmFsaWRUeXBlcyA9IHtcbiAgICBwaG90b3M6ICdib29sZWFuJyxcbiAgICB2aWRlb3M6ICdib29sZWFuJyxcbiAgICBjb250YWN0czogJ2Jvb2xlYW4nLFxuICAgIHRleHQ6ICdib29sZWFuJyxcbiAgICBpbnRlcnZhbFRpbWU6ICdudW1iZXInLFxuICAgIGlkOiAnbnVtYmVyJyxcbiAgICByZWdpc3RlcmVkVGltZXI6ICdib29sZWFuJyxcbiAgICByZXBlYXQ6ICdib29sZWFuJ1xuICB9O1xuXG4gIGlmICh0eXBlb2YgcG90ZW50aWFsT3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0gcG90ZW50aWFsT3B0aW9uczsgLy8gdmFsaWRhdGUgcGFyYW1ldGVyIG9iamVjdFxuICB9IGVsc2UgaWYgKHR5cGVvZiBwb3RlbnRpYWxPcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdHMgPSB7fTsgLy8gc2luZ2xlIGZpZWxkIGNoZWNrXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9wdHNbcG90ZW50aWFsT3B0aW9uc10gPSB0aGlzLm9wdGlvbnNbcG90ZW50aWFsT3B0aW9uc107XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdHNbcG90ZW50aWFsT3B0aW9uc10gPSB2YWx1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHBvdGVudGlhbE9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0cyA9IHRoaXMub3B0aW9uczsgLy8gdmFsaWRhdGUgY3VycmVudCBvcHRpb25zXG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETyAtIHJlcGxhY2Ugd2l0aCBFcnJvckhhbmRsZXIgbW9kdWxlXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKCdJbnZhbGlkIHZhbGlkYXRlIHBhcmFtZXRlcicsIGZpZWxkKTtcbiAgfVxuXG4gIC8vIFN1cHBvcnQgcGFydGlhbCB2YWxpZGF0aW9uXG4gIGZvciAodmFyIGZpZWxkIGluIG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9uc1tmaWVsZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUT0RPIC0gcmVwbGFjZSB3aXRoIEVycm9ySGFuZGxlciBtb2R1bGVcbiAgICAgIGNvbnNvbGUubG9nKCdVbnJlY29nbml6ZWQgc2V0dGluZ3Mgb3B0aW9uJywgZmllbGQpO1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzW2ZpZWxkXSAhPT0gdmFsaWRUeXBlc1tmaWVsZF0pIHtcbiAgICAgIC8vIFRPRE8gLSByZXBsYWNlIHdpdGggRXJyb3JIYW5kbGVyIG1vZHVsZVxuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgdHlwZSBmb3Igc2V0dGluZ3Mgb3B0aW9uJywgZmllbGQpO1xuXG5cbiAgICAgIC8vIGFsZXJ0KGZpZWxkICsgJzogJyArIHR5cGVvZiBvcHRzW2ZpZWxkXSArICcgdnMgJyArIHR5cGVvZiB2YWxpZFR5cGVzW2ZpZWxkXSk7IC8vcm12XG5cblxuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsaWQ7XG59O1xuXG5TZXR0aW5ncy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmV3T3B0aW9ucywgdmFsdWUpIHtcblxuICB2YXIgb3B0cyA9IG51bGw7XG5cbiAgaWYgKHR5cGVvZiBuZXdPcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSBuZXdPcHRpb25zOyAvLyB2YWxpZGF0ZSBwYXJhbWV0ZXIgb2JqZWN0XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld09wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0cyA9IHt9OyAvLyBzaW5nbGUgZmllbGQgY2hlY2tcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb3B0c1tuZXdPcHRpb25zXSA9IHRoaXMub3B0aW9uc1tuZXdPcHRpb25zXTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0c1tuZXdPcHRpb25zXSA9IHZhbHVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBUT0RPIC0gcmVwbGFjZSB3aXRoIEVycm9ySGFuZGxlciBtb2R1bGVcbiAgICByZXR1cm4gY29uc29sZS5sb2coJ0ludmFsaWQgc2V0IHBhcmFtZXRlcicsIGZpZWxkKTtcbiAgfVxuXG4gIGlmICh0aGlzLnZhbGlkYXRlKG9wdHMpID09PSB0cnVlKSB7XG4gICAgZm9yICh2YXIgZmllbGQgaW4gb3B0cykge1xuICAgICAgdGhpcy5vcHRpb25zW2ZpZWxkXSA9IG9wdHNbZmllbGRdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBiYWQgaW4gb3B0cykge1xuICAgICAgLy8gU2xvd2VyLCBidXQgcHJvdmlkZXMgYSBtb3JlIHVzZWZ1bCBlcnJvciBtZXNzYWdlLlxuICAgICAgaWYgKHRoaXMudmFsaWRhdGUoYmFkLCBvcHRzW2JhZF0pID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgZmllbGQgJyArIGJhZCArICcgd2l0aCB2YWx1ZSAnICsgb3B0c1tiYWRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmZvc2JyT3B0aW9ucycsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xuXG5cbiAgLy8gaWYgKHR5cGVvZiBuZXdPcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAvLyAgIHJldHVybjtcbiAgLy8gfSBlbHNlIGlmICh0eXBlb2YgbmV3T3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgLy8gICAvLyBUT0RPIC0gcmVwbGFjZSB3aXRoIEVycm9ySGFuZGxlciBtb2R1bGVcbiAgLy8gICByZXR1cm4gY29uc29sZS5sb2coJ0ludmFsaWQgY29uZmlnIG9iamVjdCcsIG5ld09wdGlvbnMpO1xuICAvLyB9XG5cbiAgLy8gaWYgKHRoaXMudmFsaWRhdGUoJ3Bob3RvcycsIG5ld09wdGlvbnMucGhvdG9zKSkge1xuICAvLyAgIHRoaXMub3B0aW9ucy5waG90b3MgPSBuZXdPcHRpb25zLnBob3RvcztcbiAgLy8gfVxuXG4gIC8vIGlmICh0aGlzLnZhbGlkYXRlKCd2aWRlb3MnLCBuZXdPcHRpb25zLnZpZGVvcykpIHtcbiAgLy8gICB0aGlzLm9wdGlvbnMudmlkZW9zID0gbmV3T3B0aW9ucy52aWRlb3M7XG4gIC8vIH1cblxuICAvLyBpZiAodGhpcy52YWxpZGF0ZSgnY29udGFjdHMnLCBuZXdPcHRpb25zLmNvbnRhY3RzKSkge1xuICAvLyAgIHRoaXMub3B0aW9ucy5jb250YWN0cyA9IG5ld09wdGlvbnMuY29udGFjdHM7XG4gIC8vIH1cblxuICAvLyBpZiAodGhpcy52YWxpZGF0ZSgndGV4dCcsIG5ld09wdGlvbnMudGV4dCkpIHtcbiAgLy8gICB0aGlzLm9wdGlvbnMudGV4dCA9IG5ld09wdGlvbnMudGV4dDtcbiAgLy8gfVxuXG4gIC8vIGlmICh0aGlzLnZhbGlkYXRlKCdpZCcsIG5ld09wdGlvbnMuaWQpKSB7XG4gIC8vICAgdGhpcy5vcHRpb25zLmlkID0gbmV3T3B0aW9ucy5pZDtcbiAgLy8gfVxuXG4gIC8vIGlmICh0aGlzLnZhbGlkYXRlKCdyZWdpc3RlcmVkVGltZXInLCBuZXdPcHRpb25zLnJlZ2lzdGVyZWRUaW1lcikpIHtcbiAgLy8gICB0aGlzLm9wdGlvbnMucmVnaXN0ZXJlZFRpbWVyID0gbmV3T3B0aW9ucy5yZWdpc3RlcmVkVGltZXI7XG4gIC8vIH1cblxuICAvLyBpZiAodGhpcy52YWxpZGF0ZSgncmVwZWF0JywgbmV3T3B0aW9ucy5yZXBlYXQpKSB7XG4gIC8vICAgdGhpcy5vcHRpb25zLnJlcGVhdCA9IG5ld09wdGlvbnMucmVwZWF0O1xuICAvLyB9XG5cbiAgLy8gLy8vLy8vcGFzcyBpbiB0aGUgdmFsdWUgaW4gaG91cnMgLy8vLy8vLy8vXG4gIC8vIGlmICh0aGlzLnZhbGlkYXRlKCdpbnRlcnZhbFRpbWUnLCBuZXdPcHRpb25zLmludGVydmFsVGltZSkpIHtcbiAgLy8gICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxUaW1lID0gbmV3T3B0aW9ucy5pbnRlcnZhbFRpbWU7XG4gIC8vIH1cbn07XG5cblNldHRpbmdzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCkge1xuXG4gIGlmICh0eXBlb2YgZmllbGQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVE9ETyAtIHJlcGxhY2Ugd2l0aCBFcnJvckhhbmRsZXIgbW9kdWxlXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKCdJbnZhbGlkIHNldHRpbmdzIGZpZWxkJywgbmV3T3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zW2ZpZWxkXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNldHRpbmdzKCk7XG4iXX0=
