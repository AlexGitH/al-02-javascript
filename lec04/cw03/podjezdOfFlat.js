// Многоквартирный дом характеризуется следующими тремя показателями:
//  - этажность (1-25),
//  - число подъездов (1-10),
//  - количество квартир на лестничной площадке (1-20).
// Скрипт запрашивает эти показатели и номер квартиры. 
// Выводится номер подъезда, в котором находится указанная квартира.
// При вводе некорректных данных предусмотреть alert.
// Config должен содержать все єти данніе(этажность, число подъездов,  количество квартир на лестничной площадке )и должен біть не публичнім

main();

// ENTRY POINT
function main() {
  let isCreateNewBuilding = true;
  while ( isCreateNewBuilding ) {
    let isAnotherSearch = true;
    const findEntrance = createEntranceFinder();
    if ( findEntrance == null ) {
      return;    }
    while( isAnotherSearch ) {
      const flat = askNumberInRange( 'введите номер квартиры, чтобы узнать ее подъезд', 0, Number.MAX_SAFE_INTEGER );
      if ( flat == null ){
        return;
      }
      const entrance = findEntrance( flat );

      if ( entrance == null ) {
        alert( `В доме нет квартиры №${flat}` );
      }
      else {
        alert( `Квартира №${flat} находится в подъезде № ${entrance}` );
      }

      isAnotherSearch = confirm( 'Найти подъезд для другой квартиры?' );
    }
    isCreateNewBuilding = confirm( 'Поискать подъезды по квартире в другом доме?' );
  }
}

// IMPLEMENTATION ROUTINE
function askNumberInRange( text, min, max ) {
  const reInteger = /^\d+$/;
  const toStr = Object.prototype.toString;
  let message = text.trim();
  if( !( toStr.call( message ) === '[object String]' ) || message === '' ) {
    throw new Error( 'Expected non-empty string as "text" parameter.' );
  }
  if( isNaN( min ) || min < 0 ) {
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
    let answer = prompt( message );
    if ( answer == null ) {
      return;   // abort dialog;
    }

    let result = answer.trim();

    if ( !reInteger.test( result ) ) {
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

function getEntranceOfFlat( storeysNum, entranceNum, vestibuleFlatNum, targetFlat ) {

  const min = 1;
  const flatsPerEntrance = storeysNum * vestibuleFlatNum;

  var maxFlatNumber =  flatsPerEntrance * entranceNum;
  if ( targetFlat < min || targetFlat > maxFlatNumber ) {
    return null;
  }

  for( let currentEntrance = min; currentEntrance <= entranceNum; currentEntrance++ ) {
    let max = flatsPerEntrance * currentEntrance;
    if ( targetFlat <= max ) {
      return currentEntrance;
    }
  }
  throw new Error( 'Unexpected error' );
}
  

function createEntranceFinder() {
  let config = {};
  config.storeysNum =  askNumberInRange( 'введите количество этажей(1-25)', 1, 25 );
  if ( config.storeysNum == null ) {
    return null; // abort dialog;
  }
  config.entranceNum =  askNumberInRange( 'введите количество подъездов(1-10)', 1, 10 );
  if ( config.entranceNum == null ) {
    return null;
  }
  config.vestibuleFlatNum =  askNumberInRange( 'введите количество квартир на лесничной площадке(1-20)', 1, 20 );
  if ( config.vestibuleFlatNum == null ) {
    return null;
  }

  return function ( flat ) {
    const {storeysNum, entranceNum, vestibuleFlatNum} = config;
    return getEntranceOfFlat( storeysNum, entranceNum, vestibuleFlatNum, flat );   
  }
}
