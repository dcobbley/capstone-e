QUnit.test('Example: Ffosbr.square()', function(assert) {

  // The function 'square' must defined
  assert.notEqual(typeof ffosbr.square, undefined, 'Square exists');

  // The function 'square' must be a function
  assert.ok(isFunction(ffosbr.square), 'Square is a function');

  // It must return the square of any number input
  for (var i = -9; i < 10; ++i) {
    // Compare our library function against literal squaring
    // 'strictEquals' enforces triple-equality ('===' vs '==')
    assert.strictEqual(ffosbr.square(i), i * i, 'square of ' + i + ' = ' + (i * i));
  }
});
