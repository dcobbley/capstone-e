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

    if (typeof myDictionary.photos === 'boolean') {
      options.photos = myDictionary.photos;
    }

    if (typeof myDictionary.videos === 'boolean') {
      options.videos = myDictionary.videos;
    }

    if (typeof myDictionary.contacts === 'boolean') {
      options.contacts = myDictionary.contacts;
    }

    if (typeof myDictionary.text === 'boolean') {
      options.text = myDictionary.text;
    }

    if (typeof myDictionary.id === 'number') {
      options.id = myDictionary.id;
    }

    if (typeof myDictionary.registeredTimer === 'boolean') {
      options.registeredTimer = myDictionary.registeredTimer;
    }

    if (typeof myDictionary.repeat === 'boolean') {
      options.repeat = myDictionary.repeat;
    }

    //////pass in the value in hours /////////
    if (typeof myDictionary.intervalTime === 'number') {
      options.intervalTime = myDictionary.intervalTime;
    }

    localStorage.setItem('ffosbrOptions', JSON.stringify(options));
    return options;
  };
}

module.exports = new Settings();
