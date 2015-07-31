QUnit.test('Contacts', function(assert) {
  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');
  console.log('CONTACT TESTING IS NOW RUNNING');


  var sdcard = navigator.getDeviceStorages('sdcard')[1];


  ffosbr.contacts.onprogress = function() {
    console.log('Contacts is Still Working');
  };
  ffosbr.contacts.oncomplete = function() {
    console.log('Contacts is finished');
  };
  //ffosbr.contacts.backup();
  //ffosbr.contacts.backup();
  // ffosbr.contacts.getContactsFromSIM();

  //ffosbr.contacts.restore();

  console.log('END Test');


});
