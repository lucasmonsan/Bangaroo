import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './contexts/GlobalContext.tsx'
import AppRouter from './AppRouter.tsx'
import './main.css'
import { Loading } from './components/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <AppRouter />
        <Loading />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
)
