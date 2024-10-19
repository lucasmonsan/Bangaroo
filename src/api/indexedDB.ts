import Dexie from "dexie";
import { CityProps } from "./interfaces";
import axios from "axios";

// Inicializa o banco de dados Dexie
export const indexedDB = new Dexie("BangarooDB") as Dexie & { Brazil: Dexie.Table<CityProps> };

indexedDB.version(1).stores({
  Brazil: "&id, name"
});

/***/

// Função para salvar dados no IndexedDB
const saveToIndexedDB = async (data: CityProps[], country: string) => {
  if (data.length > 0) {
    // Remove duplicatas antes de adicionar novos dados
    const existingIds = await indexedDB.table(country).where("id").anyOf(data.map(d => d.id)).keys();
    const newData = data.filter(d => !existingIds.includes(d.id));
    if (newData.length > 0) {
      await indexedDB.Brazil.bulkAdd(newData);
      console.log("Dados salvos no IndexedDB.", newData);
    } else {
      console.log("Nenhum novo dado para salvar.");
    }
  } else {
    console.log("Nenhum dado para salvar.");
  }
};
// Função para validar o endereço no Nominatim
const validateAddress = (place: any, state: string) => {
  const address = place.address;
  return address.state && address.state.toLowerCase() === state.toLowerCase();
};
// Função para apagar todo o IndexedDB
export const deleteIndexedDB = async () => {
  try {
    await indexedDB.delete();
    console.log("BangarooDB foi apagado com sucesso.");
    await indexedDB.open(); // Reabre o banco de dados após deletá-lo
  } catch (err) {
    console.error("Erro ao tentar apagar BangarooDB: ", err);
  }
};
// Função para obter todos os distritos do Brasil
export const getAllDistricts = async (country: string) => {
  const IBGE_DISTRITOS_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/distritos";
  if (country === "Brazil") {
    try {
      const distritosResponse = await axios.get(IBGE_DISTRITOS_URL);
      if (!distritosResponse || distritosResponse.status !== 200) {
        console.error(`Erro ao buscar distritos. Status: ${distritosResponse.status}, Mensagem: ${distritosResponse.statusText}`);
        return;
      }
      const districts: CityProps[] = distritosResponse.data.filter((distrito: any) => distrito.nome.toLowerCase() !== distrito.municipio.nome.toLowerCase()).map((distrito: any) => ({
        id: distrito.id.toString(),
        name: distrito.nome,
        type: "district",
        region_imediate: distrito.municipio.nome,
        region_intermediate: distrito.municipio.nome,
        state_acronym: distrito.municipio.microrregiao.mesorregiao.UF.sigla,
        state_name: distrito.municipio.microrregiao.mesorregiao.UF.nome,
        region: distrito.municipio.microrregiao.mesorregiao.UF.regiao.nome,
        lat: distrito.coordenadas?.latitude || "",
        lon: distrito.coordenadas?.longitude || "",
        neighborhood: [],
        reviewsCount: 0
      }));
      await saveToIndexedDB(districts, "Brazil");
    } catch (error) {
      console.error("Erro na busca de distritos:", error);
    }
  }
};
// Função para obter todos os municípios do Brasil
export const getAllMunicipalities = async (country: string) => {
  const IBGE_MUNICIPIOS_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
  if (country === "Brazil") {
    try {
      const municipiosResponse = await axios.get(IBGE_MUNICIPIOS_URL);
      if (!municipiosResponse || municipiosResponse.status !== 200) {
        console.error(`Erro ao buscar municípios. Status: ${municipiosResponse.status}, Mensagem: ${municipiosResponse.statusText}`);
        return;
      }
      const municipalities: CityProps[] = municipiosResponse.data.map((municipio: any) => ({
        id: municipio.id.toString(),
        name: municipio.nome,
        type: "municipality",
        state_acronym: municipio.microrregiao.mesorregiao.UF.sigla,
        state_name: municipio.microrregiao.mesorregiao.UF.nome,
        region_imediate: municipio["regiao-imediata"].nome,
        region_intermediate: municipio["regiao-imediata"]["regiao-intermediaria"].nome,
        region: municipio.microrregiao.mesorregiao.UF.regiao.nome,
        lat: municipio.coordenadas?.latitude || "",
        lon: municipio.coordenadas?.longitude || "",
        neighborhood: [],
        reviewsCount: 0
      }));
      await saveToIndexedDB(municipalities, "Brazil");
    } catch (error) {
      console.error("Erro na busca de municípios:", error);
    }
  }
};
// Função para obter coordenadas usando o Nominatim
export const getCoordinates = async (name: string, state: string, country: string) => {
  const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
  if (country === "Brazil") {
    try {
      const response = await axios.get(NOMINATIM_URL, {
        params: { q: `${name}, ${state}, Brasil`, format: 'json', addressdetails: 1, limit: 5 }
      });
      if (response.data && response.data.length > 0) {
        const resultadoCorreto = response.data.find((place: any) => validateAddress(place, state));
        if (resultadoCorreto) {
          const { lat, lon } = resultadoCorreto;
          return { lat, lon };
        }
      }
      console.warn(`Nenhuma coordenada encontrada para ${name}, ${state}`);
      return { lat: '', lon: '' };
    } catch (error) {
      console.error(`Erro ao buscar coordenadas para ${name}:`, error);
      return { lat: '', lon: '' };
    }
  }
};
export const getCityIndexedDB = async (cityId: string, country: string) => {
  try {
    return await indexedDB.table(country).get(cityId)
  } catch (error) {
    console.error("Erro ao encontrar cidade no indexedDB: ", error)
  }
}

