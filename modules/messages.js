/**
 * Manages backup, clean and restore of device SMS and MMS messages.
 */
var Messages = function() {};

/**
 * @access private
 * @description Messages constructor
 */
Messages.prototype.initialize = function() {};

/**
 * @access public
 * @description Backups the current SMS and MMS messages on the device
 *   to external storage. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to oncomplete.
 * @param {callback} oncomplete
 */
Messages.prototype.backup = function(oncomplete) {
  var that = this;

  this._getMessages(function(msgs, error) {
    var msgsJSON = [];

    if (error) {
      oncomplete('messages', error);
      return;
    }

    for (var i = 0; i < msgs.length; i++) {
      var msg = {
        type: msgs[i].type,
        id: msgs[i].id,
        threadId: msgs[i].threadId,
        delivery: msgs[i].delivery,
        deliveryStatus: msgs[i].deliveryStatus,
        read: msgs[i].read,
        receiver: msgs[i].receiver,
        sender: msgs[i].sender,
        timestamp: msgs[i].timestamp
      };

      if (msgs[i] instanceof MozSmsMessage) {
        msg.body = msgs[i].body;
        msg.messageClass = msgs[i].messageClass;

      } else if (msgs[i] instanceof MozMmsMessage) {
        msg.subject = msgs[i].subject;
        msg.smil = msgs[i].smil;
        msg.attachments = msgs[i].attachments;
        msg.expiryDate = msgs[i].expiryDate;

      } else {
        oncomplete('messages', new Error('unknown message type'));
        return;
      }

      msgsJSON.push(JSON.stringify(msg));
    }

    that._putMessagesOnSD(msgsJSON, function(error) {
      oncomplete('messages', error);
    });
  });
};

/**
 * @access public
 * @description Firefox OS current exposes no API to
 *  restore messages to the device so this function is a noop.
 * @param {callback} oncomplete
 */
Messages.prototype.restore = function(oncomplete) {

  if (!ffosbr.utils.isFunction(oncomplete)) {
    onsuccess = function() {};
  }

  // ** This is not possible **
  // Firefox OS current exposes no API to restore messages to device!

  // Behave as if successful.
  oncomplete('messages');
};

/**
 * @access public
 * @description Deletes the messages file from external storage.
 *   Callback is invoked upon completion. If an error occurred,
 *   it will be passed as the first parameter to oncomplete.
 * @param {callback} oncomplete
 */
Messages.prototype.clean = function(oncomplete) {
  var path = ffosbr.settings.backupPaths.messages;

  if (!ffosbr.utils.isFunction(oncomplete)) {
    oncomplete = function() {};
  }

  ffosbr.media.remove(path + 'messages.json', function(err) {
    if (err === undefined) {
      ffosbr.history.set('messages', {
        title: 'Messages',
        lastBackupDate: null,
        backupSize: 0,
      });
    }

    oncomplete('messages', err);
  });
};

/**
 * @access private
 * @description Retrieves the current messages from the device.
 *   Callback is invoked upon completion. If an error occurred,
 *   it will be passed as the first parameter to oncomplete.
 *   If no error occured then the a list of messages will be passed
 *   to oncomplete.
 * @param {callback} oncomplete
 */
Messages.prototype._getMessages = function(oncomplete) {
  var msgs = [];
  var cursor = {};

  try {
    cursor = navigator.mozMobileMessage.getMessages({}, false);
  } catch (e) {
    // Most likely means we're running on simulator
    console.error(e);
    oncomplete(msgs, new Error('Failed to get messages: ' + e.message));
  }

  cursor.onsuccess = function() {
    if (this.result) {
      msgs.push(this.result);
      cursor.continue();
    }

    if (this.done) {
      oncomplete(msgs);
    }
  };

  cursor.onerror = function(event) {
    oncomplete(msgs, new Error(event.target.error.name));
  };
};

/**
 * @access private
 * @description Stores the pasted in messages to external storage.
 *   Callback is invoked upon completion. If an error occurred,
 *   it will be passed as the first parameter to the callback.
 * @param {array} messageData
 * @param {callback} callback
 */
Messages.prototype._putMessagesOnSD = function(messageData, callback) {
  this.clean(function(err) {
    if (err) {
      callback(err);
    } else {
      var sdcard = ffosbr.media.getStorageByName('sdcard').external;
      var file = new Blob([JSON.stringify(messageData)], {
        type: 'text/json'
      });

      var filename = 'messages.json';
      var path = ffosbr.settings.backupPaths.messages;
      var request = null;

      if (sdcard.ready === true) {
        request = sdcard.store.addNamed(file, path + filename);
      } else {
        callback('Attempt to delete from invalid storage');
        return;
      }

      request.onsuccess = function() {

        ffosbr.history.set('messages', {
          title: 'Messages',
          lastBackupDate: new Date(),
          backupSize: file.size,
        });

        if (callback) {
          callback();
        }
      };

      request.onerror = function() {
        if (callback) {
          callback(this.error);
        }
      };
    }
  });
};

// Export Messages object
module.exports = new Messages();
