QUnit.test('Contacts', function(assert) {
  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');
  console.log('CONTACT TESTING IS NOW RUNNING');
  
  ffosbr.contacts.backup();
  ffosbr.contacts.restore();
  console.log('running contacts backup');


});
