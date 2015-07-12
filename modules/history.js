function History() {
  // Default values, which should be overwritten if we had a valid
  // history on disk
  this.history = {
    photos: {
      title: 'Photos',
      lastBackupDate: '2015-06-20T19:00-0700',
      backupSize: 0
    },
    videos: {
      title: 'Videos',
      lastBackupDate: '2015-06-20T19:00-0700',
      backupSize: 0
    },
    music: {
      title: 'Music',
      lastBackupDate: '2015-06-20T19:00-0700',
      backupSize: 0
    },
    contacts: {
      title: 'Contacts',
      lastBackupDate: '2015-06-20T19:00-0700',
      backupSize: 0
    },
    sms: {
      title: 'SMS',
      lastBackupDate: '2015-06-20T19:00-0700',
      backupSize: 0
    }
  };

  this.loadHistory();
}


History.prototype.loadHistory = function() {
  var retrievedHistory = localStorage.getItem('ffosbrHistory');

  if (retrievedHistory !== null) {
    retrievedHistory = JSON.parse(retrievedHistory);

    if (this.validateAll(retrievedHistory) === true) {
      this.history = retrievedHistory;
    } else {
      localStorage.removeItem('ffosbrHistory');
      console.log('Fetched invalid history from local storage.');
    }
  }
};

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
    !this.validateEntry(hist.sms)) {
    return false;
  }

  // Ensure that we don't have extra fields
  if (Object.keys(hist).length !== 5) {
    return false;
  }

  return true;
};

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

History.prototype.validateEntryField = function(field, value) {
  if (field === 'title') {
    return typeof value === 'string';
  }
  if (field === 'lastBackupDate') {
    return !isNaN(Date.parse(value));
  }
  if (field === 'backupSize') {
    return typeof value === 'number' && value >= 0;
  }

  return false;
};

History.prototype.get = function(field, subfield) {
  // If field is undefined, return the whole object
  if (typeof field === 'undefined') {
    return this;
  }

  // Return the given field
  return this[field];
};

module.exports = new History();
