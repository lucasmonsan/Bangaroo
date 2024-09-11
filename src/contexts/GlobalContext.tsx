import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

interface GlobalProps {
  children: ReactNode
}
interface GlobalContextType {
  routeLink: string
  setRouteLink: Dispatch<SetStateAction<string>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
const defaultGlobalContext: GlobalContextType = {
  isLoading: false,
  setIsLoading: () => {},
  routeLink: "",
  setRouteLink: () => {},
}
export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext)

export const GlobalProvider: FC<GlobalProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [routeLink, setRouteLink] = useState<string>("")

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading, routeLink, setRouteLink }}>
      {children}
      <Loading />
    </GlobalContext.Provider>
  )
}

/***/

export const useGLobal = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

/***/

const Loading = () => {
  const { isLoading } = useGLobal()
  const [visible, setVisible] = useState("")
  const [opacity, setOpacity] = useState("opacity-0")

  useEffect(() => {
    if (isLoading) {
      setVisible("_flex")
      setTimeout(() => setOpacity("_opacity-1"), 100)
    } else {
      setOpacity("_opacity-0")
      setTimeout(() => setVisible("_display-none"), 500)
    }
  }, [isLoading])

  return (
    <div className={``}>
      <span className="" />
    </div>
  )
}
