QUnit.test('Example: settings', function(assert) {

  // The function 'settings' must defined
  assert.notEqual(typeof ffosbr.settings, undefined, 'Settings exists');

  // The function 'settings' must be a function
  //assert.ok(isFunction(ffosbr.settings), 'Settings is a function');

  //passing in ('photos', true) sets photos to true
  assert.notEqual(options.photos, true, 'photos is false before function call');
  ffosbr.Options({
    photos: true
  });
  assert.equal(options.photos, true, 'photos is true after function call');

  //passing in ('videos', true) sets videos to true
  assert.notEqual(options.videos, true, 'videos is false before function call');
  ffosbr.Options({
    videos: true
  });
  assert.equal(options.videos, true, 'videos is true after function call');

  //passing in ('contacts', true) sets contacts to true
  assert.notEqual(options.contacts, true, 'contacts is false before function call');
  ffosbr.Options({
    contacts: true
  });
  assert.equal(options.contacts, true, 'contacts is true after function call');

  //passing in ('photos', true) sets photos to true
  assert.notEqual(options.text, true, 'text is false before function call');
  ffosbr.Options({
    text: true
  });
  assert.equal(options.text, true, 'text is true after function call');


  //passing in a value in hours returns a value in millisecs
  assert.equal(options.intervalTime, null, 'intervalTime is null before setting');
  ffosbr.Options({
    intervalTime: 5
  });
  assert.notEqual(options.intervalTime, 5, 'intervalTime is not equal to 5 hours');
  assert.equal(options.intervalTime, 18000000, '5 hours is equal to 18 M milliseconds. conversion is correct.');

  //set everything back to null in one shot
  ffosbr.Options({
    photos: null,
    videos: null,
    contacts: null,
    text: null,
    intervalTime: null,
    id: null,
    registeredTimer: null,
    repeat: null
  });
  for (var i in options) {
    assert.equal(options.i, null, i + ' is null');
  }
});
