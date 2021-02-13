function ArrayOfNumbers() {
  var checkArgs = function( argObj ) {
    var args = Array.prototype.slice.apply( argObj );
    var isNumber = function( x ) { return Object.prototype.toString.call( x ) === "[object Number]"; };
    var isNumberArgs = args.every( isNumber );
    if ( !isNumberArgs ) {
      throw new Error( 'Each arguments must be a number' );
    }
  }
  checkArgs( arguments );
  if ( arguments.length === 1 ) {
    this.length = arguments[0];
  }
  else {
    this.push.apply( this, arguments );
  }

  this.push = function(){
    checkArgs( arguments );
    Array.prototype.push.apply( this, arguments );
  };
}

ArrayOfNumbers.prototype = Object.create( Array.prototype );
ArrayOfNumbers.prototype.constructor = ArrayOfNumbers;


// TESTING

console.log('new ArrayOfNumbers() is Array instance', new ArrayOfNumbers(1, 1) instanceof Array);
console.log('new ArrayOfNumbers() is ArrayOfNumbers instance', (new ArrayOfNumbers(1, 1)) instanceof ArrayOfNumbers);
var a = new ArrayOfNumbers(1, 2, 3);
console.log('create array', a);

try {
  var b = new ArrayOfNumbers(1, 'e', 3);
} catch (e) {
  console.warn('???', e);
}
try {
  a.push('a1');
} catch (e) {
  console.warn('!!!! ', e);
}
console.log('check for changes', a);
a.push(1, 3);
console.log('add 1,3 ', a);