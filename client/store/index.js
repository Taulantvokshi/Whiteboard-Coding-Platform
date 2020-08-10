import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import host from './host'
import stats from './stats'
import clickStore from './clickStore'

const reducer = combineReducers({user, host, stats, clickStore})
const middleware = composeWithDevTools(
  applyMiddleware(createLogger({collapsed: true}), thunkMiddleware)
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
