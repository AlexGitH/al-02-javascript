let value = prompt("Type number of iteration");
let number = parseInt( value );
if ( isNaN( number ) ){
	console.log( 'Input is not a number'	);
}
else {
  for( let i = 0; i<number; i++ ) {
    console.log( 'hello from bot', i );
  }
}
