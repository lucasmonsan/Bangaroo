import { Main, Section } from "../components/Containers"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useLocation } from "react-router-dom"
import { useContext, useState } from "react"
import "leaflet/dist/leaflet.css"
import { GlobalContext } from "../contexts/GlobalContext"

export const HomePage = () => {
	const params = useLocation()
	const queryParams = new URLSearchParams(params.search)
	const initialAddress = queryParams.get("address") || "" // Extrai o endereço da query string
	const [address, setAddress] = useState(initialAddress)

	const { lat, lon } = useContext(GlobalContext)

	return (
		<Main>
			<Section className="z-app relative hidden column h-100dvh">
				<MapContainer center={[lat, lon]} zoom={13}>
					<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={[lat, lon]}>
						<Popup>Endereço: {address}</Popup>
					</Marker>
				</MapContainer>
			</Section>
		</Main>
	)
}
