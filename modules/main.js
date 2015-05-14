var square = require('./square');

// Let's square some numbers!
for (var i = 0; i < 15; ++i) {
  console.log(square(i));
}

// See the correct line number?
throw new Error('testing');
