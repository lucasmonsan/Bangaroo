import styled from "styled-components";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { SearchIcon } from "../assets/SearchIcon";
import { getCoordinates, indexedDB } from "../api/indexedDB";
import { CityProps } from "../api/interfaces";
import { CloseIcon } from "../assets/CloseIcon";
import { FilterIcon } from "../assets/FilterIcon";
import { useGlobal } from "../contexts/GlobalContext";
import { getReviewCountByCity } from "../api/appwrite";

interface HeaderProps { }

export const Header: FC<HeaderProps> = (props) => {
  const { global, setGlobal } = useGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [resultsVisible, setResultsVisible] = useState<boolean>(false)

  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const getSimilarityScore = (term: string, target: string) => {
    if (target.startsWith(term)) return 2;
    if (target.includes(term)) return 1;
    return 0;
  };
  const handleSearch = async (term: string) => {
    if (term.length < 3) return alert("errado")

    const [cityName, stateName] = term.split(",").map((part) => removeDiacritics(part.trim().toLowerCase()));

    const cities = await indexedDB.table(global.country).filter((city) => {
      const name = removeDiacritics(city.name.toLowerCase());
      const state = removeDiacritics(city.state_acronym.toLowerCase());
      return name.includes(cityName) && (stateName ? state.includes(stateName) : true);
    }).toArray();

    const sortedResults = cities.sort((a, b) => {
      const aNormalized = removeDiacritics(a.name.toLowerCase());
      const bNormalized = removeDiacritics(b.name.toLowerCase());
      const similarityA = getSimilarityScore(cityName, aNormalized);
      const similarityB = getSimilarityScore(cityName, bNormalized);
      if (similarityA > similarityB) return -1;
      if (similarityA < similarityB) return 1;
      return a.name.localeCompare(b.name);
    });

    setResults(sortedResults);
    setResultsVisible(true)
  }
  const handleButtonClick = async (cityId: CityProps) => {
    const citySelected = await indexedDB.table(global.country).get(cityId)
    setSearchTerm(`${citySelected.name}, ${citySelected.state_acronym}`);
    setResultsVisible(false)

    try {
      if (!citySelected.lat || !citySelected.lon) {
        const newCoordnates = await getCoordinates(citySelected.name, citySelected.state_name, global.country);
        if (newCoordnates) {
          const { lat, lon } = newCoordnates
          if (lat && lon) {
            await indexedDB.table(global.country).update(citySelected.id, { lat, lon } as Partial<CityProps>);
            console.log(`Coordenadas atualizadas no IndexedDB para ${citySelected.name}, ${citySelected.state_acronym}.`);
          } else {
            setGlobal({ field: "modal", payload: "CoordNotFound" });
            console.error("Não foi possível encontrar coordenadas para essa cidade.");
            return;
          }
        }
      }
      const reviewsCount = await getReviewCountByCity(citySelected.id);
      await indexedDB.table(global.country).update(citySelected.id, { reviewsCount } as Partial<CityProps>)
      console.log(`Número de reviews para a cidade ${citySelected.name}: ${reviewsCount}`)
    } catch (error) {
      console.error("Erro ao processar coordenadas e/ou reviews:", error);
    } finally {
      setGlobal({ field: "cityId", payload: citySelected.id })
    }
  };
  const handleFilter = async () => {
    try {
      const distritosResponse = await axios.get("https://viacep.com.br/ws/MG/Divinopolis/json/");
      console.log(distritosResponse);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const searchResults = document.getElementById("SearchResults");
    if (!searchResults) return

    if (resultsVisible === true) {
      searchResults.style.transform = "translateY(0)";
      setTimeout(() => (searchResults.style.opacity = "1"), 150);
    } else {
      searchResults.style.opacity = "0";
      setTimeout(() => {
        setResults([]);
        searchResults.style.transform = "translateY(calc(var(--header-h) * -4))";
      }, 250);
    }
  }, [resultsVisible]);

  return (
    <>
      {resultsVisible === true && <ButtonCancel onClick={() => setResultsVisible(false)} />}

      <HeaderStyled>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm) }}>
          <label id="SearchBar">
            <button type="button" id="Search">
              <SearchIcon fill="var(--border)" />
            </button>

            <input placeholder="Cidade, município ou distrito..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

            <button type="button" id="Clean" onClick={() => setSearchTerm("")}>
              <CloseIcon stroke="var(--border)" />
            </button>
          </label>
        </form>

        <button id="Filter" onClick={() => handleFilter()}>
          <FilterIcon />
        </button>

        <section id="SearchResults">
          {searchTerm && results.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            results.map((city) => (
              <div id="Cities" key={city.id}>
                <button onClick={() => handleButtonClick(city.id)}>
                  <h3>{city.name}</h3>
                  {city.type === "district" ? (
                    <p>Distrito de {city.region_imediate} - {city.state_acronym}</p>
                  ) : (
                    <p>{city.region_imediate} - {city.state_acronym}</p>
                  )}
                </button>
              </div>
            ))
          )}
        </section>
      </HeaderStyled>
    </>
  );
};

/***/

const HeaderStyled = styled.header`
  z-index: var(--z-header);
  position: relative;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: var(--xs);
	width: 100%;
  max-width: calc(var(--base) * 30);
	height: 100dvh;
  padding-top: var(--xs);
  background-color: var(--black);
  border: solid var(--sm) var(--black);

  @media (max-width: 960px) {
    position: fixed;
    top: 0;
    align-items: center;
    max-width: 1080px;
    height: calc(var(--base) * 4.25);
  }

	section, label {
		display: flex;
		gap: var(--xs);
		color: var(--white);
	}

	button#Filter {
    cursor: pointer;
    display: flex;
		align-items: center;
    width: var(--header-h);
		height: var(--header-h);
    padding: calc(var(--xs) * 1.25);
    border-radius: var(--radius-1);
    border: solid 2px var(--border);
    background-color: var(--black);
    transition: border var(--fast);
	}

	form {
    width: 100%;

    label#SearchBar {
      cursor: pointer;
      align-items: center;
      width: 100%;
      height: var(--header-h);
      padding: var(--sm) var(--md);
      border: solid 2px var(--border);
      border-radius: var(--radius-1);
      background-color: var(--black);
      transition: border var(--fast);

      input {
        font-size: var(--md);
      }

      button {
        display: flex;
        width: calc(var(--lg) * 0.85);
        padding: 0;
        background-color: transparent;
      }
    }
  }

	section#SearchResults {
    position: absolute;
    top: 0;
    flex-direction: column;
    width: 100%;
    height: auto;
    max-height: calc(100dvh - calc(var(--header-h) * 2.75));
    margin-top: calc(var(--header-h) * 1.15);
    overflow-y: auto;
    padding: var(--xs);
    border: none;
    border-radius: none;
    background-color: var(--black);
    opacity: 0;
    transform: translateY(calc(var(--header-h) * -4));
    transition: opacity var(--fast);

    div, p {
      opacity: 0;
      animation: fadeIn 0.5s forwards;
      transition: opacity 0.5s;
    }

    div#Cities {
      display: flex;
      padding: var(--xxs) 0 var(--xs) 0;

      &:not(:last-child) {
        border-bottom: solid 1px var(--comp);
      }

      button {
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: transparent;
        text-align: start;
        font-size: var(--md);
        
        p {
          padding-top: var(--xxxs);
          font-size: var(--sm);
          font-weight: 500;
          color: var(--border);
        }
      }
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`
const ButtonCancel = styled.button`
  z-index: var(--z-header);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`
