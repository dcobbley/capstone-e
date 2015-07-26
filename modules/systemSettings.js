function SystemSettings() {

  this.systemsettings = {
    'accessibility.invert': false,
    'accessibility.screenreader': false,
    'alarm.enabled': false,
    'app.reportCrashes': 'ask',
    'app.update.interval': 86400,
    'audio.volume.alarm': 15,
    'audio.volume.bt_sco': 15,
    'audio.colume.dtmf': 15,
    'audio.volume.content': 15,
    'audio.volume.notification': 15,
    'audio.volume.tts': 15,
    'audio.volume.telephony': 5,
    'bluetooth.enabled': false,
    'bluetooth.debugging.enabled': false,
    'camera.shutter.enabled': true,
    'clear.remote-windows.data': false,
    'debug.grid.enabled': false,
    'debug.oop.disabled': false,
    'debug.fps.enabled': false,
    'debug.ttl.enabled': false,
    'debug.log-animations.enabled': false,
    'debug.paint-flashing.enabled': false,
    'debug.peformancedata.shared': false,
    'deviceinfo.firmware_revision': '',
    'deviceinfo.hardware': '',
    'deviceinfo.os': '',
    'deviceinfo.platform_build_id': '',
    'deviceinfo.platform_version': '',
    'deviceinfo.software': '',
    'deviceinfo.update_channel': '',
    'gaia.system.checkForUpdates': false,
    'general.useragent.updates.enabled': true,
    'geolocation.enabled': true,
    'keyboard.layouts.english': true,
    'keyboard.layouts.dvorak': false,
    'keyboard.layouts.otherlatins': false,
    'keyboard.layouts.cyrillic': false,
    'keyboard.layouts.arabic': false,
    'keyboard.layouts.hebrew': false,
    'keyboard.layouts.zhuyin': false,
    'keyboard.layouts.pinyin': false,
    'keyboard.layouts.greek': false,
    'keyboard.layouts.japanese': false,
    'keyboard.layouts.polish': false,
    'keyboard.layouts.portuguese': false,
    'keyboard.layouts.spanish': false,
    'keyboard.vibration': false,
    'keyboard.clicksound': false,
    'keyboard.autocorrect': true,
    'keyboard.wordsuggestion': true,
    'keyboard.current': 'en',
    'language.current': 'en-US',
    'lockscreen.passcode-lock.code': '0000',
    'lockscreen.passcode-lock.timeout': 0,
    'lockscreen.passcode-lock.enabled': false,
    'lockscreen.notifications-preview.enabled': true,
    'lockscreen.enabled': true,
    'lockscreen.locked': true,
    'lockscreen.unlock-sound.enabled': false,
    'mail.sent-sound.enabled': true,
    'message.sent-sound.enabled': true,
    'operatorvariant.mcc': '0',
    'operatorvariant.mnc': '0',
    'ril.iccInfo.mbdn': '',
    'ril.sms.strict7BitEncoding.enabled': false,
    'ril.cellbroadcast.searchlist': '',
    'debug.console.enabled': false,
    'phone.ring.keypad': true,
    'powersave.enabled': false,
    'powersave.threshold': 0,
    'privacy.donottrackheader.enabled': false,
    'ril.callwaiting.enabled': '',
    'ril.cf.enabled': false,
    'ril.data.enabled': false,
    'ril.data.apn': '',
    'ril.data.carrier': '',
    'ril.data.defaultServiceId': 0,
    'ril.data.passwd': '',
    'ril.data.httpProxyHost': '',
    'ril.data.httpProxyPort': 0,
    'ril.data.mmsc': '',
    'ril.data.mmsproxy': '',
    'ril.data.mmsport': 0,
    'ril.data.roaming_enabled': false,
    'ril.data.user': '',
    'ril.mms.apn': '',
    'ril.mms.carrier': '',
    'ril.mms.httpProxyHost': '',
    'ril.mms.httpProxyPort': '',
    'ril.mms.mmsc': '',
    'ril.mms.mmsport': '',
    'ril.mms.mmsproxy': '',
    'ril.mms.passwd': '',
    'ril.mms.user': '',
    'ril.radio.preferredNetworkType': '',
    'ril.radio.disabled': false,
    'ril.supl.apn': '',
    'ril.supl.carrier': '',
    'ril.supl.httpProxyHost': '',
    'ril.supl.httpProxyPort': '',
    'ril.supl.passwd': '',
    'ril.supl.user': '',
    'ril.sms.defaultServiceId': 0,
    'ril.telephony.defaultServiceId': 0,
    'ring.enabled': true,
    'screen.automatic-brightness': true,
    'screen.brightness': 1,
    'screen.timeout': 60,
    'tethering.usb.enabled': false,
    'tethering.usb.ip': '192.168.0.1',
    'tethering.usb.prefix': '24',
    'tethering.usb.dhcpserver.startip': '192.168.0.10',
    'tethering.usb.dhcpserver.endip': '192.168.0.30',
    'tethering.wifi.enabled': false,
    'tethering.wifi.ip': '192.168.1.1',
    'tethering.wifi.prefix': '24',
    'tethering.wifi.dhcpserver.startip': '192.168.1.10',
    'tethering.wifi.dhcpserver.endip': '192.168.1.30',
    'tethering.wifi.ssid': 'FirefoxHotspot',
    'tethering.wifi.security.type': 'open',
    'tethering.wifi.security.password': '1234567890',
    'tethering.wifi.connectedClients': 0,
    'tethering.usb.connectedClients': 0,
    'time.nitz.automatic-update.enabled': true,
    'time.timezone': '',
    'ums.enabled': false,
    'ums.mode': 0,
    'vibration.enabled': true,
    'wifi.enabled': true,
    'wifi.screen_off_timeout': 600000,
    'wifi.disabled_by_wakelock': false,
    'wifi.notification': false,
    'wifi.connect_via_settings': false,
    'icc.displayTextTimeout': 40000,
    'icc.inputTextTimeout': 40000
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
};


/**
 *@description: helper function to be used in write settings to device.
 * given one setting entry, this function gets the lock on that setting and updates 
 * the system setting based on our local copy.
 *
 */

SystemSettings.prototype.setField = function(settingName, settingValue) {
  var lock = navigator.mozSettings.createLock();
  var settingString = settingName + ': ' + settingValue;
  var settingObj = {
    settingName: settingValue
  };
  var result = lock.set(settingObj);

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
