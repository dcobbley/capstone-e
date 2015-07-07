/**
	This file is for utility functions that you find useful or necessary
	during unit testing. These must apply to multiple tests. If you need
	a helper function specific to a test, define it in the spec file.

	+      o     +              o
	    +             o     +       +
	o          +
	    o  +           +        +
	+        o     o       +        o
	-_-_-_-_-_-_-_,------,      o
	_-_-_-_-_-_-_-|   /\_/\
	-_-_-_-_-_-_-~|__( ^ .^)  +     +
	_-_-_-_-_-_-_-""  ""
	+      o         o   +       o
	    +         +
	o        o         o      o     +
	    o           +
	+      +     o        o      +

*/


/**
 * Javascript's 'typeof' cannot be used to determine if an object is a
 * function. Use this instead!
*/
function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Counts the number of keys in an object.
*/
function numberOfKeys(obj) {
	var count = 0;
	if (typeof obj !== 'object') {
		return 0;
	}
	for (var key in obj) {
		++count;
	}
	return count;
}

/**
 * Determines whether two objects have the same fields, and whether those
 * fields have equal values.
*/
function objectsMatch(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  if (numberOfKeys(obj1) !== numberOfKeys(obj2)) {
    return false;
  }
  for (var key in obj1) {
    if (typeof obj2[key] !== typeof obj1[key]) {
        return false;
    }
    else if (obj2[key] !== obj1[key]) {
        return false;
    }
  }
  return true;
}