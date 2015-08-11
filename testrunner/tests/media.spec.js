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
    ffosbr.media.getInternalStorage(emptyStorage),
    null,
    '...returns null given an empty list'
  );

  assert.strictEqual(
    ffosbr.media.getInternalStorage(onlyExternalStorages),
    null,
    '...returns null given a list of only external storages'
  );

  var desiredResult = storages.length >= 1;
  var result = ffosbr.media.getInternalStorage(storages) instanceof DeviceStorage;
  assert.strictEqual(
    result, desiredResult,
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
    ffosbr.media.getExternalStorage(emptyStorage),
    null,
    '...returns null from empty list'
  );

  assert.strictEqual(
    ffosbr.media.getExternalStorage(onlyInternalStorages),
    null,
    '...returns null from list of only internal storages'
  );

  var desiredResult = storages.length >= 2 ? true : false;
  var result = ffosbr.media.getExternalStorage(storages) instanceof DeviceStorage;
  assert.strictEqual(
    result, desiredResult,
    '...returns DeviceStorage instance from storage list'
  );
});

/**
 * Media.get (modules/media.js)
 */
QUnit.test('Get media from storage', function(assert) {

  var storages = navigator.getDeviceStorages('sdcard');

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
  // Note: When the result of the unit test is "SDCARD1 PRESENT",
  // it indicates that the test cannot be truly run because there
  // is an external sdcard, and there's no use faking it.
  ffosbr.media.get('sdcard1', function(file, err) {
    assert.strictEqual(
      (err ? err.message : 'SDCARD1 PRESENT'),
      'Attempt to read from an invalid storage. Abort.',
      '...throws error when there is not an external sdcard'
    );
  });

  // NOTE: Media.get() has no return value, so if it worked and doesn't
  // throw an error, the return value should be "undefined".
  var desiredResult = storages.length >= 2 ? undefined : 'Attempt to read from an invalid storage. Abort.';
  ffosbr.media.get('sdcard1', function(file, err) {
    assert.strictEqual(
      (desiredResult === undefined ? err : err.message),
      desiredResult,
      '...test should not throw error when called properly'
    );
  });
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

  ffosbr.media.put('sdcard1', helloFile, 'hello', function(err) {
    assert.strictEqual(
      (err ? err.message : 'SDCARD1 PRESENT'),
      'Attempt to write to an invalid storage. Abort.',
      '...throws error when there is not an external sdcard'
    );
  });


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
    '...throws error oncomplete is not a function'
  );

  //Must fail if there is not an external sdcard
  // assert.raises(
  //   function() {
  //     ffosbr.media.remove('hello');
  //   },
  //   new Error('Attempt to delete from invalid storage. Abort.'),
  //   '...throws error when there is not an external sdcard'
  // );


  ffosbr.media.remove('hello', function(err) {
    assert.strictEqual(
      (err ? err.message : 'SDCARD1 PRESENT'),
      'Attempt to delete from invalid storage. Abort.',
      '...throws error when there is not an external sdcard'
    );
  });


  //TODO
  //only remove from external

  //call back should be called if successfull and called with error on failure


});

/**
 * Media.getFreeBytes (modules/media.js)
 */
// QUnit.test('Get number of available bytes from storage device', function(assert) {

//   var storage = navigator.getDeviceStorages('sdcard')[0];
//   var invalidStorage = 'not a device storage';
//   var invalidCallback = 'not a callback';

//   // The function 'getFreeBytes' must defined
//   assert.notEqual(typeof ffosbr.media.getFreeBytes, 'undefined', '...exists');

//   // The function 'getFreeBytes' must be a function
//   assert.ok(isFunction(ffosbr.media.getFreeBytes), '...is a function');

//   // "storage" must be a DeviceStorage instance
//   assert.raises(
//     function() {
//       ffosbr.media.getFreeBytes(invalidStorage, function() {});
//     },
//     new Error('Missing or invalid storage device'),
//     '...throws error when storage is not a DeviceStorage instance'
//   );

//   // "oncomplete" callback must be a function
//   assert.raises(
//     function() {
//       ffosbr.media.getFreeBytes(storage, invalidCallback);
//     },
//     new Error('Missing or invalide callback'),
//     '...throws error oncomplete is not a function'
//   );

//   var startFreeBytes = 0;
//   var endFreeBytes = 0;

//   ffosbr.media.getFreeBytes(storage, function(bytesBefore, errBefore) {

//     if (errBefore) {
//       throw new Error('Failed to get initial free bytes from ' + storage.storageName);
//     }

//     var content = '1234567890';
//     var filename = 'test_size' + content.length + '.txt';
//     var file = new File([content], filename, {
//       type: 'text/plain'
//     });

//     // free bytes before writing file
//     startFreeBytes = bytesBefore;

//     // delete last generated test_sizeX.txt file before testing.
//     var request = storage.delete('backup/test' + file.name);

//     // test success case
//     request.onsuccess = function() {

//       var fileSizeInBytes = file.size;

//       // Get the number of initial free bytes
//       ffosbr.media.getFreeBytes(storage, function(sizeAfterDelete) {

//         startFreeBytes = sizeAfterDelete;

//         // Write our test file to the storage
//         ffosbr.media.put('sdcard', file, 'backup/test/' + file.name, function(putErr) {

//           if (putErr) {
//             console.error(new Error('Can\'t write to ' + storage.storageName + ': ' + putErr.message));
//             console.error('Cannot test available space.');
//           }

//           // blockSize is set when formatting SD card (default value is 4KB)
//           ffosbr.media.checkBlockSize(storage, function(blockSize) {
//             assert.strictEqual(startFreeBytes - endFreeBytes, Math.ceil(fileSizeInBytes / blockSize) * blockSize, '...works');
//           });
//         });
//       });
//     };

//     request.onerror = function() {
//       throw new Error('Failed to remove last generated test file');
//     };
//   });
// });
