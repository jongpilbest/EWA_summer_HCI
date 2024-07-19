


import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import embed from './Features/counter/counterSlice'


const persistConfig={
  key:'root',
  version:1,
  storage
}

const reducer= combineReducers({
embed:embed

})
const persistReducers= persistReducer(persistConfig,reducer)

export const ReduxStore = configureStore({
    reducer: persistReducers,
      
          middleware: getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false})
          
})

export default ReduxStore