/**
 * Kitchen sink for useful functions.
 */
var Utilities = function() {};

/**
 * @access public
 * @description Determines whether an object is a function.
 * @param {any} functionToCheck
 * @returns {boolean}
 */
Utilities.prototype.isFunction = function(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

Utilities.prototype.contactToVcard = function(inContact) {
  var vCard = '',
    i = 0,
    len = 0,
    pref = false,
    fieldType = '';


  vCard += 'BEGIN:VCARD\r\n';
  vCard += 'VERSION:3.0\r\n';
  vCard += 'N:' + (inContact.givenName || '') + ';' + (inContact.familyName || '') + '\r\n';
  vCard += 'FN:' + (inContact.name || '') + '\r\n';
  vCard += 'ORG:' + (inContact.org || '') + '\r\n';
  vCard += 'TITLE:' + (inContact.honorificPrefix || '') + '\r\n';
  // Handling multiple emails...
  if (inContact.email) {
    for (i = 0, len = inContact.email.length; i < len; i++) {
      pref = inContact.email[i].pref;

      if (pref) {
        fieldType = 'PREF';
      } else {
        fieldType = inContact.email[i].type[0].toUpperCase();
      }

      vCard += 'EMAIL;TYPE=' + fieldType + ',INTERNET:' + inContact.email[i].value + '\r\n';
    }
  }
  // Handling multiple phones...
  if (inContact.tel) {
    for (i = 0, len = inContact.tel.length; i < len; i++) {
      pref = inContact.tel[i].pref;

      if (pref) {
        fieldType = 'PREF';
      } else {
        fieldType = inContact.tel[i].type[0].toUpperCase();
      }

      vCard += 'TEL;TYPE=' + fieldType + ',VOICE:' + inContact.tel[i].value + '\r\n';
    }
  }
  // Handling multiple addresses...
  if (inContact.adr) {
    for (i = 0, len = inContact.adr.length; i < len; i++) {

      pref = inContact.adr[i].pref;

      if (pref) {
        fieldType = 'PREF';
      } else {
        if (inContact.adr[i].type !== '') {
          console.log('type', inContact.adr[i].type);
          fieldType = inContact.adr[i].type;

        } else {
          // hack for empty type.
          fieldType = 'PREF';
        }
      }

      vCard += 'ADR;TYPE=' + fieldType + ':;;' + (inContact.adr[i].streetAddress || '') + ';' + (inContact.adr[i].locality || '') + ';' + (inContact.adr[i].region || '') + ';' + (inContact.adr[i].postalCode || '') + ';' + (inContact.adr[i].countryName || '') + '\r\n';
    }
  }
  // End of vCard
  vCard += 'END:VCARD\r\n';

  return vCard;
};
// Extend Ffosbr library
module.exports = new Utilities();
