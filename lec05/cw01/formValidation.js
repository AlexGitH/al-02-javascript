function validate(){
  
  console.log('validate', extractData() );
}

function getValueOfInput( id ) {
  return false;
}

function extractData() {
  const inputs = document.querySelectorAll( '.setup input' );
  let result = {};
  for ( const field of inputs ) {
    result[field.name] = field.value;
  }
  return result;
}