// RECEPT :https://povar.ru/recipes/sup-solyanka_klassicheskii_recept-54159.html

function wash( ingredient ) {
  checkObject( ingredient );
  ingredient.attr.isWashed = true;
  return ingredient;
}

function clean( ingredient ) {
  checkObject( ingredient );
  ingredient.attr.isCleaned = true;
  return ingredient;
}

function cool( ingredient ) {
  checkObject( ingredient );
  ingredient.attr.isCold = true;
  return ingredient;
}



/**
 * 
 * @return {[]}
 * @param {number} time - minutes ( 60min ~= 2 sec )
 * @param {string} power fire power ( low| medium | high ) 
 *?? @param {Object[]} pan - array of ingredients
 */
function boil( time, power, pan ) {
  return // boiled ingredients;
}

function fry( time, power, pan ) {  // жарить
  return // fried ingredients;
}


function randBetween( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

const UNITS = {
  SPOON : "ст. лож.",
  PIECE : "шт.",
  SLICE : "долька",
  GRAM  : "гр.",
  CLOVE : "зуб."
};

const LIMITS = {
  WATER : { min: 1700, max:2000 },
  MEAT : { min: 450, max:450 },
  MEAT_PROD : { min: 300, max:300 },
  GARLIC : { min: 2, max: 4 },
  PICKLES : { min: 2, max: 4 }, //oгурцы
  OLIVES : { min: 4, max: 15 },
  TOMATO_PASTE : { min: 1, max: 1 },
  ONION : { min: 1, max: 1 },
  VEGETABLE_OIL : { min: 2, max: 2 },
}

const INGR_UNIT_MAP = {
  "курица"                : UNITS.GRAM,
  "говядина"              : UNITS.GRAM,
  "свинина"               : UNITS.GRAM,
  "мясо"                  : UNITS.GRAM, // свинина, говядина, курица

  "ветчина"               : UNITS.GRAM,
  "колбаса"               : UNITS.GRAM,
  "копчености"            : UNITS.GRAM,
  "мясные изделия"        : UNITS.GRAM, // колбаса, ветчина, копчености: 

  "растительное масло"    : UNITS.SPOON,
  "чеснок"                : UNITS.CLOVE,
  "луковица"              : UNITS.PIECE,
  "томатная паста"        : UNITS.SPOON,
  "маринованные огурчики" : UNITS.PIECE,
  "маслины"               : UNITS.PIECE , // any positive integer
  "cоль"                  : UNITS.GRAM, // any positive integer
  "перец"                 : UNITS.GRAM , // any positive integer
  "специи"                : UNITS.GRAM , // any positive integer
  "зелень"                : UNITS.GRAM , // any positive integer
  "сметана"               : UNITS.SPOON, // any positive integer
  "лимон"                 : UNITS.SLICE, // any positive integer
  "лавровый лист"         : UNITS.PIECE // any positive integer
};

const INGREDIENTS = {
  PORK          : "свинина", //свинина
  BEEF          : "говядина", //говядина
  CHICKEN       : "курица",
  MEAT          : "мясо",
  HAM           : "ветчина",
  SALAMI        : "колбаса",
  SMOKED_MEAT   : "копчености",
  MEAT_PROD     : "мясные изделия",
  PICKLES       : "маринованные огурчики", // Маринованные огурцы
  TOMATO_PASTE  : "томатная паста",
  GARLIC        : "чеснок",  //чеснок
  ONION         : "луковица",
  VEGETABLE_OIL : "растительное масло",
  OLIVES        : "маслины",  //маслины
  SALT          : "cоль",
  PEPPER        : "перец",
  SPICE         : "специи",
  HERBS         : "зелень",
  LEMON         : "лимон",
  SOUR_CREAM    : "сметана", // сметана
  BAY_LEAF      : "лавровый лист"  // лавровый лист
}
// call example;
// makeSolyanka( 450, 150, 2000, 150, 3, 5, 1, 3, 1, 2, 10, 10, 0, 1, 2 );

// CHECKS
function isObject( item ) {
  if ( !( typeof item === 'object' && item != null ) ) {
    throw new Error( 'Value must be an object' );
  }
}


// HELPERS 
function isValidStr( value ) {
  return typeof value === 'string' && value.trim() !== '';
}

function isValidNum( value ) {
  return typeof value === 'number' && !isNaN( value );
}

/**
 * Returns Solyanka;
 * @param {number} meat - мясо (grams)
 * @param {number} smokedMeat - копчености (grams)
 * @param {number} water - вода (grams)
 * @param {number} otherMeat - мясные деликатесы (grams)
 * @param {number} pickles - маринованные огурчики (pieces)
 * @param {number} olives - маслины (pieces)
 * @param {number} onion - луковица (pieces)
 * @param {number} garlic - чеснок (cloves)
 * @param {number} tomatoPaste - томатная паста (spoons)
 * @param {number} vegetableOil - растительное масло (spoons)
 * @param {number} [salt_] - соль (grams)
 * @param {number} [pepper_] - перец (grams)
 * @param {number} [herbs_] - зелень (grams)
 * @param {number} [sugar_] - сахар (grams)
 * @param {number} [lemon_] - лимон (slices)
 * @param {number} [sourCream_] - сметана (spoons)
 * @returns {object} solyanka
 */
function makeSolyanka( meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt_, pepper_, herbs_, sugar_, lemon_, sourCream_ ) {

  let errors = [];
  // CHECK PARAMETERS
  if ( !isValidNum( meat ) ) {
    errors.push( 'Количество мяса должно быть числом в граммах' );
  }
  if ( meat > LIMITS.MEAT.max ){
    errors.push( 'Мяса слишком много!' );
  }
  if ( meat < LIMITS.MEAT.min ) {
    errors.push( 'Мяса слишком мало!' );
  }
  if ( !isValidNum( smokedMeat ) ) {
    errors.push( 'Количество копченого мяса должно быть числом в граммах' );
  }
  if ( !isValidNum( otherMeat ) ) {
    errors.push( 'Количество мясных деликатесов должно быть числом в граммах' );
  }
  let meatProduct = smokedMeat + otherMeat;
  if ( meatProduct > LIMITS.MEAT_PROD.max ){
    errors.push( 'Мясных изделий слишком много!' );
  }
  if ( meatProduct < LIMITS.MEAT_PROD.min ) {
    errors.push( 'Мясных изделий слишком мало!' );
  }

  if ( !isValidNum( water ) ) {
    errors.push( 'Количество воды должно быть числом в граммах' );
  }
  if ( water > LIMITS.WATER.max ){
    errors.push( 'Воды слишком много!' );
  }
  if ( water < LIMITS.WATER.min ) {
    errors.push( 'Воды слишком мало!' );
  }

  if ( !isValidNum( pickles ) ) {
    errors.push( 'Количество маринованных огурчиков должно быть числом в штуках' );
  }
  if ( pickles > LIMITS.PICKLES.max ){
    errors.push( 'Маринованных огурчиков слишком много!' );
  }
  if ( pickles < LIMITS.PICKLES.min ) {
    errors.push( 'Маринованных огурчиков слишком мало!' );
  }

  if ( !isValidNum( olives ) ) {
    errors.push( 'Количество маслин должно быть числом в штуках' );
  }
  if ( olives > LIMITS.OLIVES.max ){
    errors.push( 'Маслин слишком много!' );
  }
  if ( olives < LIMITS.OLIVES.min ) {
    errors.push( 'Маслин слишком мало!' );
  }

  if ( !isValidNum( onion ) ) {
    errors.push( 'Количество луковиц должно быть числом в штуках' );
  }
  if ( onion > LIMITS.ONION.max ){
    errors.push( 'Луковиц слишком много!' );
  }
  if ( onion < LIMITS.ONION.min ) {
    errors.push( 'Луковиц слишком мало!' );
  }

  if ( !isValidNum( garlic ) ) {
    errors.push( 'Количество чеснока должно быть числом в зубках' );
  }
  if ( garlic > LIMITS.GARLIC.max ){
    errors.push( 'Чеснока слишком много!' );
  }
  if ( garlic < LIMITS.GARLIC.min ) {
    errors.push( 'Чеснока слишком мало!' );
  }

  if ( !isValidNum( tomatoPaste ) ) {
    errors.push( 'Количество томатной пасты должно быть числом в ложках' );
  }
  if ( tomatoPaste > LIMITS.TOMATO_PASTE.max ){
    errors.push( 'Томатной пасты слишком много!' );
  }
  if ( tomatoPaste < LIMITS.TOMATO_PASTE.min ) {
    errors.push( 'Томатной пасты слишком мало!' );
  }

  if ( !isValidNum( vegetableOil ) ) {
    errors.push( 'Количество растительного масла должно быть числом в ложках' );
  }
  if ( vegetableOil > LIMITS.VEGETABLE_OIL.max ){
    errors.push( 'Растительного масла слишком много!' );
  }
  if ( vegetableOil < LIMITS.VEGETABLE_OIL.min ) {
    errors.push( 'Растительного масла слишком мало!' );
  }

  if ( salt_ != null && !( isValidNum( salt_ ) && salt_ >=0 ) ) {
    errors.push( 'Количество соли должно быть числом в граммах' );
  }

  if ( pepper_ != null && !( isValidNum( pepper_ ) && pepper_ >=0 ) ) {
    errors.push( 'Количество перца должно быть числом в граммах' );
  }

  if ( herbs_ != null && !( isValidNum( herbs_ ) && herbs_ >=0 ) ) {
    errors.push( 'Количество зелени и должно быть числом в граммах' );
  }

  if ( sugar_ != null && !( isValidNum( sugar_ ) && sugar_ >=0 ) ) {
    errors.push( 'Количество сахара должно быть числом в граммах' );
  }

  if ( lemon_ != null && !( isValidNum( lemon_ ) && lemon_ >=0 ) ) {
    errors.push( 'Количество лимона должно быть числом в дольках' );
  }

  if ( sourCream_ != null && !( isValidNum( sourCream_ ) && sourCream_ >=0 ) ) {
    errors.push( 'Количество сметаны должно быть числом в ложках' );
  }

  if ( errors.length > 0 ) {
    console.warn( errors.join( '\n')); //print to document???
    return ;
  }
  console.log( '+++ errors',errors)
  // return ; ///temporary


}