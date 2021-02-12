function ArrayOfNumbers() {
  var checkArgs = function( argObj ) {
    var args = Array.prototype.slice.apply( arObj );
    var isNumber = function( x ) { return Object.prototype.toString.call( x ) === "[object Number]"; };
    var isNumberArgs = args.every( isNumber );
    if ( !isNumberArgs ) {
      throw new Error( 'Each arguments must be a number' );
    }
  }
  checkArgs( arguments )
  if ( args.length === 1 ) {
    this.length = args[0];
  }
  else {
    this.push.apply( this, args );
  }

  this.push = function(){
    checkArgs( arguments );
    Array.prototype.push.apply( this, arguments );
  }
}

ArrayOfNumbers.prototype = Object.create( Array.prototype );
ArrayOfNumbers.prototype.constructor = ArrayOfNumbers;


// TESTING

console.log('new ArrayOfNumbers() is Array instance', new ArrayOfNumbers(1, 1) instanceof Array);
console.log('new ArrayOfNumbers() is ArrayOfNumbers instance', (new ArrayOfNumbers(1, 1)) instanceof ArrayOfNumbers);
var a = new ArrayOfNumbers(1, 2, 3);
console.log('=', a);

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
console.log('=', a)
a.push(1, 3);
console.log('=', a);