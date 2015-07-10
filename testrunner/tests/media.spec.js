/**
 * Media.getInternalStorage (modules/media.js)
 */
QUnit.test('Get internal storage', function(assert) {

  // The function 'getInternalStorage' must defined
  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');

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

  assert.strictEqual(
    ffosbr.media.getInternalStorage(emptyStorage).store,
    null,
    '...returns null from empty list'
  );

  assert.strictEqual(
    ffosbr.media.getInternalStorage(onlyExternalStorages).store,
    null,
    '...returns null from list of only external storages'
  );

  console.log(ffosbr.media.getInternalStorage(storages).store);
  assert.notStrictEqual(
    ffosbr.media.getInternalStorage(storages).store,
    null,
    '...returns DeviceStorage instance from storage list'
  );
});


/**
 * Media.getExternalStorage (modules/media.js)
 */
QUnit.test('Get external storage', function(assert) {
  // The function 'getExternalStorage' must defined
  assert.notEqual(typeof ffosbr.media.getExternalStorage, 'undefined', '...exists');

  // The function 'getExternalStorage' must be a function
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

  assert.strictEqual(
    ffosbr.media.getExternalStorage(emptyStorage).store,
    null,
    '...returns null from empty list'
  );

  assert.strictEqual(
    ffosbr.media.getExternalStorage(onlyInternalStorages).store,
    null,
    '...returns null from list of only external storages'
  );

  assert.notStrictEqual(
    ffosbr.media.getExternalStorage(storages).store,
    null,
    '...returns DeviceStorage instance from storage list'
  );
});

/**
 * Media.get (modules/media.js)
 */
QUnit.test('Get media from storage', function(assert) {

  var callback = function(item) {
    if (item) {
      console.log('Item passed to generic callback:');
      console.log(item);
    }
  };

  assert.raises(
    function() {
      ffosbr.media.get(true, callback());
    },
    new Error('Missing or invalid media type'),
    '...throws error when passed invalid type param'
  );

  assert.raises(
    function() {
      ffosbr.media.get('hello', true);
    },
    new Error('Missing or invalid callback'),
    '...throws error when passed invalid callback'
  );

  // Get sdcard1 without card should throw error.
  assert.raises(
    function() {

      ffosbr.media.get('sdcard1', callback);

    },
    new Error('Attempt to read from an invalid storage. Abort.'),
    '...throws error when there is not an external sdcard'
  );

  // NOTE: Media.get() as no return value, so if it worked and doesn't
  // throw an error, the return value should be "undefined".
  assert.strictEqual(
    ffosbr.media.get('pictures', callback),
    undefined,
    '...test should not throw error when called properly'
  );
});

/**
 * Media.put (modules/media.js)
 */
QUnit.test('Put media to storage', function(assert) {


  var helloFile = new File(['hello'], 'hello');

  assert.raises(
    function() {
      ffosbr.media.put(true, helloFile, 'hello');
    },
    new Error('Missing or invalid media type'),
    '...throws error when type is not a string'
  );


  assert.raises(
    function() {
      ffosbr.media.put('pictures', true, 'hello');
    },
    new Error('Missing or invalid file'),
    '...throws error when file is not a File object'
  );


  assert.raises(
    function() {
      ffosbr.media.put('pictures', helloFile, true);
    },
    new Error('Missing or invalid write destination'),
    '...throws error when write destination is not a string'
  );

  assert.raises(
    function() {
      ffosbr.media.put('pictures', helloFile, true);
    },
    new Error('Missing or invalid write destination'),
    '...throws error when write destination is not a string'
  );

  assert.raises(
    function() {
      ffosbr.media.put('pictures', helloFile, 'hello', true);
    },
    new Error('Callback is not a function'),
    '...throws error when oncomplete is not a function'
  );

  assert.raises(
    function() {
      ffosbr.media.put('sdcard1', helloFile, 'hello');
    },
    new Error('Attempt to write to an invalid storage. Abort.'),
    '...throws error when attempting to write to a missing external sdcard'
  );



  //TODO
  //destination is ignored unless type is sdcard1 make sure it's ignored
  //make sure dest affects where files are written ?? human test


});

/**
 * Media.remove (modules/media.js)
 */
QUnit.test('Remove media from external storage', function(assert) {

  // The function 'remove' must defined
  assert.notEqual(typeof ffosbr.media.remove, 'undefined', '...exists');

  // The function 'remove' must be a function
  assert.ok(isFunction(ffosbr.media.remove), '...is a function');

  //File name param must be string
  assert.raises(
    function() {
      ffosbr.media.remove(true);
    },
    new Error('Missing or invalid filename'),
    '...throws error when filename is not a string'
  );

  //oncomplete param must be a function
  assert.raises(
    function() {
      ffosbr.media.remove('hello', true);
    },
    new Error('Callback is not a function'),
    '...throws error oncomplete is not a fuction'
  );

  //Must fail if there is not an external sdcard
  assert.raises(
    function() {
      ffosbr.media.remove('hello');
    },
    new Error('Attempt to delete from invalid storage. Abort.'),
    '...throws error when there is not an external sdcard'
  );


  //TODO
  //only remove from external

  //call back should be called if successfull and called with error on failure


});

/**
 * Media.getFreeBytes (modules/media.js)
 */
QUnit.test('Get number of available bytes from storage device', function(assert) {

  var storage = navigator.getDeviceStorage('sdcard');
  var invalidStorage = 'not a device storage';
  var invalidCallback = 'not a callback';

  // The function 'getFreeBytes' must defined
  assert.notEqual(typeof ffosbr.media.getFreeBytes, 'undefined', '...exists');

  // The function 'getFreeBytes' must be a function
  assert.ok(isFunction(ffosbr.media.getFreeBytes), '...is a function');

  // "storage" must be a DeviceStorage instance
  assert.raises(
    function() {
      ffosbr.media.getFreeBytes(invalidStorage, function() {});
    },
    new Error('Missing or invalid storage device'),
    '...throws error when storage is not a DeviceStorage instance'
  );

  // "oncomplete" callback must be a function
  assert.raises(
    function() {
      ffosbr.media.getFreeBytes(storage, invalidCallback);
    },
    new Error('Missing or invalide callback'),
    '...throws error oncomplete is not a fuction'
  );

  // Tests success case
  var file = new File(['foo'], 'size3.txt', {
    type: 'text/plain'
  });
  var fileSizeInBytes = file.size;
  var startFreeBytes = 0;
  var endFreeBytes = 0;

  ffosbr.media.getFreeBytes(storage, function(bytesBefore, errBefore) {
    if (errBefore) {
      alert(errBefore.message);
      throw new Error('Failed to get initial free bytes from ' + storage.name);
    }

    // free bytes before writing file
    startFreeBytes = bytesBefore;

    ffosbr.media.put('sdcard', file, 'backup/test', function(putErr) {

      if (putErr) {
        alert('Put failed: ' + putErr.message);
        throw new Error('Failed put file to ' + storage.name);
      }

      ffosbr.media.getFreeBytes(storage, function(bytesAfter, errAfter) {
        if (errAfter) {
          alert(errAfter.message);
          throw new Error('Failed to get final free bytes from ' + storage.name);
        }

        // free bytes after writing file
        endFreeBytes = bytesAfter;

        alert('before = ' + bytesBefore); //rmv
        alert('after = ' + bytesAfter);
        alert('difference = ' + (bytesAfter - bytesBefore));
        alert('file = ' + fileSizeInBytes);

        assert.strictEqual(endFreeBytes - startFreeBytes, fileSizeInBytes, '...works');
      });
    });
  });
});
