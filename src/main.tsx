import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import { ToastProvider } from './context/Toast/ToastContextProvider.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ToastProvider>
    </Provider>
  </StrictMode>
)
