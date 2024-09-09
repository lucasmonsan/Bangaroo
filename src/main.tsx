import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./AppRouter.tsx"
import "./main.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	</StrictMode>,
)
