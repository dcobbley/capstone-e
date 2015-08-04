/**
 * @access public
 * @description Restores every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} onerror
 */
var restore = function(onerror) {
  var restoreTypes = ['contacts', 'messages', 'photos', 'music', 'videos'];

  var asyncRestore = function(type) {
    setTimeout(function() {
      if (ffosbr.settings.get(type)) {
        ffosbr[type].restore(function(err) {
          if (err) {
            onerror(err);
          }
        });
      }
    }, 0);
  };

  for (var i = 0; i < restoreTypes.length; i++) {
    asyncRestore(restoreTypes[i]);
  }
};

// Defines Ffosbr restore
module.exports = restore;
