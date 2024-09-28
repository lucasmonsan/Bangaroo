import { Button } from "./Button"
import { PlusIcon } from "../assets/PlusIcon"
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export const Footer = () => {
	const { lat, lon } = useContext(GlobalContext);

	return (
		<header className={`z-footer flex ai-center jc-center fixed bottom-lg fast ${lat === 0 && lon === 0 ? "right-100" : "right-lg"}`}>
			<Button className="flex ai-center padd-md radius-md shadow">
				<PlusIcon className="h-xxxl" />
			</Button>
		</header>
	)
}
