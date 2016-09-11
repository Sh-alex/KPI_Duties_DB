import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { rootReducer } from '../reducers'
import { redirect } from '../middlewares/redirect'

export default function configureStore() {
  const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(thunkMiddleware, createLogger(), redirect),
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