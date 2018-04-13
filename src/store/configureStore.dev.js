import { createStore, applyMiddleware } from 'redux'
// import Immutable from 'immutable'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers'

const middleware = routerMiddleware(browserHistory)
// const logger = createLogger({
//   stateTransformer: (state) => {
//     var newState = {};
//     for (var i of Object.keys(state)) {
//       if (Immutable.Iterable.isIterable(state[i])) {
//         newState[i] = state[i].toJS();
//       } else {
//         newState[i] = state[i];
//       }
//     };
//     return newState;
//   }
// })

export default function configureStore(initialState) {
  const store = createStore(
    {
      ...rootReducer,
      router: routerReducer,
    },
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk, middleware)
      // applyMiddleware(thunk, middleware, logger)
    ),
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
