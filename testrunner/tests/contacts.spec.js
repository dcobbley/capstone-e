QUnit.test('Contacts', function(assert) {

  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');

  var sdcard = navigator.getDeviceStorages('sdcard')[1];

  // ffosbr.contacts.getContactsFromSIM();
  // ffosbr.contacts.restore();
});
