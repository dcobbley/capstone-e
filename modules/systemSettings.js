function SystemSettings() {

  this.systemsettings = {
    'accessibility.screenreader': null,
    'alarm.enabled': null,
    'app.update.interval': null,
    'audio.volume.alarm': null,
    'audio.volume.bt_sco': null,
    'audio.volume.dtmf': null,
    'audio.volume.content': null,
    'audio.volume.notification': null,
    'audio.volume.tts': null,
    'audio.volume.telephony': null,
    'bluetooth.enabled': null,
    'camera.shutter.enabled': null,
    'geolocation.enabled': null,
    'keyboard.vibration': null,
    'keyboard.clicksound': null,
    'keyboard.autocorrect': null,
    'keyboard.wordsuggestion': null,
    'lockscreen.passcode-lock.timeout': null,
    'lockscreen.notifications-preview.enabled': null,
    'lockscreen.enabled': null,
    'lockscreen.locked': null,
    'lockscreen.unlock-sound.enabled': null,
    'mail.sent-sound.enabled': null,
    'message.sent-sound.enabled': null,
    'phone.ring.keypad': null,
    'ring.enabled': null,
    'screen.automatic-brightness': null,
    'screen.brightness': null,
    'screen.timeout': null,
    'vibration.enabled': null,
    'wifi.enabled': null,
    'wifi.screen_off_timeout': null,
    'wifi.disabled_by_wakelock': null,
    'wifi.notification': null,
    'wifi.connect_via_settings': null,
    'icc.displayTextTimeout': null,
    'icc.inputTextTimeout': null
  };


}


/**
 *@description SystemSettings Constructor
 *
 */
SystemSettings.prototype.initialize = function() {

  try {
    this.loadFromDevice();
  } catch (err) {
    console.log('cannot initialize');
  }
};


/*
 *@Description: restores settings to the device from the SD card.
 *  calls media.get to get data from Sd card.
 *  calls writeToLocalStorage to save instance of systemsettings
 *  calls writeToDevice to transfer lcoal storage object to the device's settings
 *
 */

SystemSettings.prototype.restore = function() {
  var that = this;
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.systemsettings;


  /*
   *@Description: helper used in media.get.
   *  Reads the passed in file (from media.get) and saves it to
   *   the systemsettings.
   */

  var copyToSettings = function(file) {
    var filereader = new FileReader();

    settingsJSON = filereader.readAsText(file);

    filereader.onloadend = function(fileContents, error) {

      if (!error) {
        try {
          that.systemsettings = this.result;
        } catch (e) {
          console.error(e);
        }

      } else {
        console.error(error);
      }

    };

    filereader.onerror = function(error) {
      console.error('Failure: ' + error.name);
    };

  };

  var oncomplete = function() {
    console.log('successful restore');
  };


  ffosbr.media.get('sdcard1', path, copyToSettings, oncomplete);
  this.writeToLocalStorage();
  this.writeSettingsToDevice();
  console.log('system settings successfully restored');

};
/*
 *@Description: removes the systemsettings file from the sd card
 *  calls media.remove
 *
 *
 */

SystemSettings.prototype.clean = function() {
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.systemsettings + '/systemSettings.json';

  ffosbr.media.remove(path);

};

/*
 *@Description: backup the systemsettings object to SD card.
 *
 *
 *
 */
SystemSettings.prototype.backup = function() {
  var that = this;
  var path = ffosbr.settings.backupPaths.systemsettings + '/systemSettings.json';

  //this.clean();

  var settings = this.loadFromDevice();

  var settingsToWrite = new File([JSON.stringify(settings)], 'systemSettings.json', {
    type: 'text/json'
  });

  console.log(settingsToWrite);

  ffosbr.media.put('sdcard1', settingsToWrite, path);

};

/**
 *@description: helper function to be used in update field.
 *  Needed to allow access to this.systemsettings
 *
 *@params: pass in the name of the setting (field) and 
 *  the result from the lock.get (settingResult).
 */

SystemSettings.prototype.onsuccess = function(field, settingResult) {
  this.systemsettings[field] = settingResult[field];


};


/**
 *@description: helper function to be used in load settings. 
 * Given one setting entry from the system settings, we acquire the lock on that setting, and
 * copy it to our local copy of settings.
 *@access: public
 *@params: field is the name of the given setting
 *
 */

SystemSettings.prototype.updateField = function(field) {
  var lock = navigator.mozSettings.createLock();

  var setting = lock.get(field);


  setting.onsuccess = function() {
    ffosbr.systemSettings.onsuccess(field, setting.result);
  };

  setting.onerror = function() {
    console.warn('An error occured');
  };

};



/**
 *@description: load System Settings from device storage
 * save these settings to a JSON object
 *@access: public, requires 'settings' in manifest
 */
SystemSettings.prototype.loadFromDevice = function() {

  for (var field in this.systemsettings) {
    ffosbr.systemSettings.updateField(field);
  }

  return this.systemsettings;

};


/**
 *@description: After the settings have been loaded, call this function
 *  to write to local storage.
 *
 */

SystemSettings.prototype.writeToLocalStorage = function() {
  localStorage.setItem('ffosbrSystemSettings', JSON.stringify(this.systemsettings));
  console.log(this.systemsettings);
};


/**
 *@description: helper function to be used in write settings to device.
 * given one setting entry, this function gets the lock on that setting and updates 
 * the system setting based on our local copy.
 *
 */

SystemSettings.prototype.setField = function(settingName, settingValue) {
  console.log(settingName);
  console.log(settingValue);
  var lock = navigator.mozSettings.createLock();
  var jsonStr = '{"' + settingName + '":' + settingValue + '}';

  console.log(jsonStr);
  console.log(JSON.parse(jsonStr));
  var result = lock.set(JSON.parse(jsonStr));

  result.onsuccess = function() {
    console.log('successfully updated setting');
  };
  result.onerror = function() {
    console.log('failed to update setting');
  };
};

/**
 *@description: This function first loads our backed up copy of system settings.
 *  We then update the system settings based on what our backed up copy has stored.
 *
 *
 */


SystemSettings.prototype.writeSettingsToDevice = function() {

  var retrievedSettings = localStorage.getItem('ffosbrSystemSettings');

  if (retrievedSettings !== null) {
    try {
      retrievedSettings = JSON.parse(retrievedSettings);
    } catch (err) {
      console.log('cannot fetch object');
      localStorage.setItem('ffosbrSystemSettings', null);
      throw new Error('Fetched an invalid options object from local storage');
    }
  } else {
    console.log('retrievedSettings is null');
  }

  for (var field in retrievedSettings) {
    ffosbr.systemSettings.setField(field, retrievedSettings[field]);
  }

};

/**
 *@Description: this function handles changes in system settings.
 *  When a setting is changed, this function should be called to update our local version of system settings.
 *  This way we can consistently have the most up to date version of system settings.
 *
 *  APPLICATION SIDE MUST HAVE A LISTENER FOR settingchange EVENT!
 *  navigator.mozSettings.onsettingchange = function(event) {
 *    ffosbr.systemSettings.updateOnSettingChange(event);
 *
 *   }
 *  then pass that event to this function.
 *
 *
 * NEEDS TO BE TESTED 
 */

SystemSettings.prototype.updateOnSettingChange = function(event) {
  var settingName = event.settingName;
  var settingValue = event.settingValue;

  this.systemsettings[settingName] = settingValue;
  ffosbr.systemSettings.writeToLocalStorage();

};


module.exports = new SystemSettings();
