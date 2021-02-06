// TASK REQUIREMENTS
// Login field validation must be without regex
// Login must be a valid email
// Password must be at least 6 character
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