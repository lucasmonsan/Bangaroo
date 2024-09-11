import "./index.css"
import AppRouter from "./AppRouter.tsx"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { GlobalProvider } from "./contexts/GlobalContext.tsx"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AppRouter />
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
)
