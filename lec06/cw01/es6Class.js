class ArrayOfNumbers extends Array {
	constructor(...args) {
    const isNumber = args.every( x => Object.prototype.toString.call( x ) === "[object Number]");
    if ( !isNumber ) {
      throw new Error( 'All arguments must be a numbers' );
    }
  	super(...args);
    return new Proxy( this, {
      set(target, prop, val) {
 			    // console.log( '--', val );
  
        const isNumber = Object.prototype.toString.call( val ) === "[object Number]";
	    if ( isNumber ) {
         target[prop] = val;
	      return true;
  			} else {
    			throw new Error( "Expecting a number");
    			return false;
  			}
			}
	});
  }
  isNumbers(...args){
    return args.every( x => Object.prototype.toString.call( x ) === "[object Number]");
  }
  push(...args) {
    const isNumber = args.every( x => Object.prototype.toString.call( x ) === "[object Number]");
    if ( !isNumber ) {
      throw new Error( 'All arguments must be a numbers' );
    }
    return super.push(...args);
  }
}

// console.log( new ArrayOfNumbers( 1,2,3,4,5,6,7) );
// console.log( new ArrayOfNumbers( 6 ) );
// console.log( new ArrayOfNumbers( null  ) );

// ArrayOfNumbers = new Proxy( ArrayOfNumbers, {


var a = new ArrayOfNumbers( 1,3,5 );
a.push( 7, 8 );
a[9]=4;
// a[8]='a';
console.log( a.length, a.join(',') );
Object.prototype.toString.call( a );