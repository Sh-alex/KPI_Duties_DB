import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { rootReducer } from '../reducers'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(browserHistory) {
  const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory), createLogger()),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').rootReducer;
      store.replaceReducer(nextRootReducer)
    });
  }

  return store
}
