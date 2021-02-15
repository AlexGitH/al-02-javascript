function boundedEnum(context){
  var getType = x=>Object.prototype.toString.call(x);
  Array.prototype.forEach.call( context, (arg,argIdx)=>{
    let argType = getType( arg );
    if ( argType === getType('') || argType === getType( [] ) || arg.length >0 ) {
  	  Array.prototype.forEach.call( arg, (v,k)=>{
      	console.log( `${argIdx}-- ${k}: ${v}`);
      });
    }
    if ( argType === getType( {} ) ) {
      [].forEach.call( Object.entries( arg ), ([k,v])=> {
        console.log( `${argIdx}-- ${k}: ${v}`);
      });
        
    }
    if ( arg instanceof Set ) {
      Set.prototype.forEach.call( arg, (v,i)=> {
        console.log( `${argIdx}-- ${i}: ${v}`);
      });
    }
  });
};

/// UNCHANGABLE CODE

function myfunc() {
  boundedEnum(arguments);
}

myfunc("hello",{a:3,b:4}, [1,2,3,4,5], new Set([1,2,3,4]))
