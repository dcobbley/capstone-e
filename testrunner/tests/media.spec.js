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

  assert.strictEquals(
    ffosbr.media.getInternalStorage(emptyStorage),
    null,
    '...returns null from empty list'
  );

  assert.strictEquals(
    ffosbr.media.getInternalStorage(onlyExternalStorages),
    null,
    '...returns null from list of only external storages'
  );

  assert.strictNotEquals(
    ffosbr.media.getInternalStorage(storages),
    null,
    '...returns DeviceStorage instance from storage list'
  );
});


/**
 * Media.getExternalStorage (modules/media.js)
 */
QUnit.test('Get external storage', function(assert) {
  // TODO
});


/**
 * Media.get (modules/media.js)
 */
QUnit.test('Get media from storage', function(assert) {
  //
});
