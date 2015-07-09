/**
 * @access public
 * @description TODO
 */
var Messages = function() {};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.backup = function(callback) {
  var that = this;

  this.getMessages(function(msgs) {
    var msgsJSON = [];

    if (msgs.error) {
      console.log('error');
      console.log(msgs.error);
      return;
    }

    for (var i = 0; i < msgs.list.length; i++) {
      var msg = {
        sms: msgs.list[i].sms,
        id: msgs.list[i].id,
        threadId: msgs.list[i].threadId,
        body: msgs.list[i].body,
        delivery: msgs.list[i].delivery,
        deliveryStatus: msgs.list[i].deliveryStatus,
        read: msgs.list[i].read,
        receiver: msgs.list[i].receiver,
        sender: msgs.list[i].sender,
        timestamp: msgs.list[i].timestamp,
        messageClass: msgs.list[i].messageClass,
      };

      msgsJSON.push(JSON.stringify(msg));
    }

    that.putMessagesOnSD(msgsJSON, callback);
  });
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.restore = function() {
  // **This is not possible**
  // Firefox OS current exposes no API to restore messages to device!
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.clean = function(callback) {
  // THis should not be hard coded
  ffosbr.media.remove('backup/messages/messages.json', function(err) {
    if (err) {
      if (callback) {
        callback(err);
      }
    } else {
      if (callback) {
        callback();
      }
    }
  });
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.getMessages = function(callback) {
  var msgs = [];
  var filter = {};
  // FIlter by date?
  filter.read = true;

  var cursor = navigator.mozMobileMessage.getMessages(filter, false);

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

Messages.prototype.putMessagesOnSD = function(smsFile, callback) {
  this.clean(function(err) {
    if (err) {
      callback(err);
    } else {
      var sdcard = ffosbr.media.getStorageByName('sdcard').external;
      var file = new Blob([JSON.stringify(smsFile)], {
        type: 'text/json'
      });
      var filename = 'messages.json';
      var request = null;

      if (sdcard.ready === true) {
        request = sdcard.store.addNamed(file, 'backup/messages/' + filename);
      } else {
        throw new Error('Attempt to delete from invalid storage. Abort.');
      }

      request.onsuccess = function() {
        if (callback) {
          callback();
        }
      };

      // An error typically occur if a file with the same name already exist
      request.onerror = function() {
        if (callback) {
          callback(error);
        }
      };
    }
  });
};

// Defines Ffosbr contact
module.exports = new Messages();
