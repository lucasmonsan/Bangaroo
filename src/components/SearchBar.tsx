// SearchBar.tsx

import { FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "./Inputs";
import { Button } from "./Button";
import { GlobalContext } from "../contexts/GlobalContext";
import { buscarMunicipiosNoIndexedDB, SearchResult } from "../api/indexedDB";
import search from "../assets/search.svg";

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

	const handleCityChoose = (lat: string, lon: string) => {
		setLat(parseFloat(lat));
		setLon(parseFloat(lon));
		setTrigger(false);
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

			<div id="ModalSearchResult" className={`hidden scroll-y absolute top-100 margin-t-xxs w-100 max-h-80dvh padd-lr-md bg-glass radius-md shadow fast ${trigger ? "padd-xxs h-80dvh opacity-1" : "padd-0 h-0 opacity-0"}`} aria-hidden={!trigger}>
				{options.length > 0 ? (
					options.map((option, index) => (
						<div key={index} className="pointer h-xxxl color-1" onClick={() => handleCityChoose(option.lat, option.lon)}>
							{option.display_name}
						</div>
					))
				) : (
					<h1 className="color-1">Nenhuma cidade encontrada</h1>
				)}
			</div>
		</form>
	);
};
