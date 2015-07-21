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

// Extend Ffosbr library
module.exports = new Utilities();
