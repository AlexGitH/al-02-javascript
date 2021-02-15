var myArray = [ 1,3,7,9 ];
// var myArray = [ 1,3 ];
var arrFind = myArray.find;
myArray.find = function() {
  if( this.length < 3 ) {
    throw new Error( 'Мало елементів' );
  }
  console.log( 'С элементами все ок' );
}

myArray.find();
myArray.find.call( [] );
myArray.find = arrFind;