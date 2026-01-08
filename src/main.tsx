import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LoadingProvider } from './context/loading/LoadingProvider'
import { AuthProvider } from './context/auth/AuthProvider.tsx'
import { AlertProvider } from './context/alert/AlertProvider.tsx'
import { I18nProvider } from './context/i18n/I18nProvider'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <I18nProvider>
        <LoadingProvider>
          <AuthProvider>
            <AlertProvider>
              <Toaster richColors />
              <App />
            </AlertProvider>
          </AuthProvider>
        </LoadingProvider>
      </I18nProvider>
    </BrowserRouter>
)
