import { useNavigate } from "react-router-dom"

export const useNavigation = () => {
	const navigate = useNavigate()

	const navigateTo = (path: string | number, delay = 0, lastPath = "") => {
		setTimeout(() => {
			if (typeof path === "string") {
				navigate(path)
			} else if (typeof path === "number") {
				navigate(path)
			}
			lastPath !== "" && localStorage.setItem("lastPath", lastPath)
			console.log("navigateTo: ", path)
		}, delay)
	}

	return { navigateTo }
}
