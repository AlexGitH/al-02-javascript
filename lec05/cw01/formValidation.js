// TASK REQUIREMENTS
// Login field validation must be without regex
// Login must be a valid email
// Password must be at least 6 character
function validate() {
  const data = extractData();
  let errors = [];
  const emailValidMessage = validateEmail( data.email );
  const passwordValidMessage = validatePassword( data.password ); 
  if ( emailValidMessage != null ) {
    errors.push( emailValidMessage );
  }
  if ( passwordValidMessage != null ) {
    errors.push( passwordValidMessage );
  }

  refreshInfo( errors );
  if ( errors.length === 0 ) {
    resetData();
  }
}

function refreshInfo( messages ) {
  let el = document.querySelector( 'div.valid-info' );
  let result = `<span class="valid">Successfully submitted!</span>`;
  if ( messages.length > 0 ) {
    result = `<div class="invalid">Resolve validation errors:<ul>${messages.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
  }
  el.innerHTML = result;
}

function validatePassword( password ) {
  if ( password.length < 6 ) {
    return 'Password must be at least 6 characters long';
  }
  return null;
}

function validateEmail( email ) {
  var lastIndex = email.length - 1;
  var at = email.indexOf( '@' );
  var atLast = email.lastIndexOf( '@' );
  var dot = email.lastIndexOf( '.' );
  for( const char of email ) {
    const code = char.charCodeAt( 0 );
    if ( code !== 46 && code !== 64 &&
         ( code < 48 || code > 57 ) &&
         ( code < 64 || code > 90 ) &&
         ( code < 97 || code > 122 ) ) {
      return 'Email must have only english letters, numbers, "." and "@" characters';
    }
  }
  if ( email.length <= 0 ) {
    return 'Email field is mandatory';
  }
  if ( at <= 0 && at === atLast ) {
    return 'Email must have only one "@" character';
  }
  if ( email.indexOf( '@.' ) >= 0 || email.indexOf( '.@' ) >= 0 || email.indexOf( '..' ) >= 0 ) {
    return 'Email must not have "@.", ".@" or ".." character combinations';
  }
  if ( dot === lastIndex || at === lastIndex ) {
    return 'Email must not have trailing "." or "@" characters';
  }
  if ( at < 1 || email.indexOf( '.' ) < 1 ) {
    return 'Email must not have leading "@" or "." characters';
  }
  if ( atLast > dot ) {
    return 'Email must have leading at least one "." character after "@"';
  }
  return null;
}

function resetData() {
  const inputs = document.querySelectorAll( '.setup input' );
  for ( const field of inputs ) {
    field.value = '';
  }
}

function extractData() {
  const inputs = document.querySelectorAll( '.setup input' );
  let result = {};
  for ( const field of inputs ) {
    if ( field.type !== 'password' ) {
      result[field.name] = field.value.trim();
    }
    else {
      result[field.name] = field.value;
    }
  }
  return result;
}