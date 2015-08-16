function showProgressDialog(message) {
  var progressMask = document.getElementById('progress-mask');
  var progressMessage = progressMask.querySelector('#progress-message');
  progressMessage.textContent = message;
  progressMask.style.display = 'block';
}

function hideProgressDialog() {
  var progressMask = document.getElementById('progress-mask');
  progressMask.style.display = 'none';
}

// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  //navigator.mozL10n.once(start);

  var cleanHandler = function() {
    // Hurr
  };

  var restoreHandler = function() {
    // Durr
  };

  function loadBackupDetailPage(type) {
    var detailOptions = ffosbr.history.getValue(type);
    if (!detailOptions) {
      return;
    }

    // Load the title of the detail page from options
    var detailPageDataTypeTitle = document.getElementById('detail-page-title');
    detailPageDataTypeTitle.textContent = detailOptions.title;
    // set the subtitle for the backup slider
    var detailPageDataTypeTitle2 = document.getElementById('detail-page-title-2');
    detailPageDataTypeTitle2.textContent = 'Backup ' + detailOptions.title;

    //get current status of settings
    var currStatus = ffosbr.settings.get(type);
    if (typeof currStatus != 'boolean') {
      return;
    }

    //load the slider based on current state of settings
    var sliderStatus = document.getElementById('backupStatus');

    sliderStatus.checked = currStatus;

    ffosbr.settings.set(type, sliderStatus.checked);

    // Update the button handlers
    var cleanButton = document.getElementById('detail-clean-button');
    cleanButton.removeEventListener('click', cleanHandler);
    cleanHandler = function() {
      ffosbr[type].clean(function(resultType, error) {
        alert(error ? error : type + ' cleaned successfully');
      });
    };
    cleanButton.addEventListener('click', cleanHandler);

    var restoreButton = document.getElementById('detail-restore-button');
    restoreButton.removeEventListener('click', restoreHandler);
    restoreHandler = function() {
      ffosbr[type].restore(function(resultType, error) {
        alert(error ? error : type + ' restored successfully');
      });
    };
    restoreButton.addEventListener('click', restoreHandler);

    // Slide the backup detail page onto the screen
    var backupDetailPage = document.getElementById('backup-detail-page');
    backupDetailPage.style.zIndex = '100';
    backupDetailPage.setAttribute('class', 'go-deeper-in');
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * HISTORY HELPERS                                                               *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function dateFormat(date) {
    if (date === null) {
      return 'Never';
    }

    if (typeof(date) === 'string') {
      try {
        date = new Date(date);
      } catch(e) {
        return 'Never';
      }
    }

    var minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' +
      date.getHours() + ':' + minutes;
  }

  function sizeFormat(size) {
    // We'll go up to Gigabytes, but no further. If you have a terabyte SD card...
    // I'm sorry.
    var units = ' bytes';
    if (size > 1024) {
      size /= 1024;
      units = ' MB';
    }
    if (size > 1024) {
      size /= 1024;
      units = ' GB';
    }

    return size.toFixed(2) + units;
  }

  function refreshHistories() {
    var photoUpdatedAt = document.getElementById('photo-hist-date');
    photoUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('photos', 'lastBackupDate'));
    var photoSize = document.getElementById('photo-hist-size');
    photoSize.textContent = sizeFormat(ffosbr.history.getValue('photos', 'backupSize'));

    var videoUpdatedAt = document.getElementById('video-hist-date');
    videoUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('videos', 'lastBackupDate'));
    var videoSize = document.getElementById('video-hist-size');
    videoSize.textContent = sizeFormat(ffosbr.history.getValue('videos', 'backupSize'));

    var musicUpdatedAt = document.getElementById('music-hist-date');
    musicUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('music', 'lastBackupDate'));
    var musicSize = document.getElementById('music-hist-size');
    musicSize.textContent = sizeFormat(ffosbr.history.getValue('music', 'backupSize'));

    var contactUpdatedAt = document.getElementById('contact-hist-date');
    contactUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('contacts', 'lastBackupDate'));
    var contactSize = document.getElementById('contact-hist-size');
    contactSize.textContent = sizeFormat(ffosbr.history.getValue('contacts', 'backupSize'));

    var messagesUpdatedAt = document.getElementById('messages-hist-date');
    messagesUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('messages', 'lastBackupDate'));
    var messagesSize = document.getElementById('messages-hist-size');
    messagesSize.textContent = sizeFormat(ffosbr.history.getValue('messages', 'backupSize'));

    var systemSettingsUpdatedAt = document.getElementById('systemSettings-hist-date');
    systemSettingsUpdatedAt.textContent = dateFormat(ffosbr.history.getValue('systemSettings', 'lastBackupDate'));
    var systemSettingsSize = document.getElementById('systemSettings-hist-size');
    systemSettingsSize.textContent = sizeFormat(ffosbr.history.getValue('systemSettings', 'backupSize'));
  }

  refreshHistories();


  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * EVENT LISTENERS                                                               *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  document.getElementById('backup-button').addEventListener('click', function() {
    var flag = confirm('Warning! This will erase any other backup previously stored on SD card');
    if (flag === true) {
      showProgressDialog('backup initiated...');
      var successes = [];
      var failures = [];

      var reportSuccess = function(type) {
        if (!successes.includes(type)) {
          showProgressDialog(type + ' saved successfully');
          successes.push(type);
        }
      };

      var reportError = function(type, error) {
        if (!failures.includes(type)) {
          showProgressDialog(type + ' failed');
          failures.push(type);
        }
      };

      var finished = function() {
        var sitrep = 'SUCCESSES:\n';
        for (var i = 0; i < successes.length; ++i) {
          sitrep += '\t' + successes[i] + '\n';
        }
        sitrep += '\nFAILURES:\n';

        for (i = 0; i < failures.length; ++i) {
          sitrep += '\t' + failures[i] + '\n';
        }

        hideProgressDialog();
        alert(sitrep);
      };

      ffosbr.backup(reportSuccess, reportError, finished);
      refreshHistories();
    }
  });

  // Settings page listeners

  //add a listener to the backupStatus slider
  document.getElementById('backupStatus').addEventListener('click', function() {
    //set the ffosbr setting when slider is clicked    
    var key = document.getElementById('detail-page-title').textContent.toLowerCase();
    var value = document.getElementById('backupStatus').checked;
    console.log(key);
    console.log(value);
    ffosbr.settings.set(key, value);
  });


  document.getElementById('settings-button').addEventListener('click', function() {
    var settingsPage = document.getElementById('settings-page');

    // Make sure the page sliding up is on top
    settingsPage.style.zIndex = '100';
    settingsPage.setAttribute('class', 'slide-up');
  });

  document.getElementById('settings-done-button').addEventListener('click', function() {
    var settingsPage = document.getElementById('settings-page');

    settingsPage.setAttribute('class', 'slide-down');

    setTimeout(function() {
      settingsPage.style.zIndex = 'none';
    }, 400);
  });

  // Backup Detail Page listeners
  document.getElementById('backup-detail-done-button').addEventListener('click', function() {
    var backupDetailPage = document.getElementById('backup-detail-page');
    backupDetailPage.setAttribute('class', 'go-deeper-back-out');
  });

  document.getElementById('photo-infopane').addEventListener('click', function() {
    loadBackupDetailPage('photos');
  });

  document.getElementById('video-infopane').addEventListener('click', function() {
    loadBackupDetailPage('videos');
  });

  document.getElementById('music-infopane').addEventListener('click', function() {
    loadBackupDetailPage('music');
  });

  document.getElementById('contact-infopane').addEventListener('click', function() {
    loadBackupDetailPage('contacts');
  });

  document.getElementById('messages-infopane').addEventListener('click', function() {
    loadBackupDetailPage('messages');
  });

  document.getElementById('systemSettings-infopane').addEventListener('click', function() {
    loadBackupDetailPage('systemSettings');
  });

});
