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

Settings.prototype.validate = function (potentialOptions, value) {

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
  }
  else if (typeof potentialOptions === 'string') {
    opts = {}; // single field check
    opts[potentialOptions] = value;
  }
  else if (typeof potentialOptions === 'undefined') {
    opts = this.options; // validate current options
  }
  else {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid validate parameter', field);
  }

  // Support partial validation
  for (var field in opts) {
    if (typeof this.options[field] === 'undefined') {
      // TODO - replace with ErrorHandler module
      console.log('Unrecognized settings option', field);
      valid = false;
    }
    else if (typeof opts[field] !== typeof validTypes[field]) {
      // TODO - replace with ErrorHandler module
      console.log('Invalid type for settings option', field);
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

  if (this.validate('text',newOptions.text)) {
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

Settings.prototype.get = function (field) {

  if (typeof field === 'undefined') {
    return this.options;
  } else if (typeof field !== 'string') {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid settings field', newOptions);
  }

  return this.options[field];
};

module.exports = new Settings();
