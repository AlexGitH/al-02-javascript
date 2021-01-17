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
  case op.SUM:
    return sum;
  case op.SUB:
    return sub;
  case op.MUL:
    return mul;
  case op.DIV:
    return div;
  case op.POW:
    return pow;
  default:
    return 'Incorrect operator';
  }
}

function calculate(operator, operand1, operand2) {
  var action = findAction(operator);
  if(typeof action === 'string') {
    return action; // TODO: throw exception
  }
  return action(parseFloat(operand1), parseFloat(operand2));
}
console.log(' 2 + 3:', calculate('+', 3, 2));
console.log(' 3 - 2:', calculate('-', 3, 2));
console.log(' 3 * 2:', calculate('*', 3, 2));
console.log(' 10 / 2:', calculate('/', 10, 2));
console.log(' 5 ^ 2:', calculate('^', 5, 2));

// ((?!\d+\.\d+)\d+)|(\d+(?:\.\d+)+)
// TEST:
// 13
// 1.4
//  123.4562
// 12344 323.325 23455.6994.34 234

var reDelSpaces = /\s+/g;
// var reAddSpace = /(\d+|[+\-*\/^=])/g;
// var reAddSpace = /((?!\d+\.\d+)\d+)|(\d+(?:\.\d+)+)|[+\-*\/^=]/g;
var reAddSpace = /(((?!\d+\.\d+)\d+)|(\d+(?:\.\d+)+)|[+\-\/*^])/g;

function removeMultSpaces(str) {
  return str.replace(reDelSpaces, ' ').trim();
}

function addSpaceAfterCharacter(str) {
  return str.replace(reAddSpace, '$1 ');
}

var expr = '3 +4 - 5+3';

function calcCommonOrder(expr) {
  var exprWithSpaces = addSpaceAfterCharacter(expr);
  var exprNormalized = removeMultSpaces(exprWithSpaces);
  var operation = {
    operator: null,
    operand1: null,
    operand2: null
  };
  exprNormalized.split(' ').forEach(function (el) {
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
      o.operand1 = calculate(o.operator, o.operand1, o.operand2);
      o.operator = null;
      o.operand2 = null;
    }

  });
  return operation.operand1;
}

// console.log('result = ', operation.operand1);
console.log('result = ', calcCommonOrder( '4+5 -4* 2'));
// console.log( 'expr ', exprNormalized.split(' ') );


function simplifyPowers( mathSequence ) {
  var expressions = {};
  var o = OPERATORS;
  mathSequence.forEach( function( item, idx ) {
    if ( item === o.POW ) {
      var startIndex = idx - 1;
      var endIndex = idx + 1;
      expressions[startIndex] = calculate( o.POW, mathSequence[startIndex], mathSequence[endIndex] );
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


console.log( 'simplification test:', simplifyPowers( [2, "+", 3, '^', 2 , '-',2,'^',2 ]) );
/*

// TODO:  level 1 :highest priority
var power = {
  index: 3, // replace in iteration from index 2 util 4( 3 items ) 
  operand1: 5,
  operand2: 2,
  operator: '^'
}
// TODO:  level 2 : middle priority
var multiplication = { // or division
  index: 3, // replace in iteration from index 2 util 4( 3 items ) 
  operand1: 5,
  operand2: 2,
  operator: '^'
}
// TODO:  level 3 : lowest priority

*/