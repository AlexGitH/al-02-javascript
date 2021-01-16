
function sum( a,b ) {
	return a + b;
}

function sub( a, b ) {
	return a - b;
}

function mul( a, b ) {
  return a * b;
}

function div( a, b ) {
	return a / b;
}

function pow( a, b ) {
	return a**b;
}

function calculate( operator, operand1, operand2 ) {
	switch ( operator ) {
     case '+' : return sum( operand1, operand2 );
     case '-' : return sub( operand1, operand2 );
     case '*' : return mul( operand1, operand2 );
     case '/' : return div( operand1, operand2 );
     case '^' : return pow( operand1, operand2 );
     default : return 'Incorrect operator';
  }
}

console.log( ' 2 + 3:', calculate( '+', 3, 2 ) );
console.log( ' 3 - 2:', calculate( '-', 3, 2 ) );
console.log( ' 3 * 2:', calculate( '*', 3, 2 ) );
console.log( ' 10 / 2:', calculate( '/', 10, 2 ) );
console.log( ' 5 ^ 2:', calculate( '^', 5, 2 ) );