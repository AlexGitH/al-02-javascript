// RECEPT :https://povar.ru/recipes/sup-solyanka_klassicheskii_recept-54159.html

function wash( ingredient ) {
  CHECK.isObject( ingredient );
  ingredient.attr.isWashed = true;
  return ingredient;
}

function clean( ingredient ) {
  CHECK.isObject( ingredient );
  ingredient.attr.isCleaned = true;
  return ingredient;
}

function cool( ingredient ) {
  CHECK.isObject( ingredient );
  ingredient.attr.isCooled = true;
  return ingredient;
}

function blend( ingredient ) {
  CHECK.isObject( ingredient );
  ingredient.attr.isBlended = true;
  return ingredient;
}

function waitBoilStop( pan ) {
  CHECK.isObject( pan );
  const minutes = pan.getBoilTime();
  do {
    console.log( 'Pan is boiling...');
  } while( pan.getIsBoiling() )
  console.log( `Pan stopped boiling after ${minutes}.` );
}

// function boil( time, power, pan ) {
//   return // boiled ingredients;
// }

// function fry( time, power, pan ) {  // жарить
//   return // fried ingredients;
// }


function randBetween( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

const TIME_MULTIPLIER = 50;

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
  "вода"                  : UNITS.GRAM,
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
  WATER         : "вода",
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
  SUGAR         : "сахар",
  SPICE         : "специи",
  HERBS         : "зелень",
  LEMON         : "лимон",
  SOUR_CREAM    : "сметана", // сметана
  BAY_LEAF      : "лавровый лист"  // лавровый лист
}

// call example;
// makeSolyanka( 450, 150, 2000, 150, 3, 5, 1, 3, 1, 2, 10, 10, 0, 1, 2 );

// CHECKS
const CHECK =  {
  
  isObject: function( item ) {
    const toStr = Object.prototype.toString;
    if ( !toStr.call( item ) === toStr.call( {} ) ) {
      throw new Error( 'Value must be an object' );
    }
  }
};


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


  // OPTIONAL PARAMETERS // TODO: rewrite with argument default value using ES6
  let salt = salt_ || 0;
  let pepper = pepper_ || 0;
  let herbs = herbs_ || 0;
  let sugar = sugar_ || 0;
  let lemon = lemon_ || 0;
  let sourCream = sourCream_ || 0;

  //1.
  let myMeat = createIngredient( 'MEAT', meat );

  // let meat = getMeatWeight();//prompt
  let washedMeat = wash( myMeat );

  let myWater = createIngredient( 'WATER', water );
  let mySmokedMeat = createIngredient( 'SMOKED_MEAT', smokedMeat );
  // let water = getWater(); //prompt  2 liters == 2000grm
  // let smokedMeat = getSmokedMeat(); //prompt,
  // let pan = new Pan(); // constructor; 
  let pan = createPan(); // constructor; 
  // pan.put( washedMeat, water, smokedMeat );
  pan.put( washedMeat, myWater, mySmokedMeat );

  // let minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  // let powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  // TEST
  let minutesToBoilMeat = 120; //prompt;
  let powerToBoilMeat = 'low'; //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  waitBoilStop( pan ); //minutes
  //2. 
  
  // pan.stopBoil(); //?? 

  function extractSingleItem( pan, itemName ) {
    let extractedItems = pan.get( itemName );
    if( extractedItems.length !== 1 ) {
      throw new Error( 'Expected to get only one item from Solyanka');
    }
    return extractedItems[0];
  }

  function extractMeat( pan ) {
    return extractSingleItem( pan, INGREDIENTS.MEAT );
  }
  function extractSmokedMeat( pan ) {
    return extractSingleItem( pan, INGREDIENTS.SMOKED_MEAT );
  }

  function extractBoulion( pan ) {
    return extractSingleItem( pan, INGREDIENTS.WATER );
  }

  function refineBoulion( boulion ) {
    CHECK.isObject( boulion );
    if ( INGREDIENTS[boulion.type] !== INGREDIENTS.WATER ) {
      throw new Error( 'Expected water ingredient' );
    }
    boulion.attr.isRefinedBoulion = true;
    return boulion;
  }

  let hotMeat = extractMeat( pan );
  let hotSmokedMeat = extractSmokedMeat( pan );
  let cooledMeat = cool( hotMeat ); // time 
  let cooledSmokedMeat = cool( hotSmokedMeat ); // time 
  let boulion = extractBoulion( pan );
  let refinedBouillon = refineBoulion( boulion );
  let blendedMeat = blend( cooledMeat );
  let blendedSmokedMeat = blend( cooledSmokedMeat );
  pan.put( blendedMeat, blendedSmokedMeat, refinedBouillon );

  // minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  // powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  // minutesToBoilMeat = ; //prompt;
  // powerToBoilMeat = ; //prompt;
  // pan.boil( minutesToBoilMeat, powerToBoilMeat );

  // return pan;

  //3. 

  // let otherMeat = getOtherMeatWeight();//prompt
  let myOtherMeat = createIngredient( 'MEAT_PROD', otherMeat );
  let blendedOtherMeat = blend( myOtherMeat );
  pan.put( blendedOtherMeat );

   
  //4. 

  // let pickles = getPickles(); //prompt
  let myPickles = createIngredient( 'PICKLES', pickles );
  let blendedPickles = blend( myPickles );
  // let olives = getOlives(); //prompt
  let myOlives = createIngredient( 'OLIVES', olives );
  let blendedOlives = blend( myOlives );


  //5.

  pan.put( blendedOlives, blendedPickles );

  //6.
  // let onion = getOnion();  //prompt
  // let garlic = getGarlic(); //prompt
  let myOnion = createIngredient( 'ONION', onion );
  let myGarlic = createIngredient( 'GARLIC', garlic );
  let cleanedOnion = clean( myOnion );
  let cleanedGarlic = clean( myGarlic );
  let blendedOnion = blend( cleanedOnion );
  let blendedGarlic = blend( cleanedGarlic );

  let myTomatoPaste = createIngredient( 'TOMATO_PASTE', tomatoPaste );
  let myVegetableOil = createIngredient( 'VEGETABLE_OIL', vegetableOil );
  // let tomatoPaste = getTomatoPaster(); //prompt;
  // let vegetableOil = getVegetableOil(); //prompt;

  // let otherPan = new Pan();
  let otherPan = createPan();


  otherPan.put( blendedGarlic, blendedOnion, myVegetableOil );
  let minutesToFryGarlicOnion = 3;
  let powerToFryGarlicOnion = 'high';
  otherPan.boil( minutesToFryGarlicOnion, powerToFryGarlicOnion );
  
  waitBoilStop( otherPan ); //minutes

  otherPan.put( myTomatoPaste );

  //7.

  // let salt = getSalt();//prompt
  // let pepper = getPepper(); //prompt
  // let sugar = getSugar(); // prompt; OPTIONAL

  let minutesToMakeSauce = 5;
  let powerToMakeSauce = 'low';


  let mySalt = createIngredient( 'SALT', salt );
  let myPepper = createIngredient( 'PEPPER', pepper );
  let mySugar = createIngredient( 'SUGAR', pepper );
  let myHerbs = createIngredient( 'HERBS', herbs );

  otherPan.put( mySalt, myPepper, mySugar, myHerbs );
  // otherPan.put( salt, pepper, sugar, herbs );
  otherPan.boil( minutesToMakeSauce, powerToMakeSauce );

  waitBoilStop( otherPan ); //minutes
  //8.

  // let sauce = getSauceFromPan( otherPan ); 
  let sauceItems = otherPan.getAll();
  pan.put( ...sauceItems );

  let minutesToCompleteSolyanka = randBetween( 5, 7 ); 
  let powerToCompleteSolyanka = 'low'; 
  pan.boil( minutesToCompleteSolyanka, powerToCompleteSolyanka );

  //9. 

  // pan.stopBoil();

  // pan.close();
  waitBoilStop( pan ); //minutes

  let solyanka = createSolyanka();
  solyanka.put( ...pan.getAll() );

  let myLemon = createIngredient( 'LEMON', lemon );
  let mySourCream = createIngredient( 'SOUR_CREAM', sourCream );
  solyanka.put( myLemon, mySourCream );

  //SOLYANKA IS READY!!!
  return solyanka;
}


