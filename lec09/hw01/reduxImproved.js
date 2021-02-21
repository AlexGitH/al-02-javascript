function createStore(reducer) {
  let callbacks = []
  let state = reducer(undefined, {});
  return {
    dispatch(action) {
      const newState = reducer(state, action)
      if(newState !== state) {
        state = newState
        for(const cb of callbacks) cb()
      }
    },
    subscribe(callback) {
      callbacks.push(callback)
      return () => callbacks = callbacks.filter(c => c !== callback)
    },
    getState() {
      return state;
    }
  }
}

const cartReducer = (state={}, {type, id, amount=1}) => {
  if (type === 'ADD') return {...state, [id]: amount + (state[id] || 0)}
  if (type === 'DEC') return {...state, [id]: (state[id] || 0) - amount}
  if (type === 'DEL') {let result = {...state}; delete result[id]; return result;}

  return state
}

let store = createStore(cartReducer)

// NOTE: unsubscribe is not used for now
let unsubscribe = store.subscribe( ()=>{
  const len = Object.entries(store.getState()).length;
  cart.innerHTML = !len ? '' : `<h2>${len}</h2>`;
  tableContainer.innerHTML = `<table>${Object.entries(store.getState())
                                                        .map(([id, count]) => `<tr><th>${id}</th><td>${count}</td><td><button onclick="onInc('${id}')" type="button">+</button><button ${count<2&&"disabled"} onclick="onDec('${id}')" type="button">-</button><button onclick="onDel('${id}')" type="button"><b>X</b></button></td></tr>`)
                                                        .join('\n')}</table>`;
})

const actionAdd = (id, amount=1) => ({type: 'ADD', id, amount});
const actionDec = (id, amount=1) => ({type: 'DEC', id, amount});
const actionDel = (id) => ({type: 'DEL', id});

function onInc(id) { store.dispatch( actionAdd(id, 1) ); }
function onDec(id) { store.dispatch( actionDec(id, 1) ); }
function onDel(id) { store.dispatch( actionDel(id) ); }

function validateInput( name, number ) {
  const errors = [];
  if ( name.length <= 0 ) errors.push( 'Item name must not be empty' );
  if ( !/\p{L}+/u.test(name) ) errors.push( 'Item name must have at least 1 letter' );
  if ( isNaN( number ) || number <= 0 ) errors.push( 'Number of items must be a positive integer value greater then 0')
  return errors;
}

function toPositiveInt(str){
  const re = /^\d+$/;
  const num = parseInt( str );
  if ( !re.test(str) || num === NaN || num < 0 ) {
    return NaN;
  }
  return num;
}

function onAddItem() {
  const name = itemKey.value.trim();
  const number = toPositiveInt( itemVal.value );

  const errors = validateInput( name, number );
  if ( errors.length > 0 ) {
    alert( `Errors:\n- ${errors.join('\n- ')}`);
    return ;
  }
  store.dispatch(actionAdd( name, number ) )
  cleanInputs();
}

function onDelItem() {
  const name = itemKey.value.trim();
  const errors = validateInput( name, 1 );
  if ( !store.getState()[name] ) errors.push( `No item with name: ${name}` );
  if ( errors.length > 0 ) {
    alert( `Errors:\n- ${errors.join('\n- ')}`);
    return ;
  }
  store.dispatch(actionDel( name ) );
  if ( confirm(`"${name}" successfully removed from the list!\nDo you want to reset fields?`) ) {
    cleanInputs();
  }
}

function cleanInputs() {
  itemKey.value = null;
  itemVal.value = null;
}


//setTimeout(() => unsubscribe(), 10000)
