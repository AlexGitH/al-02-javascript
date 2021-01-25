//Создайте функцию, которая возвращает сумму двух наименьших положительных чисел
// из массива минимум 4 положительных целых чисел.
// Не передаются числа с плавающей запятой или неположительные целые числа.

function sumOfTwoMin( numbers ) {
  if ( numbers.length < 4 ) {
    throw new Error( 'incorrect number ' );
  }
  
  let minOne = numbers.reduce( (acc , n) => {
		return n < acc ? n : acc;
  }, Number.POSITIVE_INFINITY );
  
  let minTwo = numbers.reduce( (acc , n) => {
		return ( n > minOne && n < acc ) ? n : acc;
  }, Number.POSITIVE_INFINITY );
  
  return minOne + minTwo;
}

var a = [3,5,6,7,1];
console.log( sumOfTwoMin( a ) );

var b = [6,2,20,10,55,1];
console.log( sumOfTwoMin( b ) );
