// RECEPT :https://povar.ru/recipes/sup-solyanka_klassicheskii_recept-54159.html

function wash( ingredient ) {
  return //washed ingredient;
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

const MEASURE_POINTS = {
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

const ingredients = {
  "курица"                : MEASURE_POINTS.GRAM,
  "говядина"              : MEASURE_POINTS.GRAM,
  "свинина"               : MEASURE_POINTS.GRAM,
  "мясо"                  : MEASURE_POINTS.GRAM, // свинина, говядина, курица

  "ветчина"               : MEASURE_POINTS.GRAM,
  "колбаса"               : MEASURE_POINTS.GRAM,
  "копчености"            : MEASURE_POINTS.GRAM,
  "мясные изделия"        : MEASURE_POINTS.GRAM, // колбаса, ветчина, копчености: 

  "растительное масло"    : MEASURE_POINTS.SPOON,
  "чеснок"                : MEASURE_POINTS.CLOVE,
  "луковица"              : MEASURE_POINTS.PIECE,
  "томатная паста"        : MEASURE_POINTS.SPOON,
  "маринованные огурчики" : MEASURE_POINTS.PIECE,
  "маслины"               : MEASURE_POINTS.PIECE , // any positive integer
  "cоль"                  : MEASURE_POINTS.GRAM, // any positive integer
  "перец"                 : MEASURE_POINTS.GRAM , // any positive integer
  "специи"                : MEASURE_POINTS.GRAM , // any positive integer
  "зелень"                : MEASURE_POINTS.GRAM , // any positive integer
  "сметана"               : MEASURE_POINTS.SPOON, // any positive integer
  "лимон"                 : MEASURE_POINTS.SLICE, // any positive integer
  "лавровый лист"         : MEASURE_POINTS.PIECE // any positive integer
};


// call example;
// makeSolyanka( 450, 150, 2000, 150, 3, 5, 1, 3, 1, 2, 10, 10, 0, 1, 2 );

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
  console.log( 'errors',errors)
  return ; ///temporary


  let salt = salt_ || 0;
  let pepper = pepper_ || 0;
  let herbs = herbs_ || 0;
  let sugar = suggar || 0;
  let lemon = lemon_ || 0;
  let sourCream = sourCream_ || 0;

  //1.

  // let meat = getMeatWeight();//prompt
  let washedMeat = wash( meat );
  // let water = getWater(); //prompt  2 liters == 2000grm
  // let smokedMeat = getSmokedMeat(); //prompt,
  // let pan = new Pan(); // constructor; 
  let pan = createPan(); // constructor; 
  pan.put( washedMeat, water, smokedMeat );

  let minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  let powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  //2. 
  
  pan.stopBoil(); //?? 
  let hotBoiledMeat = extractMeat( pan );
  let cooledBoiledMeat = coolMeat( hotBoiledMeat ); // time 
  let bouillon = extractBoulion( pan );
  let refinedBouillon = refineBoulion( bouillon );
  let blendedMeat = blend( cooledBoiledMeat );
  pan.put( blendedMeat, refinedBouillon );

  minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  //3. 

  // let otherMeat = getOtherMeatWeight();//prompt
  let blendedOtherMeat = blend( otherMeat );
  pan.put( blendedOtherMeat );

   
  //4. 

  // let pickles = getPickles(); //prompt
  let blendedPickles = blend( pickles );
  // let olives = getOlives(); //prompt
  let blendedOlives = blend( olives );


  //5.

  pan.put( blendedOlives, blendedPickles );

  //6.
  // let onion = getOnion();  //prompt
  // let garlic = getGarlic(); //prompt
  let cleanedOnion = clean( onion );
  let cleanedGarlic = clean( garlic );
  let blendedOnion = blend( cleanedOnion );
  let blendedGarlic = blend( cleanedGarlic );
  // let tomatoPaste = getTomatoPaster(); //prompt;
  // let vegetableOil = getVegetableOil(); //prompt;

  // let otherPan = new Pan();
  let otherPan = createPan();


  otherPan.put( blendedGarlic, blendedOnion, vegetableOil );
  let minutesToFryGarlicOnion = 3;
  let powerToFryGarlicOnion = 'high';
  otherPan.boil( minutesToFryGarlicOnion, powerToFryGarlicOnion );
  otherPan.put( tomatoPaste );

  //7.

  // let salt = getSalt();//prompt
  // let pepper = getPepper(); //prompt
  // let sugar = getSugar(); // prompt; OPTIONAL

  let minutesToMakeSauce = 5;
  let powerToMakeSauce = 'low';

  otherPan.put( salt, pepper, sugar, herbs );
  otherPan.boil( minutesToMakeSauce, powerToMakeSauce );

  //8.

  let sauce = getSauceFromPan( otherPan ); 
  pan.put( sauce );

  let minutesToCompleteSolyanka = randBetween( 5, 7 ); 
  let powerToCompleteSolyanka = 'low'; 
  pan.boil( minutesToCompleteSolyanka, powerToCompleteSolyanka );

  //9. 

  pan.stopBoil();
  pan.close();
  wait( 30 ); //minutes

  let solyanka = createSolyanka();
  solyanka.put( pan.getAll() );

  solyanka.put( lemon, sourCream );

  //SOLYANKA IS READY!!!
  return solyanka;
}

function createSolyanka() {
  let items = [];
  return {
    put: function(...args) {
      items.push( ...args );
    },

    getAll : function() {
      let result = items;
      items = [];
      return result;
    }
  };
}

function createPan() {
  let items = [];
  let isBoiling = false;
  let isClosed = false;
  let boilingId = null;

  const eachItem = function( fn, scope ) {
    items.forEach( fn.call( scope ) )
  }

  return {
    put : function( ...args ) {
      items.push( ...args );
    },
   
    get : function( name ){
      let newItems = [];
      let result = [];
      if( name == null || !isValidStr( name ) ) {
        return result;
      }

      items.forEach( (item) => {
        if ( item.name === name ) {
          result.push( item );
        }
        else {
          newItems.push( item );
        }
      });

      if ( result.length > 0 ) {
        items = newItems;
      }
      return result;
    },

    getAll : function() {
      let result = items;
      items = [];
      return result;
    },

    boil: function( minutes, power ) {
      if ( isBoiling === true ) {
        console.log( 'Pan is allready boiling' );
        return;
      }
      boilingId = setTimeout( () => {
        boilingId = null;
        isBoiling = false;
        eachItem( function( item, idx_ ) {
          item.isBoiled = true;
        })
      })
    },
    
    stopBoil : function() {
      clearTimeout( boilingId );
      boilingId = null;
    },
    close : function() {
      isClosed = true;
      console.log( 'Pan is closed' );
    },
    open : function() {
      isClosed = false;
      console.log( 'Pan is opened' );
    }
  }
}
