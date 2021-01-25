// Многоквартирный дом характеризуется следующими тремя показателями:
//  - этажность (1-25),
//  - число подъездов (1-10),
//  - количество квартир на лестничной площадке (1-20).
// Скрипт запрашивает эти показатели и номер квартиры. 
// Выводится номер подъезда, в котором находится указанная квартира.
// При вводе некорректных данных предусмотреть alert.
// Config должен содержать все єти данніе(этажность, число подъездов,  количество квартир на лестничной площадке )и должен біть не публичнім

function getPodjezdOfFlat( etaznost, podjezdy, kvarNaPlosch, targetFlat ) {

  var kvarNaPodjezd = etaznost * kvarNaPlosch;

  var flatNum = 1;
  var result = {};
  // TODO: find flat in 1st for loop!!!
  for( let i = 1; i <= podjezdy; i++ ) {
    result[i] = {
      min : flatNum,
      max : kvarNaPodjezd * i
    };
    flatNum += kvarNaPodjezd;
  }
  // TODO: check when flat is out of the house

  var targetPodjezd;
  Object.keys( result ).some( podjNum => {
    let { min, max } = result[podjNum];
    if ( targetFlat <= max && targetFlat >= min ) {
      targetPodjezd = podjNum;
      return true;
    }
    return false;
  });

  return targetPodjezd;
}


console.log( 'result', getPodjezdOfFlat( 5, 3, 4 , 31 ) );