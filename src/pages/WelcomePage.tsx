import bgImage from "../assets/bg_welcome_page.webp"
import { useNavigate } from "react-router-dom"
import { PageContainer } from "../components/PageContainer"

export const WelcomePage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.setItem("welcome", "true")
    navigate("/login")
  }

  return (
    <PageContainer className="flex column ai-center jc-center gap-md w-100 h-100">
      <img src={bgImage} alt="Logo do Whallet!" className="z-bg fixed w-100 h-100 cover" />

      <div className="z-app flex column ai-center jc-center w-100 h-100">
        <h2 className="title color-1">Olá! Eu sou a</h2>
        <h1 className="title color-1 lh-xl" style={{ fontSize: "calc(var(--base) * 4)" }}>
          Whallet!
        </h1>
      </div>

      <div className="z-app flex column ai-center jc-end gap-sm w-100 h-100 padd-lg">
        <h2 className="title fs-md medium text-center text-shadow">Organize suas finanças de forma prática e intuitiva. Cadastre suas instituições financeiras, acompanhe suas transações e movimentações em um só lugar!</h2>
        <button onClick={() => handleClick()} className="normal w-100 box-shadow">
          Começar
        </button>
      </div>
    </PageContainer>
  )
}
