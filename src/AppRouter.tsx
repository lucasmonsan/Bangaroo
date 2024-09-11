import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { SplashPage } from "./pages/SplashPage"
import { WelcomePage } from "./pages/WelcomePage"
import { useGLobal } from "./contexts/GlobalContext"
import { LoginPage } from "./pages/LoginPage"
import { NotFoundPage } from "./pages/NotFoundPage"

/***/

function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<SplashRedirect />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="splash" element={<SplashPage />} />
      </Routes>
    </AnimatePresence>
  )
}
export default AppRouter

/***/

const SplashRedirect = () => {
  const splash = sessionStorage.getItem("splash")
  const { pathname } = useLocation()
  const { setRouteLink } = useGLobal()

  if (!splash) {
    setRouteLink(pathname)
    return <Navigate to="/splash" />
  } else return <Outlet />
}
