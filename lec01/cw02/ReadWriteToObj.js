var store = {};

function storeGet( key ) {
	var content = store[key];
  if ( content != null ) {
 		return content;
  }
  else {
  	return 'NO DATA';
  }
}

function storeSet( key, value ) {
  if ( typeof key === 'string' || typeof key === 'number' ) {
  	store[key] = value;
  }
  else {
  	return 'ERROR: key must be a string or number'
  }
}

// Add Values;
storeSet( 'test', 1 );
storeSet( '3', '2kjkdjjs' );
storeSet( 2, 1 );
console.log( 'get value', storeGet( '3' ) );
console.log( 'get value', storeGet( 'test' ) );
// INCORRECT VALUE;
console.log( 'use incorrect key', storeSet( null, 100 ) );