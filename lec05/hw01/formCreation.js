// Домашне завдання:
// на понеділок створити форму виключено засобами JS.
// Вимоги:
// Пароль не менше 6 симолів, мають бути присутні букви і цифри
// Ім"я має бути без пробілів.
// Емейл має бути зареєстрований на gmail.com.
// всі поля обовязкові.
// При помилковому введенні висвічувати текст з розшифровкою помилки

// Additional Task Restrictions:
// - don't use RegEx;
// - don't use "email" input type;
window.onload = function() {
  createLayout();
}

const FIELD_CONFIGS = [{
  name : 'firstName',
  type : 'text',
  placeholder: 'First Name *',
  isLong : false
},{
  name : 'lastName',
  type : 'text',
  placeholder: 'Last Name *',
  isLong : false
},{
  name : 'email',
  type : 'text',
  placeholder: 'Email Address *',
  isLong : true
},{
  name : 'password',
  type : 'password',
  placeholder: 'Set A Password *',
  isLong : true
}];

function createLayout() {
  let entry = createMainEl();
  let formToggle = createFormToggle();
  const signUp = createButton( 'sign-up', 'Sign Up' );
  const logIn = createButton( 'log-in', 'Log In' );
  formToggle.append( signUp, logIn );
  const heading = createHeader( 'Sign Up for Free' );
  let form = createForm();
  for( const config of FIELD_CONFIGS ) {
    const { name, type, placeholder, isLong } = config;
    const field = createFieldContainer( name, type, placeholder, isLong );
    form.append( field );
  }
  const submit = createSubmitButton( 'GET STARTED' ); 
  form.append( submit );
  entry.append( formToggle, heading, form );
  document.body.append( entry );
  submit.addEventListener( 'click', validate );
}

function createMainEl() {
  return createEl( 'div', {
    class: 'entry'
  });
}

function createFormToggle() {
  return createEl( 'div', {
    class: 'form-toggle'
  });
}

function createButton( cls, text ) {
  let el = createEl( 'button', {
    class: cls
  });
  el.innerText = text;
  return el;
}

function createSubmitButton( text ) {
  let el = createEl( 'button', {
    class: 'sign-up',
    type: 'button'
  });
  el.innerText = text.toUpperCase();
  return el;
}

function createHeader( text ) {
  let el = createEl( 'h1', {} );
  el.innerText = text;
  return el;
}

function createForm() {
  let el = createEl( 'form', {
    class: 'frm-sign-up',
    name: 'signUp'
  });
  return el;
}

function createFieldContainer( name, type, placeholder, isLong ) {

  let container = createEl( 'div', {
    class : `field-container${isLong === true ? ' long' : ''}`
  });
  let input = createEl( 'input', {
    id : name,
    name : name,
    type : type,
    placeholder: placeholder
  });

  // TODO: label needed to customize input placeholder with double text color;
  let label = createEl( 'label', {
    for : name
  });
  let div = createEl( 'div', {
    class : 'valid-info'
  });

  container.append( input, label, div );
  return container;
}

function createEl( name, config ) {
  let el = document.createElement( name );
  for( const [attr,val] of Object.entries( config ) ) {
    el.setAttribute( attr, val );
  }
  return el;
}


// VALIDATION

function validate() {
  const data = extractData();
  console.log( data );
  const firstNameValidMessage = validateName( data.firstName.value );
  const lastNameValidMessage = validateName( data.lastName.value );
  const emailValidMessage = validateEmail( data.email.value );
  const passwordValidMessage = validatePassword( data.password.value );
  data.firstName.errElm.innerHTML = firstNameValidMessage;
  data.lastName.errElm.innerHTML = lastNameValidMessage;
  data.email.errElm.innerHTML = emailValidMessage;
  data.password.errElm.innerHTML = passwordValidMessage;
  // simulate successful submission;
  if ( !firstNameValidMessage &&
       !lastNameValidMessage &&
       !emailValidMessage &&
       !passwordValidMessage ) {

    window.signUp.reset();
    alert( 'Successfully registered!');
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

function validateName( name ) {
  if ( name === '' ) {
    return 'This field is mandatory';
  }
  for( const char of name ) {
    const code = char.charCodeAt( 0 );
    if ( code >= 48 && code <= 57 ) {
      return 'Numbers are not allowed';
    }
  }
  if ( name.indexOf( ' ' ) >= 0 || name.indexOf( '\t' ) >= 0) {
    return 'Spaces are not allowed';
  }
  return null;
}

function validatePassword( password ) {
  let hasNumbers, hasLetters;
  for( const char of password ) {
    const code = char.charCodeAt( 0 );
    if ( code >= 48 && code <= 57 ) {
      hasNumbers = true;
    }
    if ( code >= 64 && code <= 90 ) {
      hasLetters = true;
    }
    if ( code >= 97 && code <= 122 ) {
      hasLetters = true;
    }
  }
  if ( !hasLetters || !hasNumbers ) {
    return 'Password must have english letters and numbers';
  }
  if ( password.length < 6 ) {
    return 'Password must be at least 6 characters long';
  }
  return null;
}

function validateEmail( email ) {
  const lastIndex = email.length - 1;
  const at = email.indexOf( '@' );
  const atLast = email.lastIndexOf( '@' );
  const dot = email.lastIndexOf( '.' );
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
  if ( email.indexOf( '@gmail.com' ) < 0 ) {
    return 'Email must be registered at "@gmail.com"';
  }
  return null;
}

function extractData() {
  const els = document.querySelectorAll( 'form>.field-container' );
  let result = {};
  for ( const el of els ) {
    const field = el.firstChild;
    if ( field.type !== 'password' ) {
      result[field.name] = {
        value : field.value.trim(),
        errElm : el.lastChild
      };
    }
    else {
      result[field.name] = {
        value : field.value,
        errElm : el.lastChild
      };
    }
  }
  return result;
}