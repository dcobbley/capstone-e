/**
 * Manages backup, clean and restore of device SMS and MMS messages.
 */
var Messages = function() {};

/**
 * @description Messages constructor
 */
Messages.prototype.initialize = function() {};

/**
 * @access public
 * @description Backups the current SMS and MMS messages on the device
 *   to external storage. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to the callback.
 * @param {callback} callback
 */
Messages.prototype.backup = function(callback) {
  var that = this;

  this._getMessages(function(msgs) {
    var msgsJSON = [];

    if (msgs.error) {
      callback(msgs.error);
      return;
    }

    for (var i = 0; i < msgs.list.length; i++) {
      var msg = {
        type: msgs.list[i].type,
        id: msgs.list[i].id,
        threadId: msgs.list[i].threadId,
        delivery: msgs.list[i].delivery,
        deliveryStatus: msgs.list[i].deliveryStatus,
        read: msgs.list[i].read,
        receiver: msgs.list[i].receiver,
        sender: msgs.list[i].sender,
        timestamp: msgs.list[i].timestamp
      };

      if (msgs.list[i] instanceof MozSmsMessage) {
        msg.body = msgs.list[i].body;
        msg.messageClass = msgs.list[i].messageClass;

      } else if (msgs.list[i] instanceof MozMmsMessage) {
        msg.subject = msgs.list[i].subject;
        msg.smil = msgs.list[i].smil;
        msg.attachments = msgs.list[i].attachments;
        msg.expiryDate = msgs.list[i].expiryDate;

      } else {
        callback('unknown message type');
        return;
      }

      msgsJSON.push(JSON.stringify(msg));
    }

    that._putMessagesOnSD(msgsJSON, callback);
  });
};

/**
 * @access public
 * @description Firefox OS current exposes no API to
 *  restore messages to the device so this function is a noop.
 */
Messages.prototype.restore = function() {
  // **This is not possible**
  // Firefox OS current exposes no API to restore messages to device!
};

/**
 * @access public
 * @description Deletes the messages file from external storage.
 *   Callback is invoked upon completion. If an error occurred,
 *   it will be passed as the first parameter to the callback.
 * @param {callback} callback
 */
Messages.prototype.clean = function(callback) {
  var path = ffosbr.settings.backupPaths.messages;

  ffosbr.media.remove(path + 'messages.json', function(err) {
    if (callback) {
      callback(err ? err : undefined);
    }
  });
};

/**
 * @access private
 * @description Retrieves the current messages from the device.
 *   Callback is invoked upon completion. If an error occurred,
 *   it will be passed as the first parameter to the callback.
 *   If no error occured then the a list of messages will be passed
 *   to the callback.
 * @param {callback} callback
 */
Messages.prototype._getMessages = function(callback) {
  var msgs = [];
  var cursor = navigator.mozMobileMessage.getMessages({}, false);

  cursor.onsuccess = function() {
    if (cursor.result) {
      msgs.push(cursor.result);
      cursor.continue();
    }

    if (cursor.done) {
      callback({
        list: msgs
      });
    }
  };

  cursor.onerror = function(event) {
    callback({
      error: event.target.error.name
    });
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
