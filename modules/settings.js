function Settings() {

  var options = {
    photos: true,
    videos: true,
    contacts: true,
    text: true,
    intervalTime: 24, // pass in value in hours
    id: 0,
    registeredTimer: false,
    repeat: true
  };

  // Load options if present
  (function() {
    var retrievedOptions = localStorage.getItem('ffosbrOptions');

    if (retrievedOptions !== null) {
      options = JSON.parse(retrievedOptions);
    }
  })();

  Settings.prototype.options = function(myDictionary) {
    if (!myDictionary) {
      return options;
    }

    if (myDictionary.photos !== undefined &&
      typeof myDictionary.photos === 'boolean') {
      options.photos = myDictionary.photos;
    }

    if (myDictionary.videos !== undefined &&
      typeof myDictionary.videos === 'boolean') {
      options.videos = myDictionary.videos;
    }

    if (myDictionary.contacts !== undefined &&
      typeof myDictionary.contacts === 'boolean') {
      options.contacts = myDictionary.contacts;
    }

    if (myDictionary.text !== undefined &&
      typeof myDictionary.text === 'boolean') {
      options.text = myDictionary.text;
    }

    if (myDictionary.id !== undefined &&
      typeof myDictionary.id === 'number') {
      options.id = myDictionary.id;
    }

    if (myDictionary.registeredTimer !== undefined &&
      typeof myDictionary.registeredTimer === 'boolean') {
      options.registeredTimer = myDictionary.registeredTimer;
    }

    if (myDictionary.repeat !== undefined &&
      typeof myDictionary.repeat === 'boolean') {
      options.repeat = myDictionary.repeat;
    }
    //////pass in the value in hours /////////
    if (myDictionary.intervalTime !== undefined &&
      typeof myDictionary.intervalTime === 'number') {
      options.intervalTime = myDictionary.intervalTime;
    }

    localStorage.setItem('ffosbrOptions', JSON.stringify(options));
    return options;
  };
}

module.exports = new Settings();
