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

function randBetween( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

const UNITS = {
  SPOON : "ст. лож.",
  PIECE : "шт.",
  SLICE : "дол.",
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
  "сахар"                 : UNITS.GRAM, // any positive integer
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

  function validateParameter( type, value, vName ) {
    let errors = [];
    const capName = vName[0].toUpperCase() + vName.slice(1);
    const name = INGREDIENTS[type];
    if ( !isValidNum( value ) ) {
      errors.push( `Количество ${vName} должно быть числом в ${INGR_UNIT_MAP[name]}` );
    }
    if ( value > LIMITS[type].max ){
      errors.push( `${capName} слишком много!` );
    }
    if ( value < LIMITS[type].min ) {
      errors.push( `${capName} слишком мало!` );
    }
    return errors;
  }
  
  // CHECK PARAMETERS

  let errors = [];

  errors.push( ...validateParameter( 'MEAT', meat, "мяса" ) );
  errors.push( ...validateParameter( 'WATER', water, "воды" ) );
  errors.push( ...validateParameter( 'PICKLES', pickles, "маринованных огурчиков" ) );
  errors.push( ...validateParameter( 'OLIVES', olives, "маслин" ) );
  errors.push( ...validateParameter( 'ONION', onion, "луковиц" ) );
  errors.push( ...validateParameter( 'GARLIC', garlic, "чеснока" ) );
  errors.push( ...validateParameter( 'TOMATO_PASTE', tomatoPaste, "томатной пасты" ) );
  errors.push( ...validateParameter( 'VEGETABLE_OIL', vegetableOil, "растительного масла" ) );


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
  // console.log( '+++ errors',errors)
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

  let washedMeat = wash( myMeat );

  let myWater = createIngredient( 'WATER', water );
  let mySmokedMeat = createIngredient( 'SMOKED_MEAT', smokedMeat );
  let pan = createPan();
  pan.put( washedMeat, myWater, mySmokedMeat );

  let minutesToBoilMeat = 120; //prompt;
  let powerToBoilMeat = 'low'; //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  // waitBoilStop( pan ); //minutes
  //2. 
  
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

  //3. 

  let myOtherMeat = createIngredient( 'MEAT_PROD', otherMeat );
  let blendedOtherMeat = blend( myOtherMeat );
  pan.put( blendedOtherMeat );

   
  //4. 

  let myPickles = createIngredient( 'PICKLES', pickles );
  let blendedPickles = blend( myPickles );
  let myOlives = createIngredient( 'OLIVES', olives );
  let blendedOlives = blend( myOlives );


  //5.

  pan.put( blendedOlives, blendedPickles );

  //6.
  let myOnion = createIngredient( 'ONION', onion );
  let myGarlic = createIngredient( 'GARLIC', garlic );
  let cleanedOnion = clean( myOnion );
  let cleanedGarlic = clean( myGarlic );
  let blendedOnion = blend( cleanedOnion );
  let blendedGarlic = blend( cleanedGarlic );

  let myTomatoPaste = createIngredient( 'TOMATO_PASTE', tomatoPaste );
  let myVegetableOil = createIngredient( 'VEGETABLE_OIL', vegetableOil );
  let otherPan = createPan();


  otherPan.put( blendedGarlic, blendedOnion, myVegetableOil );
  let minutesToFryGarlicOnion = 3;
  let powerToFryGarlicOnion = 'high';
  otherPan.boil( minutesToFryGarlicOnion, powerToFryGarlicOnion );
  
  // waitBoilStop( otherPan ); //minutes

  otherPan.put( myTomatoPaste );

  //7.

  let mySalt = createIngredient( 'SALT', salt );
  let myPepper = createIngredient( 'PEPPER', pepper );
  let mySugar = createIngredient( 'SUGAR', sugar );
  let myHerbs = createIngredient( 'HERBS', herbs );

  otherPan.put( mySalt, myPepper, mySugar, myHerbs );

  let minutesToMakeSauce = 5;
  let powerToMakeSauce = 'low';
  otherPan.boil( minutesToMakeSauce, powerToMakeSauce );

  // waitBoilStop( otherPan ); //minutes

  // function completeSolyanka( pan, lemon, sourCream ) {
    //8.

    let sauceItems = otherPan.getAll();
    pan.put( ...sauceItems );

    let minutesToCompleteSolyanka = randBetween( 5, 7 ); 
    let powerToCompleteSolyanka = 'low'; 
    pan.boil( minutesToCompleteSolyanka, powerToCompleteSolyanka );
    // return pan;
  // }

  // waitBoilStop( pan ); //minutes

  function completeSolyanka( pan, lemon, sourCream ) {
    //9. 
    let solyanka = createSolyanka();
    solyanka.put( ...pan.getAll() );

    let myLemon = createIngredient( 'LEMON', lemon );
    let mySourCream = createIngredient( 'SOUR_CREAM', sourCream );
    solyanka.put( myLemon, mySourCream );
    return solyanka;
  }

  //SOLYANKA IS READY!!!
  return completeSolyanka( pan, lemon, sourCream );
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
    inspectItems: function() {
      return JSON.stringify( items, null, 2 );
    },
    showContent: function() {
      return items.map( x => `${x.name}:${x.value} ${x.unit}` );
    },
  };
}

function createPan() {
  let items = [];
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

    showContent: function() {
      return items.map( x => `${x.name}:${x.value} ${x.unit}` );
    },

    boil: function( minutes, power ) {
      
      let i = minutes * 1e2;
      while( i-- ) {
        console.log( 'boiling' );
      }
      items.forEach( function( item ) {
        item.attr.isBoiled = true;
        item.attr.boilDetails.push( { [power] : minutes } );
      });
      console.log( `Pan stopped boiling after ${minutes} minutes` );
    }
  }
}
