


import { configureStore } from '@reduxjs/toolkit';

import embed from './Features/counter/counterSlice'
export const ReduxStore = configureStore({
    reducer: {
        embed:embed},
      
          middleware: getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false})
          
})

export default ReduxStore