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


/**
 * Returns Solyanka;
 * @param {number} meat - in grams
 * @param {number} smokedMeat - in grams
 * @param {number} water - in grams
 * @param {number} otherMeat - in grams
 * @param {number} pickles - in pieces
 * @param {number} olives - in pieces
 * @param {number} onion - in pieces
 * @param {number} garlic - in cloves
 * @param {number} tomatoPaste - in spoons
 * @param {number} vegetableOil - in spoons
 * @param {number} salt - in grams
 * @param {number} pepper - in grams
 * @param {number} sugar - in grams
 * @param {number} lemon - in slices
 * @param {number} sourCream - in spoons
 * @returns {object} solyanka
 */
function makeSolyanka( meat, smokedMeat, water, otherMeat, pickles, olives, onion, garlic, tomatoPaste, vegetableOil, salt, pepper, sugar, lemon, sourCream ) {
  //1.

  let meat = getMeatWeight();//prompt
  let washedMeat = wash( meat );
  let water = getWater(); //prompt  2 liters == 2000grm
  let smokedMeat = getSmokedMeat(); //prompt,
  let pan = new Pan(); // constructor; 
  pan.putIngredientsToPan( washedMeat, water, smokedMeat );

  let minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  let powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  //2. 
  
  pan.stopBoil();
  let hotBoiledMeat = extractMeat( pan );
  let cooledBoiledMeat = coolMeat( hotBoiledMeat ); // time 
  let bouillon = extractBoulion( pan );
  let refinedBouillon = refineBoulion( bouillon );
  let blendedMeat = blend( cooledBoiledMeat );
  pan.putIngredientsToPan( blendedMeat, refinedBouillon );

  minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
  powerToBoilMeat = getPowerToBoilMeat(); //prompt;
  pan.boil( minutesToBoilMeat, powerToBoilMeat );

  //3. 

  let otherMeat = getOtherMeatWeight();//prompt
  let blendedOtherMeat = blend( otherMeat );
  pan.putIngredientsToPan( blendedOtherMeat );

   
  //4. 

  let pickles = getPickles(); //prompt
  let blendedPickles = blend( pickles );
  let olives = getOlives(); //prompt
  let blendedOlives = blend( olives );


  //5.

  pan.putIngredientsToPan( blendedOlives, blendedPickles );

  //6.
  let onion = getOnion();  //prompt
  let garlic = getGarlic(); //prompt
  let cleanedOnion = clean( onion );
  let cleanedGarlic = clean( garlic );
  let blendedOnion = blend( cleanedOnion );
  let blendedGarlic = blend( cleanedGarlic );
  let tomatoPaste = getTomatoPaster(); //prompt;
  let vegetableOil = getVegetableOil(); //prompt;

  let otherPan = new Pan();


  otherPan.putIngredientsToPan( blendedGarlic, blendedOnion, vegetableOil );
  let minutesToFryGarlicOnion = 3;
  let powerToFryGarlicOnion = 'high';
  otherPan.boil( minutesToFryGarlicOnion, powerToFryGarlicOnion );
  otherPan.putIngredientsToPan( tomatoPaste );

  //7.

  let salt = getSalt();//prompt
  let pepper = getPepper(); //prompt
  let sugar = getSugar(); // prompt; OPTIONAL

  let minutesToMakeSauce = 5;
  let powerToMakeSauce = 'low';

  otherPan.putIngredientsToPan( salt, pepper, sugar );
  otherPan.boil( minutesToMakeSauce, powerToMakeSauce );

  //8.

  let sauce = getSauceFromPan( otherPan ); 
  pan.putIngredientsToPan( sauce );

  let minutesToCompleteSolyanka = randBetween( 5, 7 ); 
  let powerToCompleteSolyanka = 'low'; 
  pan.boil( minutesToCompleteSolyanka, powerToCompleteSolyanka );

  //9. 

  pan.stopBoil();
  pan.close();
  wait( 30 );

  let solyanka = pan.extractPortion();
  let lemon = getLemonSlices(); //prompt
  let sourCream = getSourCream(); //prompt 
  solyanka.put( lemon, sourCream );
  //SOLYANKA IS READY!!!
  return solyanka;
}
