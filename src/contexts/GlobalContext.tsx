import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react"

interface GlobalProps {
	children: ReactNode
}
interface GlobalContextType {
	lat: number
	setLat: Dispatch<SetStateAction<number>>
	lon: number
	setLon: Dispatch<SetStateAction<number>>
}
const defaultGlobalContext: GlobalContextType = {
	lat: 51.505,
	setLat: () => {},
	lon: -0.09,
	setLon: () => {},
}
export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext)

export const GlobalProvider: FC<GlobalProps> = ({ children }) => {
	const [lat, setLat] = useState(51.505)
	const [lon, setLon] = useState(-0.09)

	return <GlobalContext.Provider value={{ lat, setLat, lon, setLon }}>{children}</GlobalContext.Provider>
}
export const useGlobal = () => {
	const context = useContext(GlobalContext)
	if (context === undefined) {
		throw new Error("useGlobal must be used within an GlobalProvider")
	}
	return context
}
