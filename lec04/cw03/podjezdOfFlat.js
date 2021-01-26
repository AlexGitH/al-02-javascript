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
