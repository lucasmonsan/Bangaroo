import styled from "styled-components";
import { useEffect, useState } from "react";
import { SearchIcon } from "../assets/SearchIcon";
import { getCoordinates, indexedDB } from "../api/indexedDB";
import { CityProps } from "../api/interfaces";
import { CloseIcon } from "../assets/CloseIcon";
import { useGlobal } from "../contexts/GlobalContext";
import { getReviewCountByCity } from "../api/appwrite";

export const Search = () => {
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
    setGlobal({ field: "footer", payload: "Search_City" })
  }
  const handleButtonClick = async (cityId: CityProps) => {
    const citySelected = await indexedDB.table(global.country).get(cityId)
    setSearchTerm(`${citySelected.name}, ${citySelected.state_acronym}`);
    setResultsVisible(false)
    setGlobal({ field: "loading", payload: true })

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
      setGlobal({ field: "footer", payload: "" })
    } catch (error) {
      console.error("Erro ao processar coordenadas e/ou reviews:", error);
    } finally {
      setGlobal({ field: "cityId", payload: citySelected.id })
      setGlobal({ field: "loading", payload: false })
    }
  };

  useEffect(() => { //Controla se os resultados da pesquisa estão visíveis
    const searchResults = document.getElementById("SearchResults");
    if (!searchResults) return

    if (resultsVisible === true && global.footer === "Search_City") {
      searchResults.style.zIndex = "var(--z-footer)"
      searchResults.style.opacity = "1";
    } else {
      searchResults.style.opacity = "0";
      setTimeout(() => {
        setResults([]);
        searchResults.style.zIndex = "var(--z-hide)";
      }, 250);
    }
  }, [resultsVisible, global.footer]);

  useEffect(() => { //Controla se o botão de limpar a barra de pesquisa está visível
    const cleanSearchTerm = document.getElementById("CleanSearchTerm")
    if (!cleanSearchTerm) return

    if (searchTerm.length > 0) {
      cleanSearchTerm.style.opacity = "1"
      cleanSearchTerm.style.transform = "translateX(0)"
    } else {
      cleanSearchTerm.style.opacity = "0.5"
      cleanSearchTerm.style.transform = "translateX(100%)"
    }
  }, [searchTerm])

  return (
    <>
      <FormStyled onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm) }}>
        <label id="SearchBar">
          <button type="button" id="SearchIcon" onClick={() => setSearchTerm("")}>
            <SearchIcon fill="var(--border)" />
          </button>

          <input
            placeholder="Cidade, município ou distrito..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <button type="button" id="CleanSearchTerm" onClick={() => setSearchTerm("")}>
            <CloseIcon stroke="var(--border)" />
          </button>
        </label>
      </FormStyled>

      <SectionStyled id="SearchResults">
        <div id="List">
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
        </div>

        <SpanGradient />
      </SectionStyled>
    </>
  );
};

/***/

const FormStyled = styled.form`
  width: 100%;

  label#SearchBar {
    overflow-x: hidden;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--header-h);
    padding: 0 var(--xs);
    color: var(--white);
    border-radius: var(--radius-1);
    background-color: var(--black);
    box-shadow: var(--shadow-1);

    input {
      flex-grow: 1;
      width: 100%;
      font-size: var(--md);
    }

    button {
      width: var(--xl);
      height: 100%;
      padding: 0 var(--xxxs) 0;
      border-radius: 0;
      background: linear-gradient(to left, var(--black), var(--black));
      transition: all var(--fast);
    
      &#CleanSearchTerm {
        position: absolute;
        right: 0;
        background: linear-gradient(to left, var(--black), transparent);
      }

      svg {
        width: var(--lg);
        height: calc(var(--lg) * 0.8);
      }
    }
  }
`
const SectionStyled = styled.section`
  overflow: hidden;
  position: absolute;
  bottom: calc(var(--xl) * 1.75);
  display: flex;
  flex-direction: column;
	gap: var(--xs);
  width: calc(100% - var(--lg));
  height: auto;
  max-height: calc(var(--header-h) * 12);
  padding: var(--xs) var(--xs) 0 var(--sm);
  padding-bottom: var(--sm);
	color: var(--white);
  border: none;
  border-radius: var(--radius-1);
  background-color: var(--black);
  transition: opacity var(--fast);

  div#List {
    overflow-y: auto;
  }

  div#Cities {
    padding: var(--xxs) 0 var(--xs) 0;

    &:not(:last-child) {
      border-bottom: solid 1px var(--comp);
    }

    button {
      flex-direction: column;
      align-items: flex-start;
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

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`
const SpanGradient = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--lg);
  background: linear-gradient(to top, var(--black), transparent);
  opacity: 1;
`
