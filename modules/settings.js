 module.exports = function(Ffosbr) {
   var sdcard = navigator.getDeviceStorage('sdcard');
   var sdcard1 = navigator.getDeviceStorage('sdcard1');
   //var appSettings = navigator.getDeviceStorage('apps');

   Ffosbr.prototype.settings = function() {
     var DAYS_STARTING_SUNDAY = require('constants').DAYS_STARTING_SUNDAY;


     //function BackupItems() {
     var backupTypes = document.getElementById('SelectItems');

     if (backupTypes) {
       var userItems = {
         photos: backupTypes[0].value,
         videos: backupTypes[1].value,
         contacts: backupTypes[2].value,
         textMsgs: backupTypes[3].value
       };
       //return userItems;
     }
     //}

     //BackupItems();
     /*
        function Timer(opts) {
          opts = opts || {};
          var now = new Date();
          var defaults = {
            id: null,
            registeredTimer: {},
            repeat: {},
            hour: now.getHours(),
            minute: now.getMinutes(),
            label: ''
          };

        }

        var file = new Blob(['This is a settings file.'], {
          type: 'text/plain'
        });
        var request = appSettings.addNamed(file, 'settings.txt');

        request.onsuccess = function() {
          var name = this.result;
          console.log('File ' + name + 'successfully wrote to app storage');

        };

        request.onerror = function() {
          console.warn('Unable to write the file: ' + this.error);
        };



     */

     Ffosbr.settings = new Settings();
   };
 };
