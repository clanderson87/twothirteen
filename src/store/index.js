import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)//,
    //autoRehydrate() //uncomment when you have state that needs persistence.
  )
);

//persistStore(store, { storage: AsyncStorage, whitelist: [''] }) //uncomment when you uncomment autoRehydrate. Make sure there is some reducer whitelisted!
//.purge() // this is for clearing state in the development environment
export default store;