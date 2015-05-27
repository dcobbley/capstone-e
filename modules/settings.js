 module.exports = function(Ffosbr) {
   var internalStorage = navigator.getDeviceStorage('sdcard');
   var sdcard = navigator.getDeviceStorage('sdcard1');
   //var appSettings = navigator.getDeviceStorage('apps');

   // Ffosbr.prototype.settings = function() {
   var DAYS_STARTING_SUNDAY = require('constants').DAYS_STARTING_SUNDAY;

   {
     backupTypes = {
       'photos': false,
       'videos': false,
       'contacts': false,
       'text': false
     };
   }

   {
     backupTimes = {
       'id': null,
       'registeredTimer': false,
       'repeat': false,
       'daily': false,
       'weekly': false,
       'monthly': false
     };

   }

   Ffosbr.prototype.BackupItems = function(key, value) {
     if (key == 'photos') {
       backupTypes.photos = value;
     }
     if (key == 'videos') {
       backupTypes.videos = value;
     }
     if (key == 'contacts') {
       backupTypes.contacts = value;
     }
     if (key == 'text') {
       backupTypes.text = value;
     }
     return backupTypes;

   };

   Ffosbr.prototype.BackupTimer = function(key, value) {
     if (key == 'id') {
       backupTimes.id = value;
     }
     if (key == 'registeredTimer') {
       backupTimes.registeredTimer = value;
     }
     if (key == 'repeat') {
       backupTimes.repeat = value;
     }
     if (key == 'daily') {
       backupTimes.daily = value;
     }
     if (key == 'weekly') {
       backupTimes.weekly = value;
     }
     if (key == 'monthly') {
       backupTimes.monthly = value;
     }
     return backupTimes;
   };


   // Ffosbr.settings = new Settings();
 };
