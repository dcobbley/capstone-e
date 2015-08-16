/**
 * Manages internal and external storages, or handles to storage
 * devices, and their various data sets, including apps, music,
 * pictures, sdcard, and videos.
 */
function Media() {

  // Public data members

  // Valid storage types
  this.storageTypes = [
    // 'apps',
    'music',
    'pictures',
    'sdcard',
    'videos'
  ];

  // Contains a storage {Storage} for each internal storage type.
  this.internal = {};

  // Contains a storage {Storage} for each external storage type.
  this.external = {};
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

/**
 * @access private
 * @description Media constructor
 */
Media.prototype.initialize = function() {
  for (var i = 0; i < this.storageTypes.length; ++i) {

    var type = this.storageTypes[i];

    // Fetch all {DeviceStorage} of the specified type
    var stores = navigator.getDeviceStorages(type);

    // Extract internal DeviceStorage and create Storage object
    this.internal[type] = new ffosbr.Storage(type, this.getInternalStorage(stores));

    // Extract external DeviceStorage and create Storage object
    this.external[type] = new ffosbr.Storage(type, this.getExternalStorage(stores));
  }
};

/**
 * @access public
 * @description Deletes specified file types from external storage
 *   device. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to
 *   the callback, "oncomplete".
 * @param {string} type
 * @param {callback} oncomplete
 * @throws On invalid data type
 */
Media.prototype.clean = function(type, oncomplete) {
  var paths = ffosbr.settings.getBackupDirectoryPaths();
  var errors = [];

  if (paths[type] === undefined) {
    throw new Error('Invalid data type. Cannot clean type ' + type);
  }

  ffosbr.media.get('sdcard1', paths[type], function(file, error) {
    if (error) {
      return oncomplete(type, error);
    }

    var filename = paths[type] + file.name;
    ffosbr.media.remove(file.name, function(error) {
      if (error) {
        errors.push(error);
      }
    });
  }, function(error) {
    if (error) {
      errors.push(error);
    } else {
      ffosbr.history.set(type, {
        title: capitalize(type),
        lastBackupDate: null,
        backupSize: 0,
      });
    }

    oncomplete(type, errors.length === 0 ? undefined : errors);
  });

};

/**
 * @access public
 * @description Saves specified file type to external storage
 *   device. Callback is invoked upon completion. If an error
 *   occurred, it will be passed as the first parameter to
 *   the callback, "oncomplete".
 * @param {string} type
 * @param {callback} oncomplete
 * @throws On invalid data type
 */
Media.prototype.backup = function(type, oncomplete) {

  var fileSizeRunningTotal = 0;
  var paths = ffosbr.settings.getBackupDirectoryPaths();

  if (paths[type] === undefined) {
    throw new Error('Invalid data type. Cannot restore type ' + type);
  }

  ffosbr.media.get(type === 'photos' ? 'pictures' : type, function(file) {
    if (!file) {
      return;
    }

    var fn = file.name;
    fileSizeRunningTotal += file.size;
    fn = fn.substr(fn.lastIndexOf('/') + 1, fn.length);
    var dest = paths[type] + fn + '~';
    ffosbr.media.put('sdcard1', file, dest, function() {
      // Report progress?
    });
  }, function(error) {
    if (error === undefined) {
      ffosbr.history.set(type, {
        title: capitalize(type),
        lastBackupDate: new Date(),
        backupSize: fileSizeRunningTotal,
      });
    }

    oncomplete(type, error);
  });
};

/**
 * @access public
 * @description Writes files stored in a Ffosbr backup back
 *   to Firefox OS. The contents restored depends on the
 *   backup present. Valid data types are: apps, music, photos,
 *   videos, contacts, and settings.
 *   If an error occurs, restore tries to call the "oncomplete"
 *   handler.
 * @param {string} type
 * @param {callback} oncomplete
 */
Media.prototype.restore = function(type, oncomplete) {
  var paths = ffosbr.settings.getBackupDirectoryPaths();
  var allFiles = []; // stores all files fetched by "get"
  var errors = [];

  var writeFiles = function(files) {
    var file = null;
    var remaining = null;
    if (!files || files.length === 0) {
      // There are no more files to write
      return oncomplete(type, errors.length === 0 ? undefined : errors);
    } else if (files.length === 1) {
      // This is the last file to write
      remaining = [];
    } else {
      // There are multiple files left to write
      remaining = files.slice(1, files.length);
    }

    file = files[0];

    var fn = file.name;
    if (fn.endsWith('~')) {
      fn = fn.substr(0, fn.length - 1);
    }
    var filename = fn.substr(fn.lastIndexOf('/') + 1, fn.length);
    var extension = fn.substr(fn.lastIndexOf('.') + 1, fn.length);

    var mimeType = mime.lookup(fn);

    var reader = new FileReader();

    reader.onloadend = function() {
      var fc = this.result;
      var newFile = new File([fc], filename, {
        type: mimeType
      });

      ffosbr.media.put(type === 'photos' ? 'pictures' : type, newFile, filename, function(error) {
        if (error) {
          // If the put fails, break the callback chain. The restore has failed.
          errors.push(error);
        }
        writeFiles(remaining);
        // TODO - Report progress?
      });
    };
    reader.readAsArrayBuffer(file);
  };

  // Ignore any errors in "get". They will show up in the oncomplete.
  ffosbr.media.get('sdcard1', paths[type], function(file, error) {
    if (!file) {
      return;
    }

    allFiles.push(file);
  }, function(error) {
    if (error) {
      oncomplete(type, error);
    } else {
      writeFiles(allFiles);
    }
  });
};

/**
 * @access private
 * @description Takes an array of DeviceStorage objects and returns
 *   whichever represents the internal storage.
 * @param {array of DeviceStorage} stores
 * @returns {DeviceStorage}
 */
Media.prototype.getInternalStorage = function(stores) {

  for (var i = 0; i < stores.length; ++i) {
    if (stores[i].isRemovable === false) {
      return stores[i];
    }
  }

  // This is required to correct behavior on simulators.
  if (stores.length > 0 && typeof stores[0].isRemovable === 'undefined') {
    return stores[0];
  }

  return null;
};

/**
 * @access private
 * @description Takes an array of DeviceStorage objects and returns
 *   whichever represents the external storage.
 * @param {array of DeviceStorage} stores
 * @returns {DeviceStorage}
 */
Media.prototype.getExternalStorage = function(stores) {

  for (var i = 0; i < stores.length; ++i) {
    if (stores[i].isRemovable === true) {
      return stores[i];
    }
  }

  // This is required to correct behavior on simulators.
  if (stores.length > 1 && typeof stores[1].isRemovable === 'undefined') {
    return stores[1];
  }

  return null;
};

/**
 * @access private
 * @description Takes a string describing which type of storage is desired.
 *   Valid options are listed in the "storageTypes" array.
 * @param {String} type
 * @returns {Object} Containing the appropriate internal and external storages.
 */
Media.prototype.getStorageByName = function(type) {

  var stores = {
    internal: null,
    external: null
  };

  if (this.storageTypes.indexOf(type) < 0) {
    throw new Error('Invalid media type');
  }

  stores.internal = this.internal[type];
  stores.external = this.external[type];
  return stores;
};

/**
 * @access private
 * @description Determines which storage (internal or external) is the default
 *   storage. This is decided by user preferences.
 * @param {String} type
 * @returns {Storage}
 */
Media.prototype.getDefaultStorage = function(type) {

  // TODO - write utility/settings function to confirm
  // a valid media type.
  if (typeof(type) !== 'string') {
    throw new Error('Missing or invalid media type');
  }

  if (this.internal[type].ready === true && this.internal[type].store.default === true) {
    return this.internal[type];
  } else if (this.external[type].ready === true && this.internal[type].store.default === true) {
    return this.external[type];
  } else {
    console.error('No ' + type + ' storages available.');
    return null;
  }
};

/**
 * @access public
 * @description Fetches files from both internal and external storages
 *   via DOMRequest. The type of files fetched (e.g. pictures, music) is
 *   specified by the "type" parameter. Each file fetched will be passed
 *   to the provided "forEach" handler as a File object. If the "type"
 *   parameter is "sdcard1" and a "directory" parameter is provided, only
 *   files found in the specified directory will be returned.
 *   (Note: File extends Blob)
 * @param {String} type
 * @param {String} directory (optional)
 * @param {callback} forEach
 * @param {callback} oncomplete
 */
Media.prototype.get = function(type, directory, forEach, oncomplete) {

  var storages = null;
  var internal = null;
  var external = null;
  var internalFiles = {};
  var externalFiles = {};

  // TODO - write utility/settings function to confirm
  // a valid media type.
  if (typeof(type) !== 'string') {
    throw new Error('Missing or invalid media type');
  }

  if (typeof(directory) !== 'string') {
    if (ffosbr.utils.isFunction(directory)) {
      // Parameter "directory" was not provided, and the
      // second parameter is really the "forEach" function
      oncomplete = forEach;
      forEach = directory;
    } else if (ffosbr.utils.isFunction(forEach)) {
      if (ffosbr.utils.isFunction(oncomplete)) {
        oncomplete(new Error('Missing or invalid directory'));
        return;
      } else {
        throw new Error('Missing or invalid directory');
      }
    }
    directory = null;
  }

  if (!ffosbr.utils.isFunction(forEach)) {
    if (ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(new Error('Missing or invalid callback'));
      return;
    }
    throw new Error('Missing or invalid callback');
  }
  if (oncomplete && !ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Invalid oncomplete callback');
  }

  storages = this.getStorageByName(type === 'sdcard1' ? 'sdcard' : type);

  internal = storages.internal;
  external = storages.external;

  if (internal.ready === false && external.ready === false) {
    return oncomplete(new Error('Attempt to read from an invalid storage. Abort.'));
  }

  if (type === 'sdcard1' && directory) {
    if (!directory.startsWith('/')) {
      directory = '/' + directory;
    }
    if (!directory.startsWith('/sdcard1')) {
      directory = '/sdcard1' + directory;
    }
    if (!directory.endsWith('/')) {
      directory = directory + '/';
    }
  }

  if (internal.ready === true) {
    internalFiles = internal.store.enumerate();
  }
  if (external.ready === true) {
    externalFiles = external.store.enumerate();
  }

  var onsuccess = function() {
    var file = this.result;
    if (!file || this.done) {
      if (oncomplete) {
        oncomplete();
      }
      return;
    }

    if (!directory || file.name.startsWith(directory)) {
      forEach(file);
    }
    this.continue();
  };

  var onerror = function() {
    if (oncomplete) {
      oncomplete(new Error('Attempt to read from an invalid storage. Abort.'));
      return;
    }
    throw new Error('Attempt to read from an invalid storage. Abort.');
  };

  internalFiles.onsuccess = onsuccess;
  externalFiles.onsuccess = onsuccess;
  internalFiles.onerror = onerror;
  externalFiles.onerror = onerror;
};


/**
 * @access public
 * @description Writes files to a specified destination. If the file type is
 *   'apps', 'music', 'pictures', 'sdcard', or 'videos' then the file will be
 *   handed off to the OS and any file paths in the 'dest' parameter will be
 *   ignored. If the file type is 'sdcard1' the file will be written to the
 *   external storage device with the exact 'dest' provided. If an oncomplete
 *   callback if provided, it will be called after the file has been written.
 * @param {String} type - [apps, music, pictures, sdcard, sdcard1, videos]
 * @param {File} file - Mozilla File (Blob) to be written
 * @param {String} dest - path (with or without file name) relative to the
 *   default directory of the storage device. Only valid for types sdcard
 *   and sdcard1.
 * @param {requestCallback} oncomplete (optional)
 * @throws on invalid media type
 */
Media.prototype.put = function(type, file, dest, oncomplete) {

  var filename = null; // dest without file paths
  var storages = null; // array of DeviceStorage
  var targetStorage = null; // DeviceStorage to write to
  var sname = null; // valid OS media type
  var write = {}; // cursor or iterator

  if (typeof(type) !== 'string') {
    if (ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(new Error('Missing or invalid media type'));
      return;
    }
    throw new Error('Missing or invalid media type');
  }

  if (!(file instanceof File)) {
    if (ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(new Error('Missing or invalid file'));
      return;
    }
    throw new Error('Missing or invalid file');
  }

  if (typeof(dest) !== 'string') {
    if (ffosbr.utils.isFunction(oncomplete)) {
      oncomplete(new Error('Missing or invalid write destination'));
      return;
    }
    throw new Error('Missing or invalid write destination');
  }

  if (oncomplete && !ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Callback is not a function');
  } else if (!oncomplete) {
    // This allows us to safely call oncomplete, even when
    // the callback was not provided.
    oncomplete = function() {}; // dummy function
  }

  // If file name is present in the dest parameter, store it.
  // If not, add the current file name to the dest string.
  if (dest.indexOf('.') > 0) {
    filename = dest.substr(dest.lastIndexOf('/') + 1, dest.length);
  } else {
    var fn = file.name;
    // ensure a trailing slash
    if (!dest.endsWith('/')) {
      dest += '/';
    }
    // append file name
    dest += fn.substr(fn.lastIndexOf('/') + 1, fn.length);
  }
  // remove leading slash
  if (dest.startsWith('/')) {
    dest = dest.substr(1, dest.length);
  }

  // If the type is 'sdcard1', use name 'sdcard'
  sname = (type === 'sdcard1' ? 'sdcard' : type);
  storages = this.getStorageByName(sname);

  if (type === 'sdcard1') {
    if (storages.external !== null) {
      targetStorage = storages.external;
    } else {
      if (oncomplete) {
        oncomplete(new Error('Unable to locate SD card. Abort.'));
        return;
      }
      throw new Error('Unable to locate SD card. Abort.');
    }
  } else {
    targetStorage = this.getDefaultStorage(type);
  }

  if (targetStorage && targetStorage.ready === true) {
    try {
      if (type === 'sdcard1') {
        write = targetStorage.store.addNamed(file, dest);
      } else {
        write = targetStorage.store.addNamed(file, filename);
      }
    } catch (e) {
      return oncomplete(new Error('Attempt to write to an invalid storage. Abort.'));
    }
  } else {
    return oncomplete(new Error('Attempt to write to an invalid storage. Abort.'));
  }

  write.onsuccess = function(fileWritten) {
    oncomplete();
  };

  write.onerror = function() {
    targetStorage.fileExists(dest + filename, function(exists) {
      if (exists) {
        ffosbr.media.remove(directory + file.name, function(error) {
          if (!error) {
            that.put(type, file, dest, oncomplete);
          } else {
            console.error(error);
            oncomplete(error);
          }
        });
      } else {
        oncomplete(this.error);
      }
    });
  };
};

/**
 * @access public
 * @description Removes a file from the external sdcard. If an oncomplete
 *   callback is provided, it will be called after the file is removed.
 * @param {String} filename - Specifies the full path to the file to be
 *   removed from the external sdcard (sdcard1).
 * @param {requestCallback} oncomplete (optional)
 * @throws
 */
Media.prototype.remove = function(filename, oncomplete) {

  var externalSD = this.getStorageByName('sdcard').external;
  var remove = null; // cursor or iterator

  if (typeof(filename) !== 'string') {
    throw new Error('Missing or invalid filename');
  }

  if (oncomplete && !ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Callback is not a function');
  }

  try {
    remove = externalSD.store.delete(filename);
  } catch (e) {
    return oncomplete(new Error('Attempt to delete from invalid storage. Abort.'));
  }

  remove.onsuccess = function() {
    // Only call the oncomplete callback if it was provided
    if (oncomplete) {
      oncomplete();
    }
  };

  remove.onerror = function() {

    var error = this.error;
    // Only call the oncomplete callback if it was provided
    if (ffosbr.utils.isFunction(oncomplete)) {

      // The majority of errors thrown by Firefox OS do not provide messages.
      if (error.message.length > 0) {
        oncomplete(error);
      } else {
        oncomplete(new Error('Attempt to delete from invalid storage. Abort.'));
      }
    }
  };
};

/**
 * @access public
 * @description Calculates free space on the provided DeviceStorage instance
 *   and then invokes a callback with the result (in bytes).
     (Note: a second "error" parameter will be passed to the callback if the
     request fails)
 * @param {DeviceStorage} storage
 * @param {requestCallback} oncomplete
 */
Media.prototype.getFreeBytes = function(storage, oncomplete) {

  var getFreeBytes = null;

  if ((storage instanceof DeviceStorage) === false) {
    throw new Error('Missing or invalid storage device');
  }

  if (!ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Missing or invalide callback');
  }

  getFreeBytes = storage.freeSpace();

  getFreeBytes.onsuccess = function() {
    var size = this.result;
    oncomplete(size);
  };

  getFreeBytes.onerror = function() {
    var error = this.error;
    oncomplete(null, new Error('Failed to get available space: ' + error.message));
  };
};

/**
 * @access public
 * @description Checks the block size of an SD card by passing in a 1 byte file
 *   and then returning the number of bytes that been occupied.
 *
 *   Use the follwing line to test block size in the console:
 *     ffosbr.media.checkBlockSize(navigator.getDeviceStorages('sdcard')[0],function(size){alert(size);})
 * @param {DeviceStorage} storage
 * @param {requestCallback} oncomplete - passed the block size, and a potential
 *   error object as a second parameter.
 */
Media.prototype.checkBlockSize = function(storage, oncomplete) {

  if ((storage instanceof DeviceStorage) === false) {
    throw new Error('Missing or invalid storage device');
  }

  if (!ffosbr.utils.isFunction(oncomplete)) {
    throw new Error('Missing or invalid callback');
  }

  // Create test file (1 byte in size)
  var file = new File(['a'], Date.now() + '.txt', {
    type: 'text/plain'
  });

  ffosbr.media.getFreeBytes(storage, function(sizeBefore) {

    var initialFreeBytes = sizeBefore;
    var write = storage.addNamed(file, file.name);

    write.onsuccess = function() {
      ffosbr.media.getFreeBytes(storage, function(sizeAfter) {
        var blockSize = initialFreeBytes - sizeAfter;
        oncomplete(blockSize);

        // Remove generated test file
        var deleteRequest = storage.delete(file.name);
        deleteRequest.onerror = function() {
          console.error('Failed to remove last generated test file.');
        };
      });

      write.onerror = function() {
        oncomplete(undefined, new Error('Failed to add blocksize test file.'));
      };
    };
  });

};

/**
 * @access public
 * @description
      Check if there is enough space for next backup file.

       var content = '1234567890';
       var file = new File([content], 'Size' + content.length + '.txt', {
        type: 'text/plain'
       });
       ffosbr.media.isEnoughSpace(navigator.getDeviceStorages('sdcard')[1], file, function() {} );
      using above line to test
 * @param {DeviceStorage} storage
 * @param {File} file
 * @param {requestCallback} oncomplete
 */
Media.prototype.isEnoughSpace = function(storage, file, oncomplete) {

  var currentFreeBytes = 0;

  ffosbr.media.getFreeBytes(storage, function(currentFreeBytes) {
    console.log(currentFreeBytes + 'bytes');
    ffosbr.media.checkBlockSize(storage, function(blockSize) {
      var fileSize = file.size;
      var realFileSize = Math.ceil(fileSize / blockSize) * blockSize;
      if (realFileSize < currentFreeBytes) {
        oncomplete(true);
      } else {
        oncomplete(false);
      }
    });
  });
};
/**
 * @access public
 * @description
      Check if there is file name collision for next backup file in same directory.
 * @param {DeviceStorage} storage
 * @param {File} file
 * @param {requestCallback} oncomplete
 */
Media.prototype.isNameCollision = function(storage, file, oncomplete) {

  //This function exists in Storage.prototype.fileExists
};


// Extend Ffosbr library
module.exports = new Media();
