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
 *@Description: removes the systemsettings file from the sd card
 *  calls media.remove
 *
 *
 */

SystemSettings.prototype.clean = function(oncomplete) {
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.systemsettings + '/systemSettings.json';

  ffosbr.media.remove(path, function(err) {
    if (err !== undefined) {
      ffosbr.history.set('systemSettings', {
        title: 'SystemSettings',
        lastBackupDate: null,
        backupSize: 0,
      });
    }

    oncomplete('systemSettings', err);
  });
};


/*
 *@Description: backup the systemsettings object to SD card.
 *
 *
 *
 */
SystemSettings.prototype.backup = function(oncomplete) {
  var that = this;
  var path = ffosbr.settings.backupPaths.systemsettings + '/systemSettings.json';

  var settings = this.loadFromDevice();

  var settingsToWrite = new File([JSON.stringify(settings)], 'systemSettings.json', {
    type: 'text/json'
  });

  ffosbr.media.put('sdcard1', settingsToWrite, path, function(err) {
    if (err !== undefined) {
      ffosbr.history.set('systemSettings', {
        title: 'SystemSettings',
        lastBackupDate: new Date(),
        backupSize: settingsToWrite.size,
      });
    }

    oncomplete('systemSettings', err);
  });
};


/*
 *@Description: restores settings to the device from the SD card.
 *  calls media.get to get data from Sd card.
 *  calls writeToLocalStorage to save instance of systemsettings
 *  calls writeToDevice to transfer lcoal storage object to the device's settings
 *
 */

SystemSettings.prototype.restore = function(oncomplete) {
  var path = '/sdcard1/' + ffosbr.settings.backupPaths.systemsettings;

  ffosbr.media.get('sdcard1', path, copyToSettings, oncomplete);
  this.writeSettingsToDevice(JSON.stringify(this.systemsettings));
  console.log('system settings successfully restored');

  oncomplete('systemSettings');
};


/*
 *@Description: helper used in media.get.
 *  Reads the passed in file (from media.get) and saves it to
 *   the systemsettings.
 */

var copyToSettings = function(file) {
  var that = this;
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

/*
 *@Description: helper function used in media.get
 *
 *
 */

var oncomplete = function() {
  console.log('successful restore');
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
 *@description: This function first loads our backed up copy of system settings.
 *  We then update the system settings based on what our backed up copy has stored.
 *
 *
 */


SystemSettings.prototype.writeSettingsToDevice = function(settings) {

  var retrievedSettings = settings;

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

module.exports = new SystemSettings();
