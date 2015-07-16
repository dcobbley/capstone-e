QUnit.test('Contacts', function(assert) {
  assert.notEqual(typeof ffosbr.media.getInternalStorage, 'undefined', '...exists');
  console.log('CONTACT TESTING IS NOW RUNNING');


  var sdcard = navigator.getDeviceStorages('sdcard')[1];


  //   var file   = new Blob(["This is a text file."], {type: "text/plain"});

  //   var request = sdcard.addNamed(file, "backup/contacts/contacts.json");

  //   request.onsuccess = function () {
  //     var name = this.result.name;
  //     console.log('File "' + name + '" successfully wrote on the sdcard storage area');
  //   }

  //   request.onerror = function () {
  //     console.warn('Unable to write the file: ' + this.error);
  //   }



  //  ffosbr.contacts.clean( function(err){console.log(err);} );
  ffosbr.contacts.getContactsFromSIM();


  //  console.log(ffosbr.contacts.contacts);

  //ffosbr.contacts.restore();


  //   ffosbr.contacts.putContactsOnSD(function(err) {
  //     console.log('Put Results: ' + err);
  //     var cursor = sdcard.enumerate();
  //     cursor.onsuccess = function() {

  //       if (this.result) {
  //         var file = this.result;
  //         if (file.name === '/sdcard1/backup/contacts/contacts.json') {
  //           console.log('sdcard contents' + file);
  //         }


  //         // Once we found a file we check if there are other results
  //         // Then we move to the next result, which calls the cursor
  //         // success possibly with the next file as result.
  //         this.continue();
  //       }
  //     }

  //   });

  var cursor = sdcard.enumerate();
  cursor.onsuccess = function() {

    if (this.result) {
      var file = this.result;
      if (file.name === '/sdcard1/backup/contacts/contacts.json') {
        console.log('sdcard contents: ', file);
      }


      // Once we found a file we check if there are other results
      // Then we move to the next result, which calls the cursor
      // success possibly with the next file as result.
      this.continue();
    }
  };




  console.log('END Test');


});
