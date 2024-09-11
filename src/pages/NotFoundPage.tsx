import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const NotFoundPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate("/login"), 2000)
  }, [])

  return (
    <div>
      <h1>NotFound</h1>
    </div>
  )
}
