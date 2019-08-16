import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import meatball from 'meatball'
import { reducer } from './reducer'
import { epics } from './epics'

// Chrome Dev Tools Redux Debugger
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: {
        // support daggy
        replacer: (key, value) =>
          value && value['@@tag']
            ? Object.keys(value)[0] === 'is'
              ? value.toString()
              : value
            : value
      }
    })
    : compose

const enhancer = composeEnhancers(applyMiddleware(meatball(epics)))

export const store = createStore(combineReducers(reducer), enhancer)
