import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { YMaps } from '@pbe/react-yandex-maps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <YMaps>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </YMaps>
    </Provider>
  </StrictMode>
)
