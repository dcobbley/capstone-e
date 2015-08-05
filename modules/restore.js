/**
 * @access public
 * @description Restores every data type set as true in settings.
 *
 *   Calls onsuccess after each sub-restore (per type) finishes
 *   without error. Only argument is the type of restore.
 *
 *   Calls onerror after each sub-restore (per type) finished with
 *   an error.  First argument is the type of restore, second
 *   is the error.
 *
 *   Calls oncomplete after all restores have finished, regardless
 *   of success/failure status. No arguments are provided.
 * @param {callback} onsuccess
 * @param {callback} onerror
 * @param {callback} oncomplete
 */
var restore = function(onsuccess, onerror, oncomplete) {

  var restoreTypes = ffosbr.settings.getCurrentAllowedTypes();
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

  // Kicks off a restore asycnronously, using timeouts.
  var launchRestore = function(type) {
    var nodelay = 0;
    setTimeout(function() {
      ffosbr[type].restore(callbackManager);
    }, nodelay);
  };

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
  for (var i = 0; i < restoreTypes.length; ++i) {
    // Values are false by default. True after finishing.
    finished[restoreTypes[i]] = false;
  }

  // Launch each restore asynchronously.
  for (var j = 0; j < restoreTypes.length; ++j) {
    launchRestore(restoreTypes[j]);
  }
};

// Defines Ffosbr restore
module.exports = restore;
