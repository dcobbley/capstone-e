/**
 * @access public
 * @description TODO
 */
var Messages = function() {

  this.MessagesList = [];
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.backup = function() {
  //no api
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.restore = function() {
  //no api
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.clean = function() {
  ffosbr.media.remove(paths.messages + 'messages.json', oncomplete);
};

/**
 * @access public
 * @description TODO
 */
Messages.prototype.getMessages = function() {
  var filter = {};
  filter.read = true;

  var cursor = window.navigator.mozMobileMessage.getMessages(filter, false);

  cursor.onsuccess = function() {

    if (cursor.result) {
      this.MessagesList.push(cursor.result);
      cursor.continue();
    }

    if (cursor.done) {
      simpleCallBack({
        list: msgList
      });
    }
  };

  cursor.onerror = function(event) {
    simpleCallBack({
      errorName: event.target.error.name
    });
  };

  var simpleCallBack = function(obj) {
    if (obj.errorName) {
      console.log('error');
      console.log(obj.errorName);
    } else {
      for (var i = 0; i < obj.list.length; i++) {
        var msgObj = {
          sms: obj.list[i].sms,
          id: obj.list[i].id,
          threadId: obj.list[i].threadId,
          body: obj.list[i].body,
          delivery: obj.list[i].delivery,
          deliveryStatus: obj.list[i].deliveryStatus,
          read: obj.list[i].read,
          receiver: obj.list[i].receiver,
          sender: obj.list[i].sender,
          timestamp: obj.list[i].timestamp,
          messageClass: obj.list[i].messageClass,
        };

        console.log(JSON.stringify(msgObj));
        var smsFile = JSON.stringify(msgObj);

        putSMS(smsFile);

      }
    }
  };
};


Messages.prototype.putMessagesOnSD = function(smsFile) {

  ffosbr.clean('messages', function() {
    var sdcard = ffosbr.media.getStorageByName('sdcard').external;
    var file = new Blob([JSON.stringify(smsFile)], {
      type: 'application/json'
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
      oncomplete();
    };

    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
      var error = this.error;
      oncomplete(error);
    };
  });
};

// Defines Ffosbr contact
module.exports = new Messages();
