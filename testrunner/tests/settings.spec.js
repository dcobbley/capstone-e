QUnit.test('Settings', function(assert) {

  assert.notEqual(ffosbr.settings.options().photos, true, 'photos is false before call');
  assert.notEqual(ffosbr.settings.options().videos, true, 'videos is false before call');
  assert.notEqual(ffosbr.settings.options().contacts, true, 'contacts is false before call');
  assert.notEqual(ffosbr.settings.options().text, true, 'text is false before call');
  assert.notEqual(ffosbr.settings.options().intervalTime, 1, 'intervalTime is not 1 before call');
  assert.notEqual(ffosbr.settings.options().id, 1, 'id is not 1 before call');
  assert.notEqual(ffosbr.settings.options().registeredTimer, true, 'registeredTimer is false before call');
  assert.notEqual(ffosbr.settings.options().repeat, true, 'repeat is false before call');

  ffosbr.settings.options({
    photos: true,
    videos: true,
    contacts: true,
    text: true,
    intervalTime: 1, // pass in value in hours
    id: 1,
    registeredTimer: true,
    repeat: true
  });

  assert.equal(ffosbr.settings.options().photos, true, 'photos is true after call');
  assert.equal(ffosbr.settings.options().videos, true, 'videos is true after call');
  assert.equal(ffosbr.settings.options().contacts, true, 'contacts is true after call');
  assert.equal(ffosbr.settings.options().text, true, 'text is true after call');
  assert.equal(ffosbr.settings.options().intervalTime, 3600000, 'intervalTime is 36000 s after call');
  assert.equal(ffosbr.settings.options().id, 1, 'id is 1 after call');
  assert.equal(ffosbr.settings.options().registeredTimer, true, 'registeredTimer is true after call');
  assert.equal(ffosbr.settings.options().repeat, true, 'repeat is true after call');

  // Remove and readd ffosbr.js to test persistent storage
  var ffosbrScriptEle = document.getElementById('FFOSBR');
  ffosbrScriptEle.parentNode.removeChild(ffosbrScriptEle); 

  var headID = document.getElementsByTagName('head')[0];         
  var newScript = document.createElement('script');

  newScript.type = 'text/javascript';
  newScript.src = 'FFOSBR.js';
  headID.appendChild(newScript);

  newScript.onload = function () {
    assert.equal(ffosbr.settings.options().photos, true, 'photos is true after call');
    assert.equal(ffosbr.settings.options().videos, true, 'videos is true after call');
    assert.equal(ffosbr.settings.options().contacts, true, 'contacts is true after call');
    assert.equal(ffosbr.settings.options().text, true, 'text is true after call');
    assert.equal(ffosbr.settings.options().intervalTime, 3600000, 'intervalTime is 36000 s after call');
    assert.equal(ffosbr.settings.options().id, 1, 'id is 1 after call');
    assert.equal(ffosbr.settings.options().registeredTimer, true, 'registeredTimer is true after call');
    assert.equal(ffosbr.settings.options().repeat, true, 'repeat is true after call');
  };
});
