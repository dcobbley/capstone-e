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
  navigator.mozL10n.once(start);

  // ---

  function start() {

    // var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    // message.textContent = translate('message');

  }

  // FOR TESTING PURPOSES ONLY
  // Initialize options object
  var options = {
    photos: {
      dataType: 'Photos',
      lastUpdated: new Date('2015-06-20T19:00-0700')
    },
    videos: {
      dataType: 'Videos',
      lastUpdated: new Date('2015-06-20T19:00-0700')
    },
    contacts: {
      dataType: 'Contacts',
      lastUpdated: new Date('2015-06-20T19:00-0700')
    },
    settings: {
      dataType: 'Settings',
      lastUpdated: new Date('2015-06-20T19:00-0700')
    }
  }

  function loadBackupDetailPage(detailOptions) {
    // Load the title of the detail page from options
    var detailPageDataTypeTitle = document.getElementById('detail-page-title');
    detailPageDataTypeTitle.textContent = detailOptions.dataType;

    // Slide the backup detail page onto the screen
    var backupDetailPage = document.getElementById('backup-detail-page');
    backupDetailPage.style.zIndex = '100';
    backupDetailPage.setAttribute('class', 'go-deeper-in');
  }

  function dateFormat(date) {
    var minutes = date.getMinutes();
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + 
      date.getHours() + ':' + minutes;
  }

  function refreshHistories() {
    var photoUpdatedAt = document.getElementById('photo-hist-date');
    photoUpdatedAt.textContent = dateFormat(options.photos.lastUpdated);

    var videoUpdatedAt = document.getElementById('video-hist-date');
    videoUpdatedAt.textContent = dateFormat(options.videos.lastUpdated);

    var contactUpdatedAt = document.getElementById('contact-hist-date');
    contactUpdatedAt.textContent = dateFormat(options.contacts.lastUpdated);

    var settingsUpdatedAt = document.getElementById('settings-hist-date');
    settingsUpdatedAt.textContent = dateFormat(options.settings.lastUpdated);
  }

  refreshHistories();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * EVENT LISTENERS                                                               *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  // Settings page listeners

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
    loadBackupDetailPage(options.photos);
  });

  document.getElementById('video-infopane').addEventListener('click', function() {
    loadBackupDetailPage(options.videos);
  });

  document.getElementById('contact-infopane').addEventListener('click', function() {
    loadBackupDetailPage(options.contacts);
  });

  document.getElementById('settings-infopane').addEventListener('click', function() {
    loadBackupDetailPage(options.settings);
  });

  document.getElementById('backup-page-back-button').addEventListener('click', function() {
    document.getElementById('backup-page')
      .setAttribute('class', 'go-deeper-back-out');
    document.getElementById('backups-page')
      .setAttribute('class', 'go-deeper-back-in');
  });

  document.getElementById('backup-button').addEventListener('click', function() {
    var backupName = 'Backup ' + Math.floor((Math.random() * 100) + 1);
    var backupDate = new Date();
    var backupList = document.getElementById('backup-list');

    var newItem = document.createElement('LI');

    var linkNode = document.createElement('A');
    linkNode.setAttribute('href', '#');

    var firstP = document.createElement('P');
    var titleNode = document.createTextNode(backupName);
    firstP.appendChild(titleNode);

    var secondP = document.createElement('P');
    var subtitleNode = document.createTextNode(backupDate);
    secondP.appendChild(subtitleNode);

    linkNode.appendChild(firstP);
    linkNode.appendChild(secondP);

    newItem.appendChild(linkNode);

    backupList.insertBefore(newItem, backupList.childNodes[0]);

    linkNode.addEventListener('click', function() {
      var backupPage = document.getElementById('backup-page');
      var backupsPage = document.getElementById('backups-page');

      document.getElementById('backup-page-backup-name').innerHTML = backupName;
      document.getElementById('backup-page-backup-date').innerHTML = backupDate;

      backupPage.setAttribute('class', 'go-deeper-in');
      backupsPage.setAttribute('class', 'go-deeper-out');
    });
  });

});
