import { Route, Routes, useLocation } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { AnimatePresence } from "framer-motion"

function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRouter
