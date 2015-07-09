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

  this.loadHistory = function() {
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
  });
  this.loadHistory();

  History.prototype.validate = function(potentialHistory, value) {
    
    var valid = true;
    var hist = null;
    var validTypes = {
      photos: 'Object',
      videos: 'Object',
      contacts: 'Object',
      sms: 'Object',
      lastBackupDate: 'Date',
      backupSize: int
    };
  };
};

module.exports = new History();
