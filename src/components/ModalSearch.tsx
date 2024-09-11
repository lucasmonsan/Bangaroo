import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { Main, Section } from "./Containers"
import { H1 } from "./Texts"

interface ModalSearchProps {
	// results: string[]
	// setResults: Dispatch<SetStateAction<number[]>>
	// address: string
}

export const ModalSearch: FC<ModalSearchProps> = ({}) => {
	// // Função para buscar as coordenadas usando a API Nominatim
	// const fetchCoordinates = async (address: string) => {
	// 	try {
	// 		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
	// 		const data = await response.json()
	// 		if (data.length > 0) {
	// 			const { lat, lon } = data[0]
	// 			setResults([parseFloat(lat), parseFloat(lon)])
	// 		} else {
	// 			alert("Endereço não encontrado!")
	// 		}
	// 	} catch (error) {
	// 		console.error("Erro ao buscar coordenadas:", error)
	// 	}
	// }

	return (
		<Main>
			<Section className="leaflet-container z-app relative hidden column padd-t-header debug">
				{/* {results?.map((result, index) => (
					<H1>{result}</H1>
				))} */}
				<h1>Lucas</h1>
			</Section>
		</Main>
	)
}
