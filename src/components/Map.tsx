import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon, LatLngBoundsExpression } from "leaflet";
import { useGlobal } from "../contexts/GlobalContext";
import pin from "../assets/pin.svg";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { getCityIndexedDB } from "../api/indexedDB";
import { CityProps } from "../api/interfaces";

// Definindo o ícone customizado
const customIcon = new Icon({
  iconUrl: pin,
  iconSize: [48, 48],
  iconAnchor: [24, 64],
  popupAnchor: [0, -64],
});
// Componente para centralizar o mapa
const MapCenter = ({ lat, lon }: { lat: number, lon: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon && (lat !== 0 || lon !== 0)) {
      const newZoom = 14; // Zoom ajustado para quando há uma cidade selecionada
      map.setView([lat, lon], newZoom);
    }
  }, [lat, lon, map]);
  return null;
};
// Componente para manipular cliques no mapa
const MapClickHandler = ({ setPinPosition }: { setPinPosition: (position: [number, number]) => void }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPinPosition([lat, lng]);
      console.log(`Nova posição do pin: Latitude: ${lat}, Longitude: ${lng}`);
    },
  });
  return null;
};
// Componente para logar o nível de zoom atual do mapa
const ZoomLogger = () => {
  const map = useMap();
  useEffect(() => {
    const onZoomEnd = () => {
      console.log(`Nível de zoom atual: ${map.getZoom()}`);
    };
    map.on("zoomend", onZoomEnd);
    return () => {
      map.off("zoomend", onZoomEnd);
    };
  }, [map]);
  return null;
};

export const Map = () => {
  const { global } = useGlobal(); // Acessa diretamente o contexto global
  const [pinPosition, setPinPosition] = useState<[number, number]>([0, 0]);
  const [citySelected, setCitySelected] = useState<CityProps | undefined>();
  const brazilBounds: LatLngBoundsExpression = [[-33.7, -73.9], [5.3, -34.8]];
  const brazilCenter: [number, number] = [-14.235, -51.9253];

  const handlePinClick = async () => { // Função para manipular o clique no pin
    console.log("Pin foi clicado!");
  };

  useEffect(() => { // Atualiza a posição do pin quando as coordenadas da cidade são alteradas
    const updateCitySelected = async () => {
      const cityResponse = await getCityIndexedDB(global.cityId, global.country);
      setCitySelected(cityResponse);
    };
    updateCitySelected();
  }, [global.cityId]);

  return (
    <MapContainer center={brazilCenter} zoom={5} style={{ width: "100%", height: "100%", zIndex: "var(--z-app)" }} maxBounds={brazilBounds} maxBoundsViscosity={1.0}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" detectRetina={true} tileSize={256} />
      {citySelected && citySelected.lat !== "" && citySelected.lon !== "" && (
        <Marker icon={customIcon} position={pinPosition} eventHandlers={{ click: handlePinClick }}>
          <Popup>
            <DivPopup>
              {citySelected.reviewsCount === 0 ? (
                <h2 id="Title">Esse local ainda não possui reviews...</h2>
              ) : (
                <button id="GetReviews">Ver reviews</button>
              )}
              <button id="NewReview">Criar Review</button>
              <button id="IncorrectPin">O pin está no lugar errado do mapa?</button>
            </DivPopup>
          </Popup>
        </Marker>
      )}
      <MapClickHandler setPinPosition={setPinPosition} />
      <ZoomLogger />
      {citySelected && <MapCenter lat={parseFloat(citySelected.lat)} lon={parseFloat(citySelected.lon)} />}
    </MapContainer>
  );
};

/***/

const DivPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sm);

  h2#Title {
    margin-bottom: var(--xxs);
    text-align: center;
    line-height: var(--lg);
  }

  button {
    padding: var(--sm);
    font-size: calc(var(--lg) * 0.9);
    background-color: transparent;

    &#GetReviews {
      color: var(--white);
      background-color: var(--comp);
      border: solid 2px var(--border);
    }

    &#NewReview {
      color: var(--black);
      background-color: var(--white);
    }

    &#IncorrectPin {
      padding: var(--xxxs) var(--xxs);
      font-size: var(--sm);
      color: var(--color-3);
    }
  }
`;
