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

  }
};

/**
 *@description: load System Settings from device storage
 * save these settings to a JSON object
 *@access: public, requires 'settings' in manifest
 */
SystemSettings.prototype.loadFromDevice = function() {
  updateField = function(field) {
    var lock = navigator.mozSettings.createLock();
    var setting = lock.get(field);

    setting.onsuccess = function() {
      ffosbr.systemSettings.systemsettings[field] = setting.result[field];
      console.log('success: ' + JSON.stringify(setting.result));
    };

    setting.onerror = function() {
      console.warn('An error occured: ' + JSON.stringify(setting.result));
    };

  };


  // for (var field in this.systemsettings) {
  var count = 0;
  for (var field in ffosbr.systemSettings.systemsettings) {
    console.log(field);
    count++;
    updateField(field);
  }

  console.log(count);

  localStorage.setItem('ffosbrSystemSettings', JSON.stringify(ffosbr.systemSettings.systemsettings));
};


SystemSettings.prototype.writeSettingsToDevice = function() {

  var backedUpSettings = localStorage.getItem('ffosbrSystemSettings');
  console.log(JSON.parse(backedUpSettings));

};




module.exports = new SystemSettings();
