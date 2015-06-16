/**
 * Media.getInternalStorage (modules/media.js)
 */
QUnit.test('Get internal storage', function(assert) {

  // The function 'getInternalStorage' must defined
  assert.notEqual(typeof ffosbr.media.getInternalStorage, undefined, '...exists');

  // The function 'getInternalStorage' must be a function
  assert.ok(isFunction(ffosbr.media.getInternalStorage), '...is a function');


  // It returns null when no internal storage is found
  var storages = navigator.getDeviceStorages('sdcard');
  var emptyStorage = [];
  var onlyExternalStorages = [];

  for (var i = 0; i < storages.length; ++i) {
    if (storages[i].isRemovable === true) {
      onlyExternalStorages.push(storages[i]);
    }
  }
  
  console.log(ffosbr.media.getInternalStorage(emptyStorage));

  assert.strictEqual(
    ffosbr.media.getInternalStorage(emptyStorage)['store'],
    null,
    '...returns null from empty list'
  );

  assert.strictEqual(
    ffosbr.media.getInternalStorage(onlyExternalStorages)['store'],
    null,
    '...returns null from list of only external storages'
  );

  assert.notStrictEqual(
    ffosbr.media.getInternalStorage(storages)['store'],
    null,
    '...returns DeviceStorage instance from storage list'
  );
});


/**
 * Media.getExternalStorage (modules/media.js)
 */
QUnit.test('Get external storage', function(assert) {
  // The function 'getInternalStorage' must defined
  assert.notEqual(typeof ffosbr.media.getExternalStorage, undefined, '...exists');

  // The function 'getInternalStorage' must be a function
  assert.ok(isFunction(ffosbr.media.getExternalStorage), '...is a function');


  // It returns null when no internal storage is found
  var storages = navigator.getDeviceStorages('sdcard');
  var emptyStorage = [];
  var onlyInternalStorages = [];

  for (var i = 0; i < storages.length; ++i) {
    if (storages[i].isRemovable === false) {
      onlyInternalStorages.push(storages[i]);
    }
  }
  
  console.log(ffosbr.media.getExternalStorage(emptyStorage));

  assert.strictEqual(
    ffosbr.media.getExternalStorage(emptyStorage)['store'],
    null,
    '...returns null from empty list'
  );

  assert.strictEqual(
    ffosbr.media.getExternalStorage(onlyInternalStorages)['store'],
    null,
    '...returns null from list of only external storages'
  );

  assert.notStrictEqual(
    ffosbr.media.getExternalStorage(storages)['store'],
    null,
    '...returns DeviceStorage instance from storage list'
  );
});


/**
 * Media.get (modules/media.js)
 */
QUnit.test('Get media from storage', function(assert) {
  //
});
