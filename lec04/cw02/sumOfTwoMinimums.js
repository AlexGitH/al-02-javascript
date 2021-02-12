//Создайте функцию, которая возвращает сумму двух наименьших положительных чисел
// из массива минимум 4 положительных целых чисел.
// Не передаются числа с плавающей запятой или неположительные целые числа.

function sumOfTwoMin( numbers ) {
  if ( numbers.length < 4 ) {
    throw new Error( 'Expected at least 4 items in the array' );
  }
  const maxNum = Number.POSITIVE_INFINITY;
  let { minOne, minTwo } = numbers.reduce( ( acc , n ) => {
    return n < acc.minOne
      ? { minOne: n,          minTwo: acc.minOne } : n < acc.minTwo
      ? { minOne: acc.minOne, minTwo: n }          : acc;
  }, { minOne: maxNum, minTwo: maxNum } );
  
  return minOne + minTwo;
}

var a = [3,5,6,7,1];
console.log( sumOfTwoMin( a ) );

var b = [6,2,20,10,55,1];
console.log( sumOfTwoMin( b ) );