// OBJECT CREATORS

function createIngredient( type_, value ) {
  // checks
  if ( !isValidStr( type_ ) ) {
    throw new Error( 'Expect string as 1st parameter')
  }
  if ( isNaN( value ) ) {
    throw new Error( 'Expect number as 2nd parameter' );
  }
  let type = type_.trim().toUpperCase(); 
  let name = INGREDIENTS[type];
  if ( name == null ) {
    throw new Error( `No such ingredient type: ${type}` );
  }
  // result
  return {
    name : name,
    type : type,  //to check limits;
    unit : INGR_UNIT_MAP[name],
    attr : {
      boilDetails: []
    },
    value: value
  }
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
    },
    showContent: function() {
      return items.map( x => `${x.name}:${x.value} ${x.unit}` );
    },
  };
}

function createPan() {
  let items = [];
  let isBoiling = false;
  let boilTime = 0;
  // let isClosed = false;
  let boilingId = null;

  const eachItem = function( fn, scope ) {
    items.forEach( fn.bind( scope ) )
  }

  return {
    getIsBoiling: function() {
      return isBoiling;
    },
    getBoilTime: function() {
      return boilTime;
    },
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

    showContent: function() {
      return items.map( x => `${x.name}:${x.value} ${x.unit}` );
    },

    boil: function( minutes, power ) {
      if ( isBoiling === true ) {
        // console.log( 'Pan is allready boiling' );
        return;
      }
      boilTime = minutes;
      boilingId = setTimeout( () => {
        boilingId = null;
        boilTime = 0;
        isBoiling = false;
        eachItem( function( item, idx_ ) {
          item.attr.isBoiled = true;
          item.attr.boilDetails.push( { [power] : minutes } );
        });
        // console.log( `Pan stopped boiling after ${minutes} minutes` );
      // }, minutes * TIME_MULTIPLIER );
      }, 5 );
    }
    
    // NOTE: this method is not needed;
    // stopBoil : function() {
    //   clearTimeout( boilingId );
    //   boilingId = null;
    //   isBoiling = false;
    // },

    // close : function() {
    //   isClosed = true;
    //   console.log( 'Pan is closed' );
    // },

    // open : function() {
    //   isClosed = false;
    //   console.log( 'Pan is opened' );
    // }
  }
}
