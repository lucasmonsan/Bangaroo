import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { H1 } from "./Texts"
import { Input } from "./Inputs"
import { Button } from "./Button"

import logo from "../assets/logo.svg"
import search from "../assets/search.svg"

export const Header = () => {
	const [address, setAddress] = useState("")
	const navigate = useNavigate()

	return (
		<header className={`z-header flex ai-center jc-center w-100 h-header padd-sm fixed top-0 bg-color-1`}>
			<div className="flex ai-center jc-between h-100 w-100" style={{ maxWidth: "1540px" }}>
				<div className="flex ai-center h-100">
					<img src={logo} alt="" className="h-100" />
					<div className="flex column jc-center gap-xxxs h-100">
						<H1 className="fs-xl color-white lh-xl">Ban</H1>
						<H1 className="fs-lg color-white lh-md">Garoo</H1>
					</div>
				</div>

				<form onSubmit={() => navigate("/search?")} className="flex ai-center jc-between gap-md w-100 bg-white shadow radius-md" style={{ maxWidth: "960px" }}>
					<Input placeholder="Digite o nome da rua, bairro ou cidade" className="w-100 padd-lr-xs" value={address} onChange={(e) => setAddress(e.target.value)} />
					<Button className="w-xxxl h-xxxl bg-none">
						<img src={search} alt="" className="h-100" />
					</Button>
				</form>

				<Button className="h-xxxl">Login</Button>
			</div>
		</header>
	)
}
