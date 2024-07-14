"use client"

import { Provider } from 'react-redux';

import {ReduxStore} from './stsore'
function EmbedProviders({ children }) {
    return (
        <Provider store={ReduxStore}>
            {children}
        </Provider>
    )
}
export default EmbedProviders