/**
 * Media.getInternalStorage (modules/media.js)
 */
QUnit.test('Get internal storage', function(assert) {

  // The function 'getInternalStorage' must defined
  assert.notEqual(typeof ffosbr.square, undefined, '...exists');

  // The function 'getInternalStorage' must be a function
  assert.ok(isFunction(ffosbr.square), '...is a function');


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
    '...returns null from list of externals'
  );

  // TODO
});


/**
 * Media.getExternalStorage (modules/media.js)
 */
QUnit.test('Get external storage', function(assert) {

  //

  // The function 'square' must defined
  assert.notEqual(typeof ffosbr.square, undefined, 'Square exists');

  // The function 'square' must be a function
  assert.ok(isFunction(ffosbr.square), 'Square is a function');

  // It must return the square of any number input
  for (var i = -9; i < 10; ++i) {
    // Compare our library function against literal squaring
    // 'strictEquals' enforces triple-equality ('===' vs '==')
    assert.strictEqual(ffosbr.square(i), i * i, 'square of ' + i + ' = ' + (i * i));
  }
});


/**
 * Media.get (modules/media.js)
 */
QUnit.test('Get media from storage', function(assert) {

  //

  // The function 'square' must defined
  assert.notEqual(typeof ffosbr.square, undefined, 'Square exists');

  // The function 'square' must be a function
  assert.ok(isFunction(ffosbr.square), 'Square is a function');

  // It must return the square of any number input
  for (var i = -9; i < 10; ++i) {
    // Compare our library function against literal squaring
    // 'strictEquals' enforces triple-equality ('===' vs '==')
    assert.strictEqual(ffosbr.square(i), i * i, 'square of ' + i + ' = ' + (i * i));
  }
});
