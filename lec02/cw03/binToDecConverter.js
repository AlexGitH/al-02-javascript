
let isContinue;
let arr = [];
while(true) {
  let value = prompt("Type number: ");
  debugger
  let number = parseInt(value);
  if( isNaN(number) || !( number === 0 || number === 1 ) ) {
    alert('number must be 0 or 1, try again');
    continue;
  }

  arr.push( number );  
  isContinue = confirm('Add another number?');

  if(!isContinue) {
    let result = parseInt( arr.join(''), 2 );
    alert(result);
    break;
  }
}