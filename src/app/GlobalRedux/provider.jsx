"use client"

import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {ReduxStore} from './stsore'
function EmbedProviders({ children }) {
    let persistor= persistStore(ReduxStore)
    return (
        <Provider store={ReduxStore}>
       <PersistGate persistor={persistor}>

            {children}
            </PersistGate>
        </Provider>
    )
}
export default EmbedProviders