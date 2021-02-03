// RECEPT :https://povar.ru/recipes/sup-solyanka_klassicheskii_recept-54159.html

// DEBUGGING
function inflateTestValues() {
  const vals = [ 450, 150, 2000, 150, 3, 5, 1, 3, 1, 2, 10, 10, 0, 1, 2 ];
  const test = [ meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt, pepper, herbs, sugar, lemon, sourCream ]
  test.forEach( (input, index)=>{
    let val = vals[index];
    if ( val ) {
      input.value = val;
    }
    else {
      input.value = '';
    }

  });

}

function cookSolyanka() {
  const inputs = [ meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt, pepper, herbs, sugar, lemon, sourCream ]
  const args = inputs.map( el=>{
    let val = el.value.trim();
    let result = null;
    if ( val !== '' ) {
      result = parseInt(val);
    }
    return result;
  });
  makeSolyanka( ...args );
}
// usage example;
// makeSolyanka( 450, 150, 2000, 150, 3, 5, 1, 3, 1, 2, 10, 10, 0, 1, 2 );

function getLoggerEl() {
  return document.querySelectorAll( '.logger' )[0];
}

function pushMessage( text ) {
  const elem = getLoggerEl();
  const node = document.createTextNode( text );
  const p = document.createElement( 'p' );
  p.appendChild( node );
  elem.appendChild( p );
}

function cleanMessages() {
  const elem = getLoggerEl();
  while( elem.hasChildNodes() ){
    elem.removeChild(elem.firstChild);
  }
}

