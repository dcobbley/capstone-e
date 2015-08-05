/**
 * @access public
 * @description Deletes every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} onerror
 */
var clean = function(onerror) {
  var cleanTypes = ['contacts', 'messages', 'photos', 'music', 'videos'];

  var asyncClean = function(type) {
    setTimeout(function() {
      if (ffosbr.settings.get(type)) {
        ffosbr[type].clean(function(err) {
          if (err) {
            onerror(err);
          }
        });
      }
    }, 0);
  };

  for (var i = 0; i < cleanTypes.length; i++) {
    asyncClean(cleanTypes[i]);
  }
};

// Defines Ffosbr clean
module.exports = clean;
