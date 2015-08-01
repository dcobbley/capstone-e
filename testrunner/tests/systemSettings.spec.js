QUnit.test('systemSettings', function(assert) {

  console.log(ffosbr.systemSettings.loadFromDevice());

  ffosbr.systemSettings.writeToLocalStorage();

  ffosbr.systemSettings.writeSettingsToDevice();

  console.log(ffosbr.systemSettings.loadFromDevice());


});
