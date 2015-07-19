QUnit.test('Settings', function(assert) {

  // Check Default settings values
  assert.strictEqual(ffosbr.settings.options.photos, true, 'photos is true before setting');
  assert.strictEqual(ffosbr.settings.options.videos, true, 'videos is true before setting');
  assert.strictEqual(ffosbr.settings.options.contacts, true, 'contacts is true before setting');
  assert.strictEqual(ffosbr.settings.options.messages, true, 'messages is true before setting');
  assert.strictEqual(ffosbr.settings.options.intervalTime, 24, 'intervalTime is 24 before setting');
  assert.strictEqual(ffosbr.settings.options.id, 0, 'id is 0 before setting');
  assert.strictEqual(ffosbr.settings.options.registeredTimer, false, 'registeredTimer is false before setting');
  assert.strictEqual(ffosbr.settings.options.repeat, true, 'repeat is true before setting');


  // Tests Settings.get fetching single field
  assert.strictEqual(ffosbr.settings.get('photos'), ffosbr.settings.options.photos, 'Get returns valid photos value');

  // Tests Settings.get fetching entire options
  assert.strictEqual(objectsMatch(
    ffosbr.settings.get(),
    ffosbr.settings.options
  ), true, 'Get returns valid options object');

  // Tests Settings.validate using single field
  var previousPhotosValue = ffosbr.settings.options.photos;
  assert.strictEqual(ffosbr.settings.validate('photos'), true, 'Validate returns true for valid single field');
  ffosbr.settings.options.photos = 42; // <-- Thomas misses Mark Jones
  assert.strictEqual(ffosbr.settings.validate('photos'), false, 'Validate returns false for invalid single field');
  ffosbr.settings.options.photos = previousPhotosValue;

  // Tests Settings.validate using options object
  assert.strictEqual(ffosbr.settings.validate(), true, 'Validate returns true for valid options object');
  ffosbr.settings.options.photos = 42; // <-- Thomas misses Mark Jones
  assert.strictEqual(ffosbr.settings.validate(), false, 'Validate returns false for invalid options object');
  ffosbr.settings.options.photos = previousPhotosValue;

  // Tests Settings.validate using potentialOptions object
  assert.strictEqual(ffosbr.settings.validate({
    photos: false
  }), true, 'Validate returns true for valid potentialOptions object');
  assert.strictEqual(ffosbr.settings.validate({
    photos: 42
  }), false, 'Validate returns false for invalid potentialOptions object');


  // Invert default values
  ffosbr.settings.set({
    photos: false,
    videos: false,
    contacts: false,
    messages: false,
    intervalTime: 1, // pass in value in hours
    id: 1,
    registeredTimer: true,
    repeat: false
  });

  // Check changes were made correctly
  assert.strictEqual(ffosbr.settings.options.photos, false, 'photos is false after setting');
  assert.strictEqual(ffosbr.settings.options.videos, false, 'videos is false after setting');
  assert.strictEqual(ffosbr.settings.options.contacts, false, 'contacts is false after setting');
  assert.strictEqual(ffosbr.settings.options.messages, false, 'messages is false after setting');
  assert.strictEqual(ffosbr.settings.options.intervalTime, 1, 'intervalTime is 1 hour after setting');
  assert.strictEqual(ffosbr.settings.options.id, 1, 'id is 1 after setting');
  assert.strictEqual(ffosbr.settings.options.registeredTimer, true, 'registeredTimer is true after setting');
  assert.strictEqual(ffosbr.settings.options.repeat, false, 'repeat is false after setting');

  // Check setting using key-value
  ffosbr.settings.set('photos', true);
  assert.strictEqual(ffosbr.settings.options.photos, true, 'Can set using with key-value');

  ffosbr.settings.set({
    photos: false
  });
  assert.strictEqual(ffosbr.settings.options.photos, false, 'Can set using subset of options object');

  // Revert all changes
  ffosbr.settings.options.photos = true;
  ffosbr.settings.options.videos = true;
  ffosbr.settings.options.contacts = true;
  ffosbr.settings.options.messages = true;
  ffosbr.settings.options.intervalTime = 24;
  ffosbr.settings.options.id = 0;
  ffosbr.settings.options.registeredTimer = false;
  ffosbr.settings.options.repeat = true;

  // Remove and readd ffosbr.js to test persistent storage
  // var ffosbrScriptEle = document.getElementById('FFOSBR');
  // var ffosbrParentNode = ffosbrScriptEle.parentNode;

  // ffosbrParentNode.removeChild(ffosbrScriptEle);

  // var newScript = document.createElement('script');
  // newScript.type = 'messages/javascript';
  // newScript.src = 'FFOSBR.js';

  //ffosbrParentNode.appendChild(newScript);

  // !!!
  // NOTE: This is asynchronous, so tests can't simply be run after this
  // expecting certain values. Either all Settings tests must be run before
  // this, or this test needs to be made synchronous. As more tests depend
  // on the values stored in settings, this test MUST be made synchronous.
  // !!!

  //newScript.onload = function() {
  // assert.strictEqual(ffosbr.settings.options.photos, false, 'photos is false after reloading');
  // assert.strictEqual(ffosbr.settings.options.videos, false, 'videos is false after reloading');
  // assert.strictEqual(ffosbr.settings.options.contacts, false, 'contacts is false after reloading');
  // assert.strictEqual(ffosbr.settings.options.messages, false, 'messages is false after reloading');
  // assert.strictEqual(ffosbr.settings.options.intervalTime, 1, 'intervalTime is 1 hour after reloading');
  // assert.strictEqual(ffosbr.settings.options.id, 1, 'id is 1 after reloading');
  // assert.strictEqual(ffosbr.settings.options.registeredTimer, true, 'registeredTimer is true after reloading');
  // assert.strictEqual(ffosbr.settings.options.repeat, false, 'repeat is false after reloading');
  ffosbr.settings.set({
    photos: false,
    videos: false,
    contacts: false,
    messages: false,
    intervalTime: 0.008, // pass in value in hours
    id: 1,
    registeredTimer: true,
    repeat: false
  });


  ffosbr.settings.load();

  assert.strictEqual(ffosbr.settings.options.photos, false, 'photos is false after reloading');
  assert.strictEqual(ffosbr.settings.options.videos, false, 'videos is false after reloading');
  assert.strictEqual(ffosbr.settings.options.contacts, false, 'contacts is false after reloading');
  assert.strictEqual(ffosbr.settings.options.messages, false, 'messages is false after reloading');
  assert.strictEqual(ffosbr.settings.options.intervalTime, 0.008, 'intervalTime is 0.08 hour after reloading');
  assert.strictEqual(ffosbr.settings.options.id, 1, 'id is 1 after reloading');
  assert.strictEqual(ffosbr.settings.options.registeredTimer, true, 'registeredTimer is true after reloading');
  assert.strictEqual(ffosbr.settings.options.repeat, false, 'repeat is false after reloading');


  ffosbr.settings.timerBackup();



  /*
    // Reset default settings for next test run
    ffosbr.settings.set({
      photos: true,
      videos: true,
      contacts: true,
      messages: true,
      intervalTime: 24, // pass in value in hours
      id: 0,
      registeredTimer: false,
      repeat: true
    });
  */
});
