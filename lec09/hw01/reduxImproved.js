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

  return state
}

let store = createStore(cartReducer)

const actionAdd = (id, amount=1) => ({type: 'ADD', id, amount})
function onAddItem() {
  store.dispatch(actionAdd( itemKey.value, parseFloat(itemVal.value) ) )
  itemKey.value = null;
  itemVal.value = null;
}

let unsubscribe = store.subscribe( ()=>{
  cart.innerHTML = `<h2>${Object.entries(store.getState()).length}</h2>`;
  tableContainer.innerHTML = `<table>${Object.entries(store.getState())
                                                        .map(([id, count]) => `<tr><th>${id}</th><td>${count}</td></tr>`)
                                                        .join('\n')}</table>`;

})
// const actionInc = id => ({type: 'ADD', id})
// const actionAdd = (id, amount=1) => ({type: 'ADD', id, amount})

// let store = createStore(cartReducer)
// let unsubscribe = store.subscribe(() => console.log(store.getState()))
// document.body.onclick = () => store.dispatch(actionAdd(prompt('товар'), +prompt('количество')))
// store.subscribe(() => document.body.innerHTML = `<table>${Object.entries(store.getState())
//                                                         .map(([id, count]) => `<tr><th>${id}</th><td>${count}</td></tr>`)
//                                                         .join('\n')}</table><h1>${Object.entries(store.getState()).length}</h1>`)
//setTimeout(() => unsubscribe(), 10000)
