var checkDefaults = function(assert) {
  // Check initialized values
  assert.strictEqual(ffosbr.history.history.photos.title,
    'Photos',
    'photos title set to \"Photos\"');
  assert.strictEqual(ffosbr.history.history.photos.lastBackupDate,
    '2015-06-20T19:00-0700',
    'photos lastBackupDate set to \"2015-06-20T19:00-0700\"');
  assert.strictEqual(ffosbr.history.history.photos.backupSize,
    0,
    'photos backupSize set to 0');

  assert.strictEqual(ffosbr.history.history.videos.title,
    'Videos',
    'videos title set to \"Videos\"');
  assert.strictEqual(ffosbr.history.history.videos.lastBackupDate,
    '2015-06-20T19:00-0700',
    'videos lastBackupDate set to \"2015-06-20T19:00-0700\"');
  assert.strictEqual(ffosbr.history.history.videos.backupSize,
    0,
    'videos backupSize set to 0');

  assert.strictEqual(ffosbr.history.history.music.title,
    'Music',
    'Music title set to \"Music\"');
  assert.strictEqual(ffosbr.history.history.music.lastBackupDate,
    '2015-06-20T19:00-0700',
    'Music lastBackupDate set to \"2015-06-20T19:00-0700\"');
  assert.strictEqual(ffosbr.history.history.music.backupSize,
    0,
    'music backupSize set to 0');

  assert.strictEqual(ffosbr.history.history.contacts.title,
    'Contacts',
    'contacts title set to \"Contacts\"');
  assert.strictEqual(ffosbr.history.history.contacts.lastBackupDate,
    '2015-06-20T19:00-0700',
    'contacts lastBackupDate set to \"2015-06-20T19:00-0700\"');
  assert.strictEqual(ffosbr.history.history.contacts.backupSize,
    0,
    'contacts backupSize set to 0');

  assert.strictEqual(ffosbr.history.history.messages.title,
    'Messages',
    'messages title set to \"Messages\"');
  assert.strictEqual(ffosbr.history.history.messages.lastBackupDate,
    '2015-06-20T19:00-0700',
    'messages lastBackupDate set to \"2015-06-20T19:00-0700\"');
  assert.strictEqual(ffosbr.history.history.messages.backupSize,
    0,
    'messages backupSize set to 0');
};

QUnit.test('History', function(assert) {
  // Save the user's previous history
  var oldHistory = ffosbr.history.get();
  ffosbr.history.set(ffosbr.history.getDefault());

  checkDefaults(assert);
  assert.strictEqual(ffosbr.history.validateAll(),
    true,
    'Validation returns true for default values');

  // Changes made without using set() are lost on load
  ffosbr.history.history.photos.title = 'HELLO';
  assert.strictEqual(ffosbr.history.history.photos.title,
    'HELLO',
    'History fields can be changed directly...');

  ffosbr.history.loadHistory();
  assert.strictEqual(ffosbr.history.history.photos.title,
    'Photos',
    'but changes that don\'t use set() don\'t persist');

  // Restore the user's previous history
  ffosbr.history.set(oldHistory);
});
