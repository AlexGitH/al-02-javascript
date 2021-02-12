const days = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
  8: 'monday',
  9: 'tuesday',
  10: 'wednesday',
  11: 'thursday',
  12: 'friday',
  13: 'saturday',
  14: 'sunday',
  15: 'monday',
  16: 'tuesday',
  17: 'wednesday',
};

let result = {};

for( let monthDay in days ) {
	let weekDay = days[monthDay];
	if ( weekDay in result ) {
  	result[weekDay]++;
  }
  else {
  	result[weekDay] = 1;
  }
}

for( let weekDay in result ) {
	console.log( `number of '${weekDay}': ${result[weekDay]}` );
}

