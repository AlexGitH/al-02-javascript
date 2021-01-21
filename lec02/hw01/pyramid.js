function getStageMedian( medianNumber ) {
  return medianNumber * 2 - 1;
}

function buildAir( number ){
  return '-'.repeat( number );
}

function buildBlocks( number ){
  return '#'.repeat( number );
}

function createPyramid( medianNumber ) {
  const maxLength = getStageMedian( medianNumber );
  let count = 0;
  let result = [];
  while ( count++ < medianNumber ) {
    let stageMedian = getStageMedian( count );
    let airLength = ( maxLength - stageMedian ) / 2;
    let air = buildAir( airLength );
    let blocks = buildBlocks( stageMedian );
    result.push( `${air}${blocks}${air}` );
  }
  return result.join( '\n' );
}