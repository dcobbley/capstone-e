/**
 * Stores backup history information for each type of
 * user data.
 */
function History() {}

/**
 * @access private
 * @description History constructor
 */
History.prototype.initialize = function() {
  // Initialize history to either the stored values or defaults
  if (!this.loadHistory()) {
    this.set(this.getDefault());
  }
};

/**
 * @access private
 * @description Defaults for backup history
 * @return Default values for backup history
 */
History.prototype.getDefault = function() {
  return {
    photos: {
      title: 'Photos',
      lastBackupDate: null,
      backupSize: 0
    },
    videos: {
      title: 'Videos',
      lastBackupDate: null,
      backupSize: 0
    },
    music: {
      title: 'Music',
      lastBackupDate: null,
      backupSize: 0
    },
    contacts: {
      title: 'Contacts',
      lastBackupDate: null,
      backupSize: 0
    },
    messages: {
      title: 'Messages',
      lastBackupDate: null,
      backupSize: 0
    },
    systemSettings: {
      title: 'SystemSettings',
      lastBackupDate: null,
      backupSize: 0
    }

  };
};

/**
 * @access private
 * @description Loads backup history settings from local storage if they exist
 * @return True if backup history settings was loaded from local storage otherwise False 
 */
History.prototype.loadHistory = function() {
  var retrievedHistory = localStorage.getItem('ffosbrHistory');

  if (retrievedHistory !== null) {
    retrievedHistory = JSON.parse(retrievedHistory);

    if (this.validateAll(retrievedHistory) === true) {
      this.history = retrievedHistory;
      return true;
    } else {
      console.log('Fetched invalid history from local storage.');
    }
  }

  return false;
};

/**
 * @access private
 * @description Loads backup history settings from local storage if they exist
 * @return True if backup history settings was loaded from local storage otherwise False 
 */
History.prototype.getValue = function(field, subfield) {
  if (typeof field === 'undefined') {
    return this.history;
  } else if (typeof field !== 'string') {
    console.log('Invalid history field', field);
    return;
  }

  if (typeof subfield === 'string') {
    var o1 = this.history[field];
    if (typeof o1 !== 'undefined') {
      return o1[subfield];
    }
  }

  return this.history[field];
};

/**
 * @access private
 * @description Validate all passed in history
 * @param {object} potentialHistoryObject
 * @return True if passed in history are valid otherwise false
 */
History.prototype.validateAll = function(potentialHistoryObject) {
  var hist = null;
  // If potentialHistoryObject was null, validate this object
  if (typeof potentialHistoryObject === 'undefined') {
    hist = this.history;
  } else if (typeof potentialHistoryObject === 'object') {
    hist = potentialHistoryObject;
  } else {
    return false;
  }

  // Validate individual fields
  if (!this.validateEntry(hist.photos) ||
    !this.validateEntry(hist.videos) ||
    !this.validateEntry(hist.music) ||
    !this.validateEntry(hist.contacts) ||
    !this.validateEntry(hist.messages) ||
    !this.validateEntry(hist.systemSettings)) {
    return false;
  }

  // Ensure that we don't have extra fields
  if (Object.keys(hist).length !== 6) {
    return false;
  }

  return true;
};

/**
 * @access private
 * @description Validate a entry in history
 * @param {object} potentialHistoryEntry
 * @return True if passed in history entry is valid otherwise false
 */
History.prototype.validateEntry = function(potentialHistoryEntry) {
  if (typeof potentialHistoryEntry !== 'object') {
    return false;
  }

  // Validate individual fields
  if (!this.validateEntryField('title', potentialHistoryEntry.title)) {
    return false;
  }
  if (!this.validateEntryField('lastBackupDate', potentialHistoryEntry.lastBackupDate)) {
    return false;
  }
  if (!this.validateEntryField('backupSize', potentialHistoryEntry.backupSize)) {
    return false;
  }

  // Ensure that we don't have extra fields
  if (Object.keys(potentialHistoryEntry).length !== 3) {
    return false;
  }

  return true;
};

/**
 * @access private
 * @description Validate a entrys field in history
 * @param {String} field
 * @param {Object} value
 * @return True if passed in history entry field is valid otherwise false
 */
History.prototype.validateEntryField = function(field, value) {
  if (field === 'title') {
    return typeof value === 'string';
  }
  if (field === 'lastBackupDate') {
    return !isNaN(Date.parse(value)) || value === null;
  }
  if (field === 'backupSize') {
    return typeof value === 'number' && value >= 0;
  }

  return false;
};

/**
 * @access private
 * @description Update sub object or whole history
 * @param {Object} HistoryObjectOrSubObjectName
 * @param {Object} historySubObject
 * @return True if history was updated otherwise false
 */
History.prototype.set = function(HistoryObjectOrSubObjectName, historySubObject) {
  // Is the first argument a field name or a full history object?
  if (typeof HistoryObjectOrSubObjectName === 'string') {
    if (this.validateEntry(historySubObject)) {
      this.history[HistoryObjectOrSubObjectName] = historySubObject;
      localStorage.setItem('ffosbrHistory', JSON.stringify(this.history));
      return true;
    }
  } else if (typeof HistoryObjectOrSubObjectName === 'object' &&
    this.validateAll(HistoryObjectOrSubObjectName)) {
    this.history = HistoryObjectOrSubObjectName;
    localStorage.setItem('ffosbrHistory', JSON.stringify(this.history));
    return true;
  }

  return false;
};

/**
 * @access public
 * @description Get a field of history or the whole history object
 * @param {String} field
 * @param {String} subfield
 * @return field of history or the whole history object
 */
History.prototype.get = function(field, subfield) {
  if (typeof field === 'undefined') {
    return this.history;
  } else if (typeof field !== 'string') {
    return console.log('Invalid history field', field);
  }

  if (typeof subfield === 'string') {
    var o1 = this.history[field];
    if (typeof o1 === 'string') {
      return o1[field];
    }
  }

  return this.history[field];
};

module.exports = new History();
