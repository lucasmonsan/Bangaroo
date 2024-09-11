import { AnimatePresence } from "framer-motion"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { Header } from "./components/Header"

function AppRouter() {
	return (
		<>
			<Header />

			<AnimatePresence mode="wait">
				<Routes>
					<Route index element={<HomePage />} />
				</Routes>
			</AnimatePresence>
		</>
	)
}

export default AppRouter
