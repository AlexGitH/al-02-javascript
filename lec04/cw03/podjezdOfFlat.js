// Многоквартирный дом характеризуется следующими тремя показателями:
//  - этажность (1-25),
//  - число подъездов (1-10),
//  - количество квартир на лестничной площадке (1-20).
// Скрипт запрашивает эти показатели и номер квартиры. 
// Выводится номер подъезда, в котором находится указанная квартира.
// При вводе некорректных данных предусмотреть alert.
// Config должен содержать все єти данніе(этажность, число подъездов,  количество квартир на лестничной площадке )и должен біть не публичнім

const RE_INTEGER = /^\d+$/;

function askNumericQuestion( text, min, max ) {
  const toStr = Object.prototype.toString;
  let message = text.trim();
  if( !( toStr.call( message ) === '[object String]' ) || message === '' ) {
    throw new Error( 'Expected non-empty string as "text" parameter.' );
  }
  if( isNaN( min ) || min < 1 ) {
    throw new Error( 'Expected positive integer as "min" parameter.' );
  }
  if( isNaN( max ) || max < 1 ) {
    throw new Error( 'Expected positive integer as "max" parameter.' );
  }

  let number;
  let error;
  do {
    if( error ){
      alert( error );
    }

    error = '';
    let result = prompt ( message ).trim();

    if ( !RE_INTEGER.test( result ) ) {
      error = 'Ожидается положительное целое число.';
      continue;
    }
    number = parseInt( result );
    if ( isNaN( number ) ) {
      error = 'Нельзя преобразовать в число';
    }
    else if ( number > max ) {
      error = 'Число слишком большое.';
    }
    else if ( number < min ) {
      error = 'Число слишком маленькое.';
    }
  } while ( error != '' ) 

  return number;

}

function createConfig() {
  return {
    storeysNum       : askNumericQuestion( 'введите количество этажей(1-25)', 1, 25 ),
    entranceNum      : askNumericQuestion( 'введите количество подъездов(1-10)', 1, 10 ),
    vestibuleFlatNum : askNumericQuestion( 'введите количество квартир на лесничной площадке(1-20)', 1, 20 )
  }
}

function getPodjezdOfFlat( storeysNum, entranceNum, vestibuleFlatNum, targetFlat ) {

  const min = 1;
  const flatsPerEntrance = storeysNum * vestibuleFlatNum;

  var maxFlatNumber =  flatsPerEntrance * entranceNum;

  if ( targetFlat < min || targetFlat > maxFlatNumber ) {
    return 'Нет такой квартиры в доме';
  }

  for( let currentEntrance = min; currentEntrance <= entranceNum; currentEntrance++ ) {
    let max = flatsPerEntrance * currentEntrance;
    if ( targetFlat <= max ) {
      return currentEntrance;
    }
  }
  throw new Error( 'Unexpected error' );
}
