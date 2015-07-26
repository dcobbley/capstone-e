QUnit.test('systemSettings', function(assert) {

  ffosbr.systemSettings.loadFromDevice();
  ffosbr.systemSettings.writeSettingsToDevice();

});
