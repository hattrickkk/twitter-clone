import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from '@/components/app'
import { persistor, store } from '@/store'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <App />
                </Provider>
            </PersistGate>
        </BrowserRouter>
    </StrictMode>
)
