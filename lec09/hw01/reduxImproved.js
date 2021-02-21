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

function onAddItem() {
  store.dispatch(actionAdd( itemKey.value, parseFloat(itemVal.value) ) )
  itemKey.value = null;
  itemVal.value = null;
}

let unsubscribe = store.subscribe( ()=>{
  const len = Object.entries(store.getState()).length;
  cart.innerHTML = !len ? '' : `<h2>${len}</h2>`;
  tableContainer.innerHTML = `<table>${Object.entries(store.getState())
                                                        .map(([id, count]) => `<tr><th>${id}</th><td>${count}</td><td><button onclick="onInc('${id}')" type="button">+</button><button onclick="onDec('${id}')" type="button">-</button><button onclick="onDel('${id}')" type="button">X</button></td></tr>`)
                                                        .join('\n')}</table>`;

})

const actionAdd = (id, amount=1) => ({type: 'ADD', id, amount})
const actionDec = (id, amount=1) => ({type: 'DEC', id, amount})
const actionDel = (id) => ({type: 'DEL', id})

function onInc(id) {
  store.dispatch( actionAdd(id, 1) );
}
function onDec(id) {
  store.dispatch( actionDec(id, 1) );
}
function onDel(id) {
  store.dispatch( actionDel(id) );
}

//setTimeout(() => unsubscribe(), 10000)
