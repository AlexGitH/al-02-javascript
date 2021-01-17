/** /
1. must be only numbers (with dot as decimal separator) and operators
2. remove all spaces ???
3. minus or plus in the beginning allowed;
4. multiple operators between 2 numbers are not allowed
5. braces "()" and mathematical order must work appropriately
6. // IDEA: use folding function;
/**/
var OPERATORS = {
  SUM: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/',
  POW: '^'
}

// PARSING CONSTANTS
var RE_DEL_SPACES = /\s+/g;
var RE_ADD_SPACE = /(((?!\d+\.\d+)\d+)|(\d+(?:\.\d+)+)|[+\-\/*^])/g;

// VALIDATION CONSTANTS
var RE_ALLOWED_CHARACTERS = /^[\d\.\s+\-\/*^=]+$/;
var RE_MINIMAL_REQUIREMENTS = /(\d+ *[*+\-\/*^] *\d+)( *[*+\-\/*^] *\d+)*/;
var RE_FIRST_OR_LAST_OPERATOR = /^\s*[.+\-\/*^=]|[.+\-\/*^]\s*$/;
var RE_SUBSEQUENT_OPERATORS = /[.+\-\/*^=]{2}/;

function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

function pow(a, b) {
  return a ** b;
}

function findAction(operator) {
  var op = OPERATORS;
  switch (operator) {
    case op.SUM: return sum;
    case op.SUB: return sub;
    case op.MUL: return mul;
    case op.DIV: return div;
    case op.POW: return pow;
    default: return 'Incorrect operator';
  }
}

function calculate(operator, operand1, operand2) {
  var action = findAction(operator);
  if(typeof action === 'string') {
    return action; // TODO: throw exception
  }
  return action(parseFloat(operand1), parseFloat(operand2));
}

function removeMultSpaces(str) {
  return str.replace(RE_DEL_SPACES, ' ').trim();
}

function addSpaceAfterCharacter(str) {
  return str.replace(RE_ADD_SPACE, '$1 ').trim();
}

function calcCommonOrder(expr) {
  // TODO: check expr is array
  var operation = {
    operator: null,
    operand1: null,
    operand2: null
  };

  expr.forEach(function (el) {
    var o = operation;
    var item = parseFloat(el);
    if(!isNaN(item)) {
      if(o.operand1 == null) {
        o.operand1 = item;
      } else if(o.operand2 == null) {
        o.operand2 = item;
      } else {
        throw new Error('Unexpected Error');
      }
    } else {
      if(o.operator == null) {
        o.operator = el;
      } else {
        throw new Error('multiple operators for one operation are not allowed')
      }
    }

    if( o.operator != null && o.operand1 != null && o.operand2 != null ) {
      o.operand1 = calculate( o.operator, o.operand1, o.operand2 );
      o.operator = null;
      o.operand2 = null;
    }

  });
  return operation.operand1;
}

// TODO: think about refactoring
function simplifyPowers( mathSequence ) {
  var o = OPERATORS;
  var config = {};
  config[o.POW] = true;
  return simplifyExpr( mathSequence, config );
}

function simplifyMultDiv( mathSequence ) {
  var o = OPERATORS;
  var config = {};
  config[o.MUL] = true;
  config[o.DIV] = true;
  return simplifyExpr( mathSequence, config );
}

function createSimplifiedMetadata( mathSequence, config ) {
  var expressions = {};
  var operator;
  mathSequence.forEach( function( item, idx ) {
    if ( config[item] === true ) {
      operator = item;
      var startIndex = idx - 1;
      var endIndex = idx + 1;
      expressions[startIndex] = calculate( operator, mathSequence[startIndex], mathSequence[endIndex] );
    }
  });
  return expressions;
}

function createSimplifiedExpression( mathSequence, expressions ) {
  var simplifiedExpr = [];
  var skipCount = 0;
  mathSequence.forEach( function( item, idx ) {
    if ( skipCount > 0 ) {
      skipCount--;
      return;
    }

    var value = expressions[idx];
    if ( value != null ) {
      simplifiedExpr.push( value );
      skipCount = 2;
    }
    else {
      simplifiedExpr.push( item );
    }
  });
  return simplifiedExpr;
}

function simplifyExpr( mathSequence, config ) {
  var expressions = createSimplifiedMetadata( mathSequence, config );
  return createSimplifiedExpression( mathSequence, expressions );
}

function validate( str ) {
  if ( !RE_ALLOWED_CHARACTERS.test( str ) ) {
    return 'Allowed characters: " 0-9.+-*/^="';
  }
  if ( !RE_MINIMAL_REQUIREMENTS.test( str ) ) {
    return 'Complete operation i.e. "3 + 2"';
  }
  if ( RE_FIRST_OR_LAST_OPERATOR.test( str ) ) {
    return 'Leading or trailing operators are not allowed';
  }
  if ( RE_SUBSEQUENT_OPERATORS.test( str ) ) {
    return 'Missing number between operators';
  }
}

function calcComplexExpr( str ) {
  var error = validate( str );
  if ( error != null ) {
    return error;
  }
  var exprWithSpaces = addSpaceAfterCharacter(str);
  var exprNormalized = removeMultSpaces(exprWithSpaces).split( ' ' );

  var exprCalcPowers = simplifyPowers( exprNormalized );
  var expr = simplifyMultDiv( exprCalcPowers );
  return calcCommonOrder( expr );
}

console.log( 'calculate Simplified values test:', calcComplexExpr(' 2 + 3^2 -2^2') );
