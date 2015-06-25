QUnit.test('Settings', function(assert) {

  assert.equal(ffosbr.settings.options().photos, true, 'photos is true before setting');
  assert.equal(ffosbr.settings.options().videos, true, 'videos is true before setting');
  assert.equal(ffosbr.settings.options().contacts, true, 'contacts is true before setting');
  assert.equal(ffosbr.settings.options().text, true, 'text is true before setting');
  assert.equal(ffosbr.settings.options().intervalTime, 24, 'intervalTime is 24 before setting');
  assert.equal(ffosbr.settings.options().id, 0, 'id is 0 before setting');
  assert.equal(ffosbr.settings.options().registeredTimer, false, 'registeredTimer is false before setting');
  assert.equal(ffosbr.settings.options().repeat, true, 'repeat is true before setting');

  ffosbr.settings.options({
    photos: false,
    videos: false,
    contacts: false,
    text: false,
    intervalTime: 1, // pass in value in hours
    id: 1,
    registeredTimer: true,
    repeat: false
  });

  assert.equal(ffosbr.settings.options().photos, false, 'photos is false after setting');
  assert.equal(ffosbr.settings.options().videos, false, 'videos is false after setting');
  assert.equal(ffosbr.settings.options().contacts, false, 'contacts is false after setting');
  assert.equal(ffosbr.settings.options().text, false, 'text is false after setting');
  assert.equal(ffosbr.settings.options().intervalTime, 1, 'intervalTime is 1 hour after setting');
  assert.equal(ffosbr.settings.options().id, 1, 'id is 1 after setting');
  assert.equal(ffosbr.settings.options().registeredTimer, true, 'registeredTimer is true after setting');
  assert.equal(ffosbr.settings.options().repeat, false, 'repeat is false after setting');

  // Remove and readd ffosbr.js to test persistent storage
  var ffosbrScriptEle = document.getElementById('FFOSBR');
  var ffosbrParentNode = ffosbrScriptEle.parentNode;

  ffosbrParentNode.removeChild(ffosbrScriptEle);

  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = 'FFOSBR.js';

  ffosbrParentNode.appendChild(newScript);

  newScript.onload = function() {
    assert.equal(ffosbr.settings.options().photos, false, 'photos is false after reloading');
    assert.equal(ffosbr.settings.options().videos, false, 'videos is false after reloading');
    assert.equal(ffosbr.settings.options().contacts, false, 'contacts is false after reloading');
    assert.equal(ffosbr.settings.options().text, false, 'text is false after reloading');
    assert.equal(ffosbr.settings.options().intervalTime, 1, 'intervalTime is 1 hour after reloading');
    assert.equal(ffosbr.settings.options().id, 1, 'id is 1 after reloading');
    assert.equal(ffosbr.settings.options().registeredTimer, true, 'registeredTimer is true after reloading');
    assert.equal(ffosbr.settings.options().repeat, false, 'repeat is false after reloading');

    // Reset default settings for next test run
    ffosbr.settings.options({
      photos: true,
      videos: true,
      contacts: true,
      text: true,
      intervalTime: 24, // pass in value in hours
      id: 0,
      registeredTimer: false,
      repeat: true
    });
  };
});
