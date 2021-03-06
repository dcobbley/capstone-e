/**
 * Manages library settings and exposes ways to change them.
 */
function Settings() {

  // Are these the paths we want?
  this.backupPaths = {
    apps: 'backup/apps/',
    music: 'backup/music/',
    photos: 'backup/photos/',
    videos: 'backup/videos/',
    contacts: 'backup/contacts/',
    settings: 'backup/settings/',
    systemSettings: 'backup/systemSettings/',
    messages: 'backup/messages/'
  };
}

/**
 * @access private
 * @description Settings constructor
 */
Settings.prototype.initialize = function() {
  this.validTypes = {
    photos: 'boolean',
    videos: 'boolean',
    music: 'boolean',
    contacts: 'boolean',
    messages: 'boolean',
    systemSettings: 'boolean',
    intervalTime: 'number',
    id: 'number',
    registeredTimer: 'boolean',
    repeat: 'boolean'
  };

  // Load persistent settings from local storage, if they exist
  try {
    this.load();
  } catch (err) {
    // If load failed, the local storage "options" object
    // was malformed. It has now been cleared and Settings
    // options holds default values.
    this.set(this.getDefault());
  }
};

/**
 * @access public
 * @description Returns settings default values.
 */

Settings.prototype.getDefault = function() {
  return {
    photos: true,
    music: true,
    videos: true,
    contacts: true,
    messages: true,
    intervalTime: 24, // pass in value in hours
    id: 0,
    systemSettings: true,
    registeredTimer: false,
    repeat: true
  };
};

/**
 * @access private
 * @description Load previous settings from local storage if they exist
 */
Settings.prototype.load = function() {
  // Load options if present
  var retrievedOptions = localStorage.getItem('ffosbrOptions');

  if (retrievedOptions !== null) {

    try {
      retrievedOptions = JSON.parse(retrievedOptions);
    } catch (err) {
      localStorage.setItem('ffosbrOptions', null);
      throw new Error('Fetched an invalid options object from local storage');
    }

    if (this.validate(retrievedOptions) === true) {
      this.options = retrievedOptions;
    } else {
      throw new Error('Fetched an invalid options object from local storage');
    }
  } else {
    throw new Error('Previously saved settings not found!');
  }
};

/**
 * @access private
 * @description Load previous settings from local storage if they exist
 */
Settings.prototype.getBackupDirectoryPaths = function() {
  var paths = {};
  for (var field in this.backupPaths) {
    paths[field] = this.backupPaths[field];
  }
  return paths;
};

/**
 * @access public
 * @descripton Provides an array the current allowable backup,
 *   clean, and restore types as strings.
 * @returns {Array of String}
 */
Settings.prototype.getCurrentAllowedTypes = function() {
  var allowed = [];
  for (var type in this.backupPaths) {
    if (this.options[type] === true) {
      allowed.push(type);
    }
  }
  return allowed;
};

/**
 * @access private
 * @description Validate passed in setting
 * @param {object} potentialOptions
 * @param {object}  value
 * @return True if passed in settings are valid otherwise false
 */
Settings.prototype.validate = function(potentialOptions, value) {

  var valid = true;
  var opts = null;
  var validTypes = {
    photos: 'boolean',
    videos: 'boolean',
    contacts: 'boolean',
    messages: 'boolean',
    intervalTime: 'number',
    id: 'number',
    systemSettings: 'boolean',
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
    return console.log('Invalid validate parameter', potentialOptions);
  }

  // Support partial validation
  for (var field in opts) {
    if (typeof this.validTypes[field] === 'undefined') {
      // TODO - replace with ErrorHandler module
      console.log('Unrecognized settings option', field);
      valid = false;
    } else if (typeof opts[field] !== this.validTypes[field]) {
      // TODO - replace with ErrorHandler module
      console.log('Invalid type for settings option', field);
      valid = false;
    }
  }

  return valid;
};

/**
 * @access public
 * @description Set settings
 * @param {setting object} newOptions
 * @param {object} value (optional)
 * @throws if new value is invalid
 */
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
    if (!this.options) {
      this.options = {};
    }
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

/**
 * @access public
 * @description Get's current settings or a particular field if passsed in
 * @param {object} field (optional)
 * @return current options
 */
Settings.prototype.get = function(field) {

  if (typeof field === 'undefined') {
    return this.options;
  } else if (typeof field !== 'string') {
    // TODO - replace with ErrorHandler module
    return console.log('Invalid settings field', field);
  }

  return this.options[field];
};

module.exports = new Settings();
