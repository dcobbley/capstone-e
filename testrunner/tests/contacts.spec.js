QUnit.test('Contacts', function(assert) {
  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');
  console.log('CONTACT TESTING IS NOW RUNNING');


  var sdcard = navigator.getDeviceStorages('sdcard')[1];



  // ffosbr.contacts.getContactsFromSIM();

  //ffosbr.contacts.restore();

  console.log('END Test');


});
