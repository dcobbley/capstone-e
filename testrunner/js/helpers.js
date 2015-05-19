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