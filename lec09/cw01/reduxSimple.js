function createStore(reducer){
    let callbacks = []
    let state = reducer(undefined, {});

    return {
        dispatch(action){
            const newState = reducer(state, action)
            if (newState !== state){
                state = newState
                for (const cb of callbacks) cb()
            }
        },
        subscribe(callback){
            callbacks.push(callback)
            return () => callbacks = callbacks.filter(c => c !== callback)
        },
        getState(){
            return state;
        }
    }
}

const countReducer = (state=0, {type}) => {
    if (type === 'INC') return state +1
    if (type === 'DEC') return state -1

    return state
}

let store = createStore(countReducer)
let unsubscribe = store.subscribe(() => console.log(store.getState()))
const actionInc = () => ({type: 'INC'})
const actionDec = () => ({type: 'DEC'})
document.body.onclick = () => store.dispatch(actionInc())
store.subscribe(() => document.body.innerHTML = `<h1>${store.getState()}</h1>`)
//setTimeout(() => unsubscribe(), 10000)