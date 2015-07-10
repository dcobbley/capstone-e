function HistoryEntry() {
  var lastUpdated = new Date();
  var backupSize = 0;
}

function HistoryEntry(lastUpdatedVal, backupSizeVal) {
  var lastUpdated = new Date();
  var backupSize = 0;

  if (typeof lastUpdatedVal === 'date') {
    lastUpdated = lastUpdatedVal;
  }
  if (typeof backupSizeVal === 'number') {
    backupSize = backupSizeVal;
  }
}

HistoryEntry.prototype.validateAll = function(potentialHistoryEntry) {
  var hist = null;
  // If potentialHistoryEntry was null, validate this object
  if (typeof potentialHistoryEntry === 'undefined') {
    hist = this;
  } else if (typeof potentialHistoryEntry === object) {
    hist = potentialHistoryEntry;
  } else {
    return false;
  }
  
  // Validate individual fields
  if (!this.validate('lastUpdated', hist['lastUpdated'])) {
    return false;
  }
  if (!this.validate('backupSize', hist['backupSize'])) {
    return false;
  }

  // Ensure that we don't have extra fields
  if (!Object.keys(this).length == 2) {
    return false;
  }

  return true;
};

HistoryEntry.prototype.validate = function(field, value) {
  if (field === 'lastUpdated') {
    return Date.parse(value) != NaN;
  }
  if (field === 'backupSize') {
    return typeof value === 'number' && value >= 0;
  }

  return false;
};

HistoryEntry.prototype.set = function(field, value) {
  // If we were passed an object, try and set its fields
  if (typeof field === 'object' && this.validateAll(field)) {
    this.lastUpdated = field['lastUpdated'];
    this.backupSize = field['backupSize'];
  } else if (typeof field === 'string' && this.validate(field, value)) {
    this[field] = value;
  }
};

HistoryEntry.prototype.get = function(field) {
  // If field is undefined, return the whole object
  if (typeof field === 'undefined') {
    return this;
  }

  // Return the given field
  return this[field];
}

function History() {
  // Default values, which should be overwritten if we had a valid
  // history on disk
  var history = {
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
    contacts: {
      title: 'Contacts',
      lastBackupDate: null,
      backupSize: 0
    },
    sms: {
      title: 'SMS',
      lastBackupDate: null,
      backupSize: 0
    }
  };

  this.loadHistory();
}


History.prototype.loadHistory = function() {
  var retrievedHistory = localStorage.getItem('ffosbrHistory');

  if (retrievedHistory !== null) {
    retrievedHistory = JSON.parse(retrievedHistory);

    if (this.validate(retrievedHistory) === true) {
      this.history = retrievedHistory;
    } else {
      localStorage.removeItem('ffosbrHistory');
      console.log('Fetched invalid history from local storage.');
    }
  }
};

History.prototype.get = function(field) {
  if (typeof field === 'undefined') {
    return this.history;
  } else if (typeof field !== 'string') {
    return console.log('Invalid history field', field);
  }

  return this.history[field];
};

module.exports = new History();
