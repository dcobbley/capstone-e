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