/**
 * ENTRY POINT
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

  // CHECK PARAMETERS
  const errors = validate( meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt_, pepper_, herbs_, sugar_, lemon_, sourCream_ )
  if ( errors.length > 0 ) {
    // console.warn( errors.join( '\n' )); //print to document???
    alert( errors.join( '\n' ) );
    return ;
  }

  // OPTIONAL PARAMETERS // TODO: rewrite with argument default value using ES6
  let salt = salt_ || 0;
  let pepper = pepper_ || 0;
  let herbs = herbs_ || 0;
  let sugar = sugar_ || 0;
  let lemon = lemon_ || 0;
  let sourCream = sourCream_ || 0;

  // INITIALIZE MANDATORY INGREDIENTS
  let myMeat = createIngredient( 'MEAT', meat );
  let mySmokedMeat = createIngredient( 'SMOKED_MEAT', smokedMeat );
  let myWater = createIngredient( 'WATER', water );
  let myMeatProd = createIngredient( 'MEAT_PROD', otherMeat );
  let myPickles = createIngredient( 'PICKLES', pickles );
  let myOlives = createIngredient( 'OLIVES', olives );
  let myOnion = createIngredient( 'ONION', onion );
  let myGarlic = createIngredient( 'GARLIC', garlic );
  let myTomatoPaste = createIngredient( 'TOMATO_PASTE', tomatoPaste );
  let myVegetableOil = createIngredient( 'VEGETABLE_OIL', vegetableOil );

  cleanMessages();
  // START COOKING
  Promise.resolve()
  .then( ()=>{
    pushMessage( 'Берем кастрюлю...' );
    let pan = createPan( 'кастрюля' );
    console.log( '0', pan )
    return next( pan );
  })
  .then( ( pan )=>{
    console.log( '1', pan )
    pushMessage( 'Моем мясо и складываем с копченостями в кастрюлю с водой. Варим на медленном огне...' );
    pan = washAndPutIntoPan( pan, myMeat, mySmokedMeat, myWater );
    pan.startBoil();
    return next( pan, 2000 );
  })
  .then(( pan )=>{
    console.log( '1.1', pan )
    let minutesToBoilMeat = 120;
    let powerToBoilMeat = POWER_GRADE.LOW;
    pan.stopBoil( minutesToBoilMeat, powerToBoilMeat );
    return next( pan );
  })
  .then( ( pan )=>{
    console.log( '2', pan )
    pushMessage( 'Вылавливаем все мясо и измельчаем. Отцеживаем бульон и заливаем в кастрюлю с измельченным мясом...' );
    pan = refineBouillonAndBlendBoiledMeat( pan );
    return next( pan );
  })
  .then( ( pan )=>{
    console.log( '3', pan )
    pushMessage( 'Измельчаем мясные деликатесы и складываем в кастрюлю...' );
    pan = addBlendedMeatProds( pan, myMeatProd );
    return next( pan );
  })
  .then( ( pan )=>{
    console.log( '4', pan )
    pushMessage( 'Измельчаем маслины и маринованные огурчики и складываем в кастрюлю...' );
    pan = addBlendedPicklesAndOlives( pan, myPickles, myOlives );
    return next( pan );
  })
  .then( ( pan )=>{
    console.log( '5', pan )
    pushMessage( 'Ставим кастрюльку на медленный огонь и параллельно приступаем к заправке...' );
    pan.startBoil();
    return next( pan );
  })
  .then( ( pan ) => {
    console.log( '6', pan )
    pushMessage( 'Берем сковороду...' );
    let otherPan = createPan( 'сковорода' );
    return next( { pan, otherPan } );
  })
  .then( ( pans ) => {
    console.log( '7', pans )
    const minutesToMakeSauce = 3;
    pushMessage( 'Чистим лук и чеснок, измельчаем, добавляем растительного масла и обжариваем на большом огне...')
    pans.otherPan = makeSauce( pans.otherPan, minutesToMakeSauce, myOnion, myGarlic, myTomatoPaste, myVegetableOil );
    return next({pans,minutesToMakeSauce});
  })
  .then( ( config ) => {
    console.log( '8', config )
    pushMessage( 'Добавляем томатную пасту. Также добавляем соли, сахара, перца и зелени по вкусу' );
    const tasteItems = createSauceTasteItems( salt, pepper, sugar, herbs );
    const minutesToCorrectSauceTaste = 5;
    config.pans.otherPan = correctSauceTaste( config.pans.otherPan, minutesToCorrectSauceTaste, tasteItems );
    return next({...config, minutesToCorrectSauceTaste});
  })
  .then( ( config ) =>{
    console.log( '9', config )
    let { pans, minutesToMakeSauce, minutesToCorrectSauceTaste } = config;
    const elapsedMinutes = minutesToMakeSauce + minutesToCorrectSauceTaste;
    pans.pan.stopBoil( elapsedMinutes, POWER_GRADE.LOW );
    return next( pans );
  })
  .then( ( pans ) =>{
    console.log( '10', pans )
    pushMessage( 'Пересыпаем заправку со сковородки в кастрюлю и варим еще 5-7 минут' );
    let sauceItems = pans.otherPan.getAll();
    return next( mixSauceWithSolyanka( pans.pan, sauceItems ) );
  })
  .then( ( pan ) =>{
    //SOLYANKA IS ALMOST READY!!!
    console.log( '11', pan );
    pushMessage( 'Оставляем настояться 30 минут...');
    let result = completeSolyanka( pan );
    return next( result,1000 );
  })
  // NOTE ADD CALLBACK FOR FURTHER ACTIONS WITH SOLYANKA
  .then( ( solyanka ) => {
    pushMessage( 'Добавляем лимон и сметану по вкусу...' );
    const finalItems = createFinalItems( lemon, sourCream );
    solyanka.put( ...finalItems );
    pushMessage( 'СОЛЯНКА ГОТОВА!');
    window.solyanka = solyanka; 
    console.log( 'solyanka', solyanka );
  })
  .catch(( error )=>{
    throw new Error( error );
  });
}

const POWER_GRADE = {
  LOW : 'low',
  MED : 'medium',
  HIG : 'high'
};

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
  PICKLES : { min: 2, max: 4 }, //огурцы
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
  "соль"                  : UNITS.GRAM, // any positive integer
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

const TYPES = {
  STRING : getType( '' ),
  NUMBER : getType( 0 ),
  ARRAY  : getType( [] ),
  OBJECT : getType( {} )
};

// CHECKS
const Check = (function( typeOf, types ) {
  const createCheck = function( expectedType, errorText ) {
    return function( item ) {
      if ( !typeOf( item ) === expectedType ) {
        throw new Error( errorText );
      }
    }
  };

  return {
    isNumber: createCheck( types.STRING, 'Value must be a number' ),
    isString: createCheck( types.STRING, 'Value must be a string' ),
    isArray : createCheck( types.ARRAY, 'Value must be an array' ),
    isObject: createCheck( types.OBJECT, 'Value must be an object' )
  };
})( getType, TYPES );


// HELPERS 
function getType( item ) {
  return Object.prototype.toString.call( item );
}

function isValidStr( value ) {
  return getType( value ) === TYPES.STRING && value.trim() !== '';
}

function isValidNum( value ) {
  return getType( value ) === TYPES.NUMBER;
}

function capitalize( str ) {
  Check.isString( str );
  return str[0].toUpperCase() + str.slice(1);
}

function randBetween( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

function next( result, delay = 500 ){
  return new Promise( resolve => {
    setTimeout( ()=>{
      resolve( result );
    }, delay );
  });
}


// EXTERNAL PROCESSES
function wash( ingredient ) {
  Check.isObject( ingredient );
  ingredient.attr.isWashed = true;
  return ingredient;
}

function clean( ingredient ) {
  Check.isObject( ingredient );
  ingredient.attr.isCleaned = true;
  return ingredient;
}

function blend( ingredient ) {
  Check.isObject( ingredient );
  ingredient.attr.isBlended = true;
  return ingredient;
}


// VALIDATION

function validateParameter( type, value, vName ) {
  let errors = [];
  errors.push( ...validateQuantity( type, value, vName ) );
  errors.push( ...validateMinLimit( type, value, vName ) );
  errors.push( ...validateMaxLimit( type, value, vName ) );
  return errors;
}

function validateOptionalParam( type, value, vName ) {
  let errors = [];
  const name = INGREDIENTS[type];
  if ( value != null && !( isValidNum( value ) && value >= 0 ) ) {
    errors.push( `Количество ${vName} должно быть числом в ${INGR_UNIT_MAP[name]}` );
  }
  return errors;
}

function validateQuantity( type, value, vName ) {
  let errors = [];
  const name = INGREDIENTS[type];
  if ( !isValidNum( value ) ) {
    errors.push( `Количество ${vName} должно быть числом в ${INGR_UNIT_MAP[name]}` );
  }
  return errors;
}

function validateMinLimit( type, value, vName ) {
  let errors = [];
  const capName = capitalize( vName );
  if ( value < LIMITS[type].min ){
    errors.push( `${capName} слишком мало!` );
  }
  return errors;
}

function validateMaxLimit( type, value, vName ) {
  let errors = [];
  const capName = capitalize( vName );
  if ( value > LIMITS[type].max ){
    errors.push( `${capName} слишком много!` );
  }
  return errors;
}

function validate( meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt_, pepper_, herbs_, sugar_, lemon_, sourCream_ ) {
  let errors = [];

  errors.push( ...validateParameter( 'MEAT', meat, "мяса" ) );
  errors.push( ...validateParameter( 'WATER', water, "воды" ) );
  errors.push( ...validateParameter( 'PICKLES', pickles, "маринованных огурчиков" ) );
  errors.push( ...validateParameter( 'OLIVES', olives, "маслин" ) );
  errors.push( ...validateParameter( 'ONION', onion, "луковиц" ) );
  errors.push( ...validateParameter( 'GARLIC', garlic, "чеснока" ) );
  errors.push( ...validateParameter( 'TOMATO_PASTE', tomatoPaste, "томатной пасты" ) );
  errors.push( ...validateParameter( 'VEGETABLE_OIL', vegetableOil, "растительного масла" ) );

  
  errors.push( ...validateQuantity( 'SMOKED_MEAT', smokedMeat, "копченого мяса" ) );
  errors.push( ...validateQuantity( 'OTHER_MEAT', otherMeat, "мясных деликатесов" ) );
  let meatProduct = smokedMeat + otherMeat;

  errors.push( ...validateMaxLimit( 'MEAT_PROD', meatProduct, "мясных изделий" ) );
  errors.push( ...validateMinLimit( 'MEAT_PROD', meatProduct, "мясных изделий" ) );

  errors.push( ...validateOptionalParam( 'SALT', salt_, 'соли' ) );
  errors.push( ...validateOptionalParam( 'PEPPER', pepper_, 'перца' ) );
  errors.push( ...validateOptionalParam( 'HERBS', herbs_, 'зелени' ) );
  errors.push( ...validateOptionalParam( 'SUGAR', sugar_, 'сахара' ) );
  errors.push( ...validateOptionalParam( 'LEMON', lemon_, 'лимона' ) );
  errors.push( ...validateOptionalParam( 'SOUR_CREAM', sourCream_, 'сметаны' ) );

  return errors;
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
      fryDetails: [],
      boilDetails: []
    },
    value: value
  };
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

function createPan( panName ) {
  if ( !isValidStr( panName ) ) {
    throw new Error( 'Pan must have a name.');
  }

  let items = [];

  return {
    getName: function() {
      return panName;
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

    startBoil: function() {
      pushMessage( `${panName} варит...` );
    },

    stopBoil: function( minutes, power ) {
      items.forEach( function( item ) {
        item.attr.isBoiled = true;
        item.attr.boilDetails.push( { [power] : minutes } );
      });
      pushMessage( `${panName} перестала варить спустя ${minutes} минут` );
    },

    fry: function( minutes, power ) {
      pushMessage( `${panName} жарит...` );
      items.forEach( function( item ) {
        item.attr.isFried = true;
        item.attr.fryDetails.push( { [power] : minutes } );
      });
      pushMessage( `${panName} перестала жарить спустя ${minutes} минут` );
    },

    boil: function( minutes, power ) {
      this.startBoil();
      this.stopBoil( minutes, power );
    }
  };
}

// HANDLERS

function allowInteger(event){
  const isNumber = event.keyCode > 47 && event.keyCode < 58; 
  if ( !isNumber ) {
    event.returnValue = false;
    event.preventDefault();
  }
}

function pasteInteger(event) {
  const reInteger = /^\d+$/;
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  if( !reInteger.test(paste) ) {
    event.returnValue = false;
    event.preventDefault();
  }
}


// IMPLEMENTATION ROUTINES
// mutable

function washAndPutIntoPan( pan, meat, smokedMeat, water ) {
  Check.isObject( pan );
  Check.isObject( meat );
  Check.isObject( smokedMeat );
  Check.isObject( water );

  let washedMeat = wash( meat );
  pan.put( washedMeat, water, smokedMeat );
  return pan;
}

function extractSingleItem( pan, itemName ) {
  Check.isObject( pan );
  Check.isString( itemName );

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

function extractBouillon( pan ) {
  return extractSingleItem( pan, INGREDIENTS.WATER );
}

function refineBouillon( bouillon ) {
  Check.isObject( bouillon );
  if ( INGREDIENTS[bouillon.type] !== INGREDIENTS.WATER ) {
    throw new Error( 'Expected water ingredient' );
  }
  bouillon.attr.isRefinedBouillon = true;
  return bouillon;
}

function refineBouillonAndBlendBoiledMeat( pan ) {
  Check.isObject( pan );
  let boiledMeat = extractMeat( pan );
  let boiledSmokedMeat = extractSmokedMeat( pan );
  let bouillon = extractBouillon( pan );
  let refinedBouillon = refineBouillon( bouillon );
  let blendedMeat = blend( boiledMeat );
  let blendedSmokedMeat = blend( boiledSmokedMeat );
  pan.put( blendedMeat, blendedSmokedMeat, refinedBouillon );
  return pan;
}

function addBlendedMeatProds( pan, meatProduct ) {
  Check.isObject( pan );
  Check.isObject( meatProduct );
  let blendedOtherMeat = blend( meatProduct );
  pan.put( blendedOtherMeat );
  return pan;
}

function addBlendedPicklesAndOlives( pan, pickles, olives ) {
  Check.isObject( pan );
  Check.isObject( pickles );
  Check.isObject( olives );
  let blendedPickles = blend( pickles );
  let blendedOlives = blend( olives );

  pan.put( blendedOlives, blendedPickles );
  return pan;
}

function makeSauce( pan, minutesToFryGarlicOnion, onion, garlic, tomatoPaste, vegetableOil) {
  Check.isObject( pan );
  Check.isNumber( minutesToFryGarlicOnion );
  Check.isObject( onion );
  Check.isObject( garlic );
  Check.isObject( tomatoPaste );
  Check.isObject( vegetableOil );
  let cleanedOnion = clean( onion );
  let cleanedGarlic = clean( garlic );
  let blendedOnion = blend( cleanedOnion );
  let blendedGarlic = blend( cleanedGarlic );

  pan.put( blendedGarlic, blendedOnion, vegetableOil );
  const powerToFryGarlicOnion = POWER_GRADE.HIG;
  pan.fry( minutesToFryGarlicOnion, powerToFryGarlicOnion );

  pan.put( tomatoPaste );
  return pan;
}

function correctSauceTaste( pan, minutesToMakeSauce, tasteItems ) {
  Check.isObject( pan );
  Check.isNumber( minutesToMakeSauce );
  Check.isArray( tasteItems );
  pan.put( ...tasteItems );
  let powerToMakeSauce = POWER_GRADE.LOW;
  pan.fry( minutesToMakeSauce, powerToMakeSauce );
  return pan;
}

function createSauceTasteItems( salt, pepper, sugar, herbs ) {
  Check.isNumber( salt );
  Check.isNumber( pepper );
  Check.isNumber( sugar );
  Check.isNumber( herbs );
  let items = [];
  if( salt > 0 ) {
    items.push( createIngredient( 'SALT', salt ) ); 
  }
  if( pepper > 0 ) {
    items.push( createIngredient( 'PEPPER', pepper ) ); 
  }
  if( sugar > 0 ) {
    items.push( createIngredient( 'SUGAR', sugar ) ); 
  }
  if( herbs > 0 ) {
    items.push( createIngredient( 'HERBS', herbs ) ); 
  }
  return items;
}

function mixSauceWithSolyanka( pan, items ) {
  Check.isObject( pan );
  Check.isArray( items );

  let minutesToCompleteSolyanka = randBetween( 5, 7 ); 
  let powerToCompleteSolyanka = POWER_GRADE.LOW; 
  pan.put( ...items );
  pan.boil( minutesToCompleteSolyanka, powerToCompleteSolyanka );
  return pan;
}

function createFinalItems( lemon, sourCream ) {
  Check.isNumber( lemon );
  Check.isNumber( sourCream );
  let items = [];
  if( lemon > 0 ) {
    items.push( createIngredient( 'LEMON', lemon ) ); 
  }
  if ( sourCream > 0 ) {
    items.push( createIngredient( 'SOUR_CREAM', sourCream ) );
  }
  return items;
}

function completeSolyanka( pan ) {
  Check.isObject( pan );
  let solyanka = createSolyanka();
  solyanka.put( ...pan.getAll() );
  return solyanka;
}
