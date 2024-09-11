import { useEffect } from "react"
import { LogoIcon } from "../assets/LogoIcon"
import { useNavigate } from "react-router-dom"
import { useGLobal } from "../contexts/GlobalContext"
import { PageContainer } from "../components/PageContainer"

export const SplashPage = () => {
  const navigate = useNavigate()
  const { routeLink } = useGLobal()

  useEffect(() => {
    sessionStorage.setItem("splash", "true")
    const welcome = localStorage.getItem("welcome")

    if (!welcome) setTimeout(() => navigate("/welcome"), 2000)
    else setTimeout(() => navigate(routeLink), 2000)
  }, [])

  return (
    <PageContainer className={`z-context fixed flex column ai-center jc-center gap-sm w-100 h-100 bg-color-bg fade-in`}>
      <LogoIcon className="h-lg fill-color-1 opacity-0 scale-0 pulse fast" style={{ height: "calc(var(--base) * 5)" }} />
    </PageContainer>
  )
}
