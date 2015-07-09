/**
 * @access public
 * @description TODO
 */
var Messages = function() {};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.backup = function() {
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

    that.putMessagesOnSD(msgsJSON);
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
Messages.prototype.clean = function() {
  // THis should not be hard coded
  ffosbr.media.remove('backup/messages.json');
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

Messages.prototype.putMessagesOnSD = function(smsFile) {
  ffosbr.clean('messages', function(error) {
    if (error) {
      console.log(error);
      return;
    }

    var sdcard = ffosbr.media.getStorageByName('sdcard').external;
    var file = new Blob([JSON.stringify(smsFile)], {
      type: 'text/json'
    });
    var filename = 'messages.json';
    var request = null;

    if (sdcard.ready === true) {
      request = sdcard.store.addNamed(file, paths.messages + filename);
    } else {
      // TODO - handle errors
      alert('external sdcard not ready'); //rmv
    }

    request.onsuccess = function() {
      // if (oncomplete) {
      //   oncomplete();
      // }
      console.log('success');
    };

    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
      console.log(this.error);
      // if (oncomplete) {
      //   oncomplete(error);
      // }
    };
  });
};

// Defines Ffosbr contact
module.exports = new Messages();
