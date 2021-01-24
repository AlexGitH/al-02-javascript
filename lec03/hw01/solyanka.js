// RECEPT :https://povar.ru/recipes/sup-solyanka_klassicheskii_recept-54159.html

prepareSolyanka();

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

const MEASURE_POINTS = {
  SPOON : "ст. лож.",
  PIECE : "шт.",
  SLICE : "долька",
  GRAM  : "гр.",
  CLOVE : "зуб."
};

const LIMITS = {
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

const ingredients_values = {
  "курица" : 0,
  "говядина" : 0,
  "свинина" : 0,
  "мясо" : 450, // свинина, говядина, курица

  "ветчина" : 0,
  "колбаса" : 0,
  "копчености" : 0,
  "мясные изделия": 300, // колбаса, ветчина, копчености: 

  "растительное масло" : "2 ст. лож.",
  "чеснок": "2-4 зуб.",
  "луковица" : "1 шт.",
  "томатная паста" : "1 ст. лож.",
  "маринованные огурчики" : "2-4 шт.",
  "маслины": 2 , // any positive integer
  "cоль": 2 , // any positive integer
  "перец": 2 , // any positive integer
  "специи": 2 , // any positive integer
  "зелень": 2 , // any positive integer
  "сметана" : "1 ст. лож.", // any positive integer
  "лимон": "1 долька" , // any positive integer
  "лавровый лист": 1 , // any positive integer
};



function prepareSolyanka() {
   //1. Мясо вымойте, выложите в кастрюлю и залейте водой. 
   //   Туда же отправьте копчености. 
   //   Можно также добавить лавровый лист и овощи для аромата.
   //   Варите бульон на медленном огне пару часов до готовности мяса. 

   let meat = {};

   let meatInfo = prompt( "Выберите мясо для солянки: формат ");

   let meatWithWeight = getMeatWeight();//prompt
   let washedMeat = wash( meatWithWeight );
   let water = getWater(); //prompt
   let smokedMeat = getSmokedMeat(); //prompt,
   let pan = new Pan(); // constructor; 
   pan.putIngredientsToPan( washedMeat, water, smokedMeat );

   let minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
   let powerToBoilMeat = getPowerToBoilMeat(); //prompt;
   pan.boil( minutesToBoilMeat, powerToBoilMeat );

   //2. Когда мясо сварилось, аккуратно достаньте его из бульона,
   //   остудите немного и измельчите.
   //   Бульон процедите и снова отправьте на огонь.
   //   Выложите туда нарезанное мясо.
  
   pan.stopBoil();
   let hotBoiledMeat = extractMeat( pan );
   let cooledBoiledMeat = coolMeat( hotBoiledMeat ); // time 
   let bouillon = extractBoulion( pan );
   let refinedBouillon = refineBoulion( bouillon );
   let blendedMeat = blendMeat( cooledBoiledMeat );
   pan.putIngredientsToPan( washedMeat, water, smokedMeat );

   minutesToBoilMeat = getMinutesToBoilMeat(); //prompt;
   powerToBoilMeat = getPowerToBoilMeat(); //prompt;
   pan.boil( minutesToBoilMeat, powerToBoilMeat );

   //3. Следом отправьте мясные деликатесы.
   //   В данном случае это ветчина и салями. 

   let otherMeat = getOtherMeatWeight();//prompt
   pan.putIngredientsToPan( washedMeat, water, smokedMeat );

   
   //4. Нарежьте огурчики. Маслины можно добавлять перед подачей в тарелку
   //   или сразу отправить в бульон.
   //   Я предпочитаю второй вариант.
   //   Кроме того, я советую добавить горсть каперсов. 

   //5. Выложите все в бульон, доведите до кипения и варите на медленном огне.
   //   Посолите по вкусу. 

   //6. Параллельно очистите и измельчите лук с чесноком.
   //   Выложите на сковороду с растительным маслом и обжарьте.
   //   Добавьте томатную пасту и влейте немного бульона или рассола от огурцов. 

   //7. Посолите, добавьте перец и специи по вкусу.
   //   Также я советую добавить чайную ложку сахара.
   //   Томите соус минут 5, помешивая. 

   //8. Выложите его в бульон,
   //   аккуратно перемешайте и варите солянку еще минут 5-7. 

   //9. Выключите огонь, накройте кастрюлю крышкой и оставьте на полчасика, чтобы солянка настоялась. 
   //   Подавайте к столу горячей, дополнив лимоном и сметаной по желанию. 
   //   Приятного аппетита!
}