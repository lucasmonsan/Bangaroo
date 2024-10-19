import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AnimatePresence } from "framer-motion";
import { SplashPage } from "./pages/SplashPage";

function AppRouter() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<SplashRedirect />}>
          <Route index element={<HomePage />} />
          <Route path="newReview" element={<HomePage />} />
        </Route>
        <Route path="splash" element={<SplashPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRouter;

const SplashRedirect = () => {
  const lastDayAccess = sessionStorage.getItem("lastDayAccess");
  if (!lastDayAccess) return <Navigate to="/splash" />;
  return <Outlet />;
};
