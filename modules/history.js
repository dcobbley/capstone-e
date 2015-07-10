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
