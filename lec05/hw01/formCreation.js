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
  let label = createEl( 'label', {
    for : name
  });
  let div = createEl( 'label', {
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

// TODO: add event listeners and validation functions