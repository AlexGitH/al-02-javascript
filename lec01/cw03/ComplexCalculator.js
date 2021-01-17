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

var reDelSpaces = /\s+/g;
var reAddSpace = /(((?!\d+\.\d+)\d+)|(\d+(?:\.\d+)+)|[+\-\/*^])/g;

function removeMultSpaces(str) {
  return str.replace(reDelSpaces, ' ').trim();
}

function addSpaceAfterCharacter(str) {
  return str.replace(reAddSpace, '$1 ').trim();
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

function simplifyExpr( mathSequence, config ) {
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

function validate( str ) {
  var reAllowedCharacters = /^[\d\.\s+\-\/*^=]+$/;
  var reMinimalRequirements = /(\d+ *[*+\-\/*^] *\d+)( *[*+\-\/*^] *\d+)*/;
  var reFirstOrLastOperator = /^\s*[.+\-\/*^=]|[.+\-\/*^]\s*$/;
  var reSubsequentOperators = /[.+\-\/*^=]{2}/;

  if ( !reAllowedCharacters.test( str ) ) {
    return 'Allowed characters: " 0-9.+-*/^="';
  }
  if ( !reMinimalRequirements.test( str ) ) {
    return 'Complete operation i.e. "3 + 2"';
  }
  if ( reFirstOrLastOperator.test( str ) ) {
    return 'Operator in the beginning or in the end of line';
  }
  if ( reSubsequentOperators.test( str ) ) {
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
