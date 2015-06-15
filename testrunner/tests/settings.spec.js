QUnit.test('Settings', function(assert) {

  assert.notEqual(ffosbr.settings.Options().photos, true, 'photos is false before call');
  assert.notEqual(ffosbr.settings.Options().videos, true, 'videos is false before call');
  assert.notEqual(ffosbr.settings.Options().contacts, true, 'contacts is false before call');
  assert.notEqual(ffosbr.settings.Options().text, true, 'text is false before call');
  assert.notEqual(ffosbr.settings.Options().intervalTime, 1, 'intervalTime is not 1 before call');
  assert.notEqual(ffosbr.settings.Options().id, 1, 'id is not 1 before call');
  assert.notEqual(ffosbr.settings.Options().registeredTimer, true, 'registeredTimer is false before call');
  assert.notEqual(ffosbr.settings.Options().repeat, true, 'repeat is false before call');


  ffosbr.settings.Options({
    photos: true,
    videos: true,
    contacts: true,
    text: true,
    intervalTime: 1, // pass in value in hours
    id: 1,
    registeredTimer: true,
    repeat: true
  });


  assert.equal(ffosbr.settings.Options().photos, true, 'photos is true after call');
  assert.equal(ffosbr.settings.Options().videos, true, 'videos is true after call');
  assert.equal(ffosbr.settings.Options().contacts, true, 'contacts is true after call');
  assert.equal(ffosbr.settings.Options().text, true, 'text is true after call');
  assert.equal(ffosbr.settings.Options().intervalTime, 3600000, 'intervalTime is 36000 s after call');
  assert.equal(ffosbr.settings.Options().id, 1, 'id is 1 after call');
  assert.equal(ffosbr.settings.Options().registeredTimer, true, 'registeredTimer is true after call');
  assert.equal(ffosbr.settings.Options().repeat, true, 'repeat is true after call');




});
