/**
 * @access public
 * @description Backups every data type set as true in settings
 * Calls the callback on every error
 * @param {callback} oncomplete
 */
var backup = function(oncomplete) {
  if (ffosbr.settings.get('contacts')) {
    ffosbr.contacts.backup(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('messages')) {
    ffosbr.messages.backup(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('photos')) {
    ffosbr.photos.backup(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('music')) {
    ffosbr.music.backup(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }

  if (ffosbr.settings.get('videos')) {
    ffosbr.videos.backup(function(err) {
      if (err) {
        onerror(err);
      }
    });
  }
};

// Defines Ffosbr backup
module.exports = backup;
