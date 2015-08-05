/**
 * @access public
 * @description Deletes every data type set as true in settings.
 *
 *   Calls onsuccess after each sub-clean (per type) finishes
 *   without error. Only argument is the type of clean.
 *
 *   Calls onerror after each sub-clean (per type) finished with
 *   an error.  First argument is the type of clean, second
 *   is the error.
 *
 *   Calls oncomplete after all restores have finished, regardless
 *   of success/failure status. No arguments are provided.
 * @param {callback} onsuccess
 * @param {callback} onerror
 * @param {callback} oncomplete
 */
var clean = function(onsuccess, onerror, oncomplete) {

  var cleanTypes = ffosbr.settings.getCurrentAllowedTypes();
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

  // Kicks off a clean asycnronously, using timeouts.
  var launchClean = function(type) {
    var nodelay = 0;
    setTimeout(function() {
      ffosbr[type].clean(callbackManager);
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
  for (var i = 0; i < cleanTypes.length; ++i) {
    // Values are false by default. True after finishing.
    finished[cleanTypes[i]] = false;
  }

  // Launch each clean asynchronously.
  for (var j = 0; j < cleanTypes.length; ++j) {
    launchClean(cleanTypes[j]);
  }
};

// Defines Ffosbr clean
module.exports = clean;
