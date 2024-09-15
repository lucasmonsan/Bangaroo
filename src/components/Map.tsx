import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import "leaflet/dist/leaflet.css";

// Componente para centralizar o mapa quando lat e lon mudarem
const MapCenter = ({ lat, lon }: { lat: number, lon: number }) => {
	const map = useMap();

	useEffect(() => {
		if (lat && lon) {
			map.setView([lat, lon], map.getZoom());
		}
	}, [lat, lon, map]);

	return null;
};

export const Map = () => {
	const { lat, lon } = useContext(GlobalContext);

	return (
		<MapContainer center={[lat, lon]} zoom={13} className="debug z-app h-100dvh">
			<TileLayer
				attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[lat, lon]}>
				<Popup>
					Latitude: {lat}, Longitude: {lon}
				</Popup>
			</Marker>
			<MapCenter lat={lat} lon={lon} />
		</MapContainer>
	);
};
