/**
 * @access public
 * @description Backs up every data type set as true in settings.
 *
 *   Calls onsuccess after each sub-backup (per type) finishes
 *   without error. Only argument is the type of backup.
 *
 *   Calls onerror after each sub-backup (per type) finished with
 *   an error.  First argument is the type of backup, second
 *   is the error.
 *
 *   Calls oncomplete after all backups have finished, regardless
 *   of success/failure status. No arguments are provided.
 * @param {callback} onsuccess
 * @param {callback} onerror
 * @param {callback} oncomplete
 */
var backup = function(onsuccess, onerror, oncomplete) {

  var backupTypes = ffosbr.settings.getCurrentAllowedTypes();
  var finished = {};

  // Keeps track of which callbacks have finished, and calls
  // appropriate handlers.
  var callbackManager = function(type, error) {

    finished[type] = true;

    if (error) {
      onerror(type, error);
    } else {
      onsuccess(type);
    }

    // If there are any outstanding callbacks, we return early.
    for (var f in finished) {
      if (finished[f] === false) {
        return;
      }
    }

    // All callbacks have finished. Call master oncomplete.
    oncomplete();
  };

  // Kicks off a backup asycnronously, using timeouts.
  var launchBackup = function(type) {
    var nodelay = 0;
    setTimeout(function() {
      ffosbr[type].backup(callbackManager);
    }, nodelay);
  };

  // Validate success, error, and complete handlers.
  if (!ffosbr.utils.isFunction(onsuccess)) {
    onsuccess = function() {};
  }
  if (!ffosbr.utils.isFunction(onerror)) {
    onerror = function() {};
  }
  if (!ffosbr.utils.isFunction(oncomplete)) {
    oncomplete = function() {};
  }

  // Record expected types to finish
  for (var i = 0; i < backupTypes.length; ++i) {
    // Values are false by default. True after finishing.
    finished[backupTypes[i]] = false;
  }

  // Launch each backup asynchronously.
  for (var j = 0; j < backupTypes.length; ++j) {
    launchBackup(backupTypes[j]);
  }
};

// Defines Ffosbr backup
module.exports = backup;
