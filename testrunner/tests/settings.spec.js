QUnit.test('Example: settings', function(assert) {

  // The function 'settings' must defined
  assert.notEqual(typeof ffosbr.settings, undefined, 'Settings exists');

  // The function 'settings' must be a function
  //assert.ok(isFunction(ffosbr.settings), 'Settings is a function');

  //passing in ('photos', true) sets photos to true
  assert.notEqual(backupTypes.photos, true, 'photos is false before function call');
  ffosbr.BackupItems('photos', true);
  assert.equal(backupTypes.photos, true, 'photos is true after function call');

  //passing in ('videos', true) sets videos to true
  assert.notEqual(backupTypes.videos, true, 'videos is false before function call');
  ffosbr.BackupItems('videos', true);
  assert.equal(backupTypes.videos, true, 'videos is true after function call');

  //passing in ('contacts', true) sets contacts to true
  assert.notEqual(backupTypes.contacts, true, 'contacts is false before function call');
  ffosbr.BackupItems('contacts', true);
  assert.equal(backupTypes.contacts, true, 'contacts is true after function call');

  //passing in ('photos', true) sets photos to true
  assert.notEqual(backupTypes.text, true, 'text is false before function call');
  ffosbr.BackupItems('text', true);
  assert.equal(backupTypes.text, true, 'text is true after function call');


  //passing in a value in hours returns a value in millisecs
  assert.equal(backupTimes.intervalTime, null, 'intervalTime is null before setting');
  ffosbr.BackupTimer('intervalTime', 5);
  assert.notEqual(backupTimes.intervalTime, 5, 'intervalTime is not equal to 5 hours');
  assert.equal(backupTimes.intervalTime, 18000000, '5 hours is equal to 18 M milliseconds. conversion is correct.');



});
