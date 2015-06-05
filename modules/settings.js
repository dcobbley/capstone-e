function Settings() {
  var timeInMilliSec = 0;

  var options = {
    photos: false,
    videos: false,
    contacts: false,
    text: false,
    intervalTime: 0, // pass in value in hours
    id: 0,
    registeredTimer: false,
    repeat: false
  };



  Settings.prototype.Options = function(myDictionary) {
    if (!myDictionary) {
      return options;
    }


    if (myDictionary.photos !== undefined && typeof myDictionary.photos === "boolean") {
      options.photos = myDictionary.photos;
    }

    if (myDictionary.videos !== undefined && typeof myDictionary.videos === "boolean") {
      options.videos = myDictionary.videos;
    }

    if (myDictionary.contacts !== undefined && typeof myDictionary.contacts === "boolean") {
      options.contacts = myDictionary.contacts;
    }

    if (myDictionary.text !== undefined && typeof myDictionary.text === "boolean") {
      options.text = myDictionary.text;
    }

    if (myDictionary.id !== undefined && typeof myDictionary.id === "number") {
      options.id = myDictionary.id;
    }

    if (myDictionary.registeredTimer !== undefined && typeof myDictionary.registeredTimer === "boolean") {
      options.registeredTimer = myDictionary.registeredTimer;
    }

    if (myDictionary.repeat !== undefined && typeof myDictionary.repeat === "boolean") {
      options.repeat = myDictionary.repeat;
    }
    //////pass in the value in hours /////////
    if (myDictionary.intervalTime !== undefined && typeof myDictionary.intervalTime === "number") {
      timeInMilliSec = myDictionary.intervalTime * 1000 * 60 * 60;
      options.intervalTime = timeInMilliSec;
    }


    return options;

  };

}
module.exports = new Settings();
