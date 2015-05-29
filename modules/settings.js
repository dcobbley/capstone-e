 module.exports = function(Ffosbr) {
   //var internalStorage = navigator.getDeviceStorage('sdcard');
   //var sdcard = navigator.getDeviceStorage('sdcard1');
   //var appSettings = navigator.getDeviceStorage('apps');

   //Ffosbr.prototype.settings = function() {
   //function settings() {
   var DAYS_STARTING_SUNDAY = require('constants').DAYS_STARTING_SUNDAY;
   var timeInMilliSec = 0;

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
       'intervalTime': null, // pass in value in hours
       'id': null,
       'registeredTimer': false,
       'repeat': false,
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

     //////pass in the value in hours /////////
     if (key == 'intervalTime') {
       timeInMilliSec = value * 1000 * 60 * 60;
       backupTimes.intervalTime = timeInMilliSec;
     }
     return backupTimes;
   };
   //}
   //Ffosbr.settings = new Settings();
 };
