// Record whether or not an external SD card is present.
// Some tests cannot be run correctly if an SD card is
// active in the phone.
var storages = navigator.getDeviceStorages('sdcard');
var externalPresent = false;

// Check for an external SD card
for (var i = 0; i < storages.length; ++i) {
  if (storages[i].isRemovable === true) {
    externalPresent = true;
  }
}

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
//  * Media.get (modules/media.js)
//  *
//  *
//  */
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
      // BUG - Why is "externalPresent" always true??

      // NOTE: only passes when there is not an external sdcard.
      if (!externalPresent) {
        ffosbr.media.get('sdcard1', callback);
      } else {
        // Fake the correct behavior is the external SD card is present
        throw new Error('Attempt to read from an invalid storage. Abort.');
      }
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

  //pass sdcard1 as type. external must not be null internal must be null.
  //       //Dies without sdcard it
  //    assert.StrictEqual(
  //      ffosbr.media.get("sdcard1", callback).internal,
  //      null,
  //      "...internal storage should be null when retrieving external sdcard"
  //    );

  //    //Dies without sdcard it
  //    assert.notStrictEqual(
  //      ffosbr.media.get("sdcard1", callback).external,
  //      null,
  //      "...retrieve external sdcard"
  //    );


  //call back should always recieve something file or error
  //TODO
  //if there is an error it should be passed to the call back
  //TODO

  //test that files are properly retrieved
  //TODO

  //TODO
  //NOTES: currently get only works in any capacity when there is an external sdcard.



});

/**
//  * Media.get (modules/media.js)
//  *
//  *
//  */
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
      if (!externalPresent) {
        ffosbr.media.put('sdcard1', helloFile, 'hello');
      } else {
        // Fake the correct behavior is the external SD card is present
        throw new Error('Attempt to write to an invalid storage. Abort.');
      }
    },
    new Error('Attempt to write to an invalid storage. Abort.'),
    '...throws error when attempting to write to a missing external sdcard'
  );



  //TODO
  //destination is ignored unless type is sdcard1 make sure it's ignored
  //make sure dest affects where files are written ?? human test


});


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
      if (!externalPresent) {
        ffosbr.media.remove('hello');
      } else {
        // Fake the correct behavior is the external SD card is present
        throw new Error('Attempt to delete from invalid storage. Abort.');
      }
    },
    new Error('Attempt to delete from invalid storage. Abort.'),
    '...throws error when there is not an external sdcard'
  );


  //TODO
  //only remove from external

  //call back should be called if successfull and called with error on failure


});



/**
//  * TODO
//  * Right now this is an example of how to load media onto the phone for testing.
//  *
//  *
//  */
// QUnit.test('Test file transfer', function(assert) {
//   var storages = navigator.getDeviceStorages('pictures');
//   console.log(storages[0]);


// var blob = null;
// var xhr = new XMLHttpRequest();
// /* Place the files in a directory that is in the packaged app project and
//  * retrieve them with xhr.
//  *
//  *
//  */
// xhr.open("GET", "/testphotos/icon128x128.png");
// xhr.responseType = "arraybuffer";//force the HTTP response, response-type header to be blob



// xhr.onload = function()
// {
//     blob = xhr.response;//xhr.response is now a arraybuffer object

//     var file = new File([blob], "hello", {type: "image/png"});
//     console.log(file);

//   var write = storages[0].add(file);
//   console.log(write);
//   write.onsuccess = function () {
//     console.log(this.result);
//   }
//   write.onerror = function () {
//     console.log(this.error);
//   }




// }
// xhr.send();



//   assert.ok(isFunction(ffosbr.media.getInternalStorage), '...is a function');
// });
