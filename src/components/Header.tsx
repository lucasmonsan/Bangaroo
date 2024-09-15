import { H1 } from "./Texts"
import { Button } from "./Button"

import { SearchBar } from "./SearchBar"
import { Logo } from "../assets/logo"

export const Header = () => {
	return (
		<header className={`z-header flex ai-center jc-center w-100 h-header padd-sm fixed top-0`}>
			<div className="flex ai-center jc-between gap-md h-100 w-100" style={{ maxWidth: "1540px" }}>
				<Button className="flex ai-center h-xxxl radius-md shadow">
					<Logo />
					<div className="flex column jc-center gap-xxxs h-100">
						<H1 className="color-1">Bangaroo</H1>
					</div>
				</Button>

				<SearchBar />

				<Button className="h-xxxl padd-md radius-md shadow">Login</Button>
			</div>
		</header>
	)
}
