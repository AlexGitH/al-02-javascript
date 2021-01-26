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
    throw new Error( 'Expected non-empty string as "text" parameter.' )
  }
  if( isNaN( min ) || min < 1 ) {
    throw new Error( 'Expected positive integer as "min" parameter.' )
  }
  if( isNaN( max ) || max < 1 ) {
    throw new Error( 'Expected positive integer as "max" parameter.' )
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
      error = 'Expected positive integer number.';
      continue;
    }
    number = parseInt( result );
    if ( isNaN( number ) ) {
      error = 'Cannot parse new number';
    }
    else if ( number > max ) {
      error = 'Number is to big.';
    }
    else if ( number < min ) {
      error = 'Number is to small.';
    }
  } while ( error != '' ) 

  return number;

}

function createConfig() {
  return {
    etaznost     : askNumericQuestion( 'введите количество этажей(1-25)', 1, 25 ),
    podjezdy     : askNumericQuestion( 'введите количество подъездов(1-10)', 1, 10 ),
    kvarNaPlosch : askNumericQuestion( 'введите количество квартир на лесничной площадке(1-20)', 1, 20 )
  }
}

function getPodjezdOfFlat( etaznost, podjezdy, kvarNaPlosch, targetFlat ) {

  var kvarNaPodjezd = etaznost * kvarNaPlosch;

  var minFlatNumber = 1;
  var maxFlatNumber =  kvarNaPodjezd * podjezdy;

  if ( targetFlat < minFlatNumber || targetFlat > maxFlatNumber ) {
    return 'no such flat in the house';
  }

  for( let currentPodjezd = 1; currentPodjezd <= podjezdy; currentPodjezd++ ) {
    let max = kvarNaPodjezd * currentPodjezd;
    if ( targetFlat <= max ) {
      return currentPodjezd;
    }
  }
  throw new Error( 'Unexpected error' );
}
