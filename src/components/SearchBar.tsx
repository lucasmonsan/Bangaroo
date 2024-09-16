import { FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "./Inputs";
import { Button } from "./Button";
import { GlobalContext } from "../contexts/GlobalContext";
import { buscarMunicipiosNoIndexedDB, atualizarMunicipioNoIndexedDB, SearchResult, MunicipioProps, db } from "../api/indexedDB";
import { H2, P } from "./Texts";
import search from "../assets/search.svg";

// Função para buscar coordenadas utilizando a API de geocodificação
const buscarCoordenadas = async (cityName: string): Promise<{ lat: string; lon: string } | null> => {
	try {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`);
		const data = await response.json();
		if (data.length > 0) {
			return { lat: data[0].lat, lon: data[0].lon };
		}
		return null;
	} catch (error) {
		console.error("Erro ao buscar coordenadas:", error);
		return null;
	}
};

export const SearchBar = () => {
	const [currentCity, setCurrentCity] = useState("");
	const [typedCity, setTypedCity] = useState("");
	const [trigger, setTrigger] = useState(false);
	const [options, setOptions] = useState<SearchResult[]>([]);
	const { setLat, setLon } = useContext(GlobalContext);

	useEffect(() => {
		const modal = document.getElementById("ModalSearchResult");
		if (modal) {
			if (currentCity !== typedCity || currentCity === "") setTrigger(false);
			else setTrigger(true);
		}
	}, [trigger, currentCity]);

	useEffect(() => {
		const searchMunicipios = async () => {
			if (typedCity) {
				console.log("Pesquisando município:", typedCity);
				const municipios = await buscarMunicipiosNoIndexedDB(typedCity);
				setTrigger(true);
				console.log("Resultados encontrados:", municipios);
				setOptions(municipios);
			} else {
				setTrigger(true);
				setOptions([]);
			}
		};

		searchMunicipios();
	}, [typedCity]);

	// Função modificada para buscar as coordenadas apenas quando o usuário selecionar a cidade
	const handleCityChoose = async (lat: string, lon: string, name: string, place_id: number) => {
		// Verifica se já há coordenadas; se não, busca via API
		if (!lat || !lon) {
			const coords = await buscarCoordenadas(name);
			if (coords) {
				setLat(parseFloat(coords.lat));
				setLon(parseFloat(coords.lon));

				// Atualiza o IndexedDB com as coordenadas encontradas
				const municipioCompleto = await db.municipios.get(place_id) as MunicipioProps;
				if (municipioCompleto) {
					const municipioAtualizado: MunicipioProps = {
						...municipioCompleto,
						coordenadas: {
							lat: coords.lat,
							lon: coords.lon
						}
					};
					await atualizarMunicipioNoIndexedDB(municipioAtualizado);
				}
			}
		} else {
			// Usa as coordenadas já armazenadas
			setLat(parseFloat(lat));
			setLon(parseFloat(lon));
		}

		setTrigger(false);
		setCurrentCity(name);
	};

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault();
		setTypedCity(currentCity);
	};

	return (
		<form onSubmit={handleSearch} className="relative flex ai-center jc-between gap-md w-100 bg-white shadow radius-md shadow">
			<Input placeholder="Digite o nome da cidade" className="w-100 padd-lr-xs color-1" value={currentCity} onChange={(e) => setCurrentCity(e.target.value)} />

			<Button className="pointer w-xxxl h-xxxl bg-none" type="submit">
				<img src={search} alt="" className="h-100" />
			</Button>

			<div id="ModalSearchResult"
				className={`hidden scroll-y absolute top-100 flex column gap-xs margin-t-xxs w-100 max-h-80dvh padd-lr-md bg-glass radius-md shadow fast ${trigger ? "padd-sm h-80dvh opacity-1" : "padd-0 h-0 opacity-0"}`} aria-hidden={!trigger}
			>
				{options.length > 0 ? (
					options.map((option, index) => (
						<div key={index} className="pointer flex column ai-start jc-center gap-xxxs padd-tb-xxxs color-1 item-option" onClick={() => handleCityChoose(option.lat, option.lon, option.display_name, option.place_id)}>
							<H2 className="color-1 fs-lg lh-md" style={{ fontSize: "calc(var(--lg) * 0.75)" }}>{option.display_name}</H2>
							<P className="fs-sm lh-md opacity-075">
								{option.regiao_imediata === option.regiao_intermediaria ? option.regiao_imediata : `${option.regiao_imediata} - ${option.regiao_intermediaria}`} - {option.UF}
							</P>
						</div>
					))
				) : (
					<h1 className="color-1">Nenhuma cidade encontrada</h1>
				)}
			</div>
		</form>
	);
};
