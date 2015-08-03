/**
 * @access public
 * @description Backups every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} onerror
 */
var backup = function(onerror) {
  var backupTypes = ['contacts', 'messages', 'photos', 'music', 'videos'];

  var asyncBackup = function(type) {
    setTimeout(function() {
      if (ffosbr.settings.get(type)) {
        ffosbr[type].backup(function(err) {
          if (err) {
            onerror(err);
          }
        });
      }
    }, 0);
  };

  for (var i = 0; i < backupTypes.length; i++) {
    asyncBackup(backupTypes[i]);
  }
};

// Defines Ffosbr backup
module.exports = backup;
