/**
 * @access public
 * @description Deletes every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} onerror
 */
var clean = function(onerror) {
  if (ffosbr.settings.get('contacts')) {
    ffosbr.contacts.clean(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('messages')) {
    ffosbr.messages.clean(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('photos')) {
    ffosbr.photos.clean(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('music')) {
    ffosbr.music.clean(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('videos')) {
    ffosbr.videos.clean(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }
};

// Defines Ffosbr clean
module.exports = clean;
