import { Link } from "react-router-dom"
import { H1 } from "./Texts"
import { Button } from "./Button"

import { SearchBar } from "./SearchBar"
import { Logo } from "../assets/logo"
import { ModalSearch } from "./ModalSearch"
import { useState } from "react"

export const Header = () => {
	const [results, setResults] = useState([""])
	const [modal, setModal] = useState(false)

	return (
		<header className={`z-header flex ai-center jc-center w-100 h-header padd-sm fixed top-0`}>
			<div className="flex ai-center jc-between h-100 w-100" style={{ maxWidth: "1540px" }}>
				<Link to="/" className="flex ai-center h-100">
					<Logo />
					<div className="flex column jc-center gap-xxxs h-100">
						<H1 className="fs-xl color-1 lh-xl">Ban</H1>
						<H1 className="fs-lg color-1 lh-md">Garoo</H1>
					</div>
				</Link>

				<SearchBar />

				<Button className="h-xxxl">Login</Button>
			</div>

			{modal && <ModalSearch />}
		</header>
	)
}
