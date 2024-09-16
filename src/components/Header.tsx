import { Button } from "./Button"

import { SearchBar } from "./SearchBar"
import { Logo } from "../assets/logo"

export const Header = () => {
	return (
		<header className={`z-header flex ai-center jc-center w-100 h-header padd-sm fixed top-0`}>
			<div className="flex ai-center jc-between gap-sm h-100 w-100" style={{ maxWidth: "1080px" }}>
				<Button className="flex ai-center h-xxxl radius-md shadow" style={{ padding: "0 var(--sm) 0 var(--xs)" }}>
					<Logo className="h-xxl" />
				</Button>

				<SearchBar />
			</div>
		</header>
	)
}
