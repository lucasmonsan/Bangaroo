import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "./Inputs"
import { Button } from "./Button"
import search from "../assets/search.svg"

export const SearchBar = () => {
	const [cityName, setCityName] = useState("")
	const [options, setOptions] = useState<string[]>([]) // Lista de opções de cidades
	const navigate = useNavigate()

	useEffect(() => {
		const modal = document.getElementById("ModalSearchResult")
		if (modal) {
			if (cityName === "") {
				modal.style.opacity = "0"
				setTimeout(() => {
					modal.style.zIndex = "-1"
				}, 250)
			} else {
				modal.style.zIndex = "3"
				modal.style.opacity = "1"
			}
		}
	}, [cityName])

	const fetchCitySuggestions = async () => {
		if (cityName.length > 2) {
			try {
				const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`)
				const data = await response.json()

				const cityOptions = data
					.filter((city: any) => city.addresstype === "municipality")
					.map((city: any) => {
						const parts = city.display_name.split(",")
						const formattedName = `${parts[0]}, ${parts[2]}, ${parts[3]}, ${parts[5]}`

						return formattedName
					})

				setOptions(cityOptions)
			} catch (error) {
				console.error("Erro ao buscar sugestões de cidades:", error)
			}
		} else {
			setOptions([""])
		}
	}

	const handleSearch = (e: FormEvent) => {
		e.preventDefault() // Impede o comportamento padrão do formulário
		if (cityName === "") {
			alert("Digite o nome da cidade para pesquisar")
		} else {
			/// Chamar a função de busca de cidades
			if (cityName) fetchCitySuggestions()
		}
	}

	return (
		<form onSubmit={handleSearch} className="relative flex ai-center jc-between gap-md w-100 bg-white shadow radius-md" style={{ maxWidth: "960px" }}>
			<Input placeholder="Digite o nome da cidade" className="w-100 padd-lr-xs color-1" value={cityName} onChange={(e) => setCityName(e.target.value)} />

			<Button className="pointer w-xxxl h-xxxl bg-none" type="submit">
				<img src={search} alt="" className="h-100" />
			</Button>

			{/* Modal para exibir as sugestões de cidades */}
			<div id="ModalSearchResult" className="z-hide scroll-y absolute top-100 margin-t-xxs w-100 h-80dvh max-h-80dvh padd-xxs padd-lr-md bg-glass radius-md fast">
				{options.length > 0 ? (
					options.map((option, index) => (
						<div key={index} className="pointer h-100 color-1" onClick={() => setCityName(option)}>
							{option}
						</div>
					))
				) : (
					<h1 className="color-1">Nenhuma cidade encontrada</h1>
				)}
			</div>
		</form>
	)
}
