/**
 * @access public
 * @description Restores every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} oncomplete
 */
var restore = function(oncomplete) {
  if (ffosbr.settings.get('contacts')) {
    ffosbr.contacts.restore(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('messages')) {
    ffosbr.messages.restore(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('photos')) {
    ffosbr.photos.restore(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('music')) {
    ffosbr.music.restore(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('video')) {
    ffosbr.videos.restore(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }
};

// Defines Ffosbr restore
module.exports = restore;
