import { indexedDB } from "./indexedDB";
import { Account, Client, Databases, ID, Query } from "appwrite";
import { errorResponse } from "../utils/errorResponses";
import { CityProps } from "./interfaces";

const hostname = import.meta.env.VITE_HOSTNAME;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const dbID = import.meta.env.VITE_APPWRITE_DB_ID;
const dbCitiesID = import.meta.env.VITE_APPWRITE_DB_CITIES_ID;
const dbReviewsID = import.meta.env.VITE_APPWRITE_DB_REVIEWS_ID;

const client = new Client().setEndpoint(endpoint).setProject(projectID);
const databases = new Databases(client);
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export const uploadAllCitiesCloud = async () => {
//   try {
//     const cities = await indexedDB.cities.toArray();
//     if (cities.length === 0) {
//       console.log("Nenhuma cidade encontrada no IndexedDB.");
//       return;
//     }

//     for (let i = 0; i < cities.length; i += batchSize) {
//       const batch = cities.slice(i, i + batchSize);

//       const promises = batch.map(async (city) => {
//         try {
//           const existingCity = await databases.getDocument(dbId, dbCitiesId, city.id.toString());
//           console.log(`Cidade ${existingCity.name} já existe no Appwrite.`);
//         } catch (error) {
//           const appwriteError = error as any; // ou use 'AppwriteException' se disponível
//           if (appwriteError.code === 404) {
//             // Documento não existe, pode criar
//             await databases.createDocument(dbId, dbCitiesId, city.id.toString(), {
//               name: city.name,
//               type: city.type,
//               state_acronym: city.state_acronym,
//               state_name: city.state_name,
//               region_imediate: city.region_imediate,
//               region_intermediate: city.region_intermediate,
//               region: city.region,
//               lat: city.lat,
//               lon: city.lon,
//             });
//             console.log(`Cidade ${city.name} sincronizada com o Appwrite.`);
//           } else if (appwriteError.code === 409) {
//             // Documento já existe, isso pode acontecer em casos de duplicidade
//             console.log(`Cidade ${city.name} já existe no Appwrite.`);
//           } else {
//             // Outros erros (exemplo: falhas de rede)
//             console.error(`Erro ao sincronizar a cidade ${city.name}:`, appwriteError.message);
//           }

//         }
//       });

//       // Aguarda que todas as requisições do lote sejam completadas
//       await Promise.all(promises);

//       // Aguarda 1 minuto após o lote para evitar exceder o limite de requisições
//       console.log(`Aguardando 1 minuto antes do próximo lote...`);
//       await delay(60000); // 60 segundos
//     }
//   } catch (error) {
//     console.error("Erro ao fazer upload das cidades para o Appwrite:", error);
//   }
// };

export const getReviewCountByCity = async (cityId: string) => {
  try {
    const response = (await databases.listDocuments(dbID, dbReviewsID, [Query.equal('city', cityId)]));
    console.log(response.documents)
    return response.total
  } catch (error) {
    console.error(`Erro ao obter a contagem de reviews:`, error);
    return 0;
  }
};
export const getCityFromAppwrite = async (cityId: string) => {
  try {
    return await databases.getDocument(dbID, dbCitiesID, cityId);
  } catch (error) {
    const appwriteError = error as any;
    if (appwriteError.code === 404) return console.error(`Cidade com ID ${cityId} não encontrada no Appwrite.`);
    else {
      const { title, message } = errorResponse(error);
      console.error(`Erro ao procurar cidade no Appwrite: ${title}, ${message}`);
      throw error;
    }
  }
};
export const uploadCityToAppwrite = async (city: CityProps, i: number) => {
  try {
    await databases.createDocument(dbID, dbCitiesID, city.id.toString(), {
      name: city.name,
      type: city.type,
      state_acronym: city.state_acronym,
      state_name: city.state_name,
      region_imediate: city.region_imediate,
      region_intermediate: city.region_intermediate,
      region: city.region,
      lat: city.lat,
      lon: city.lon,
    });
    console.log(`${i + 1} -> Cidade ${city.name} sincronizada com sucesso no Appwrite.`);
  } catch (error) {
    const { title, message } = errorResponse(error);
    console.error(`${i} -> Erro ao upar cidade para o Appwrite: ${title}, ${message}`);
    throw error;
  }
};
export const syncAllCitiesToAppwrite = async (country: string) => {
  if (country === "Brazil") {
    try {
      const cities = await indexedDB.brazil.toArray();
      if (cities.length === 0) return console.log("Nenhuma cidade encontrada no IndexedDB.");
      else {
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i];
          const existingCity = await getCityFromAppwrite(city.id.toString());
          if (!existingCity) await uploadCityToAppwrite(city, i)
          else console.log(`${i + 1} -> Cidade ${city.name} já existe no Appwrite.`)
          await delay(100);
        }
        console.log("Sincronização de todas as cidades concluída.");
      }
    } catch (error) {
      const { title, message } = errorResponse(error);
      console.error(`Erro ao sincronizar as cidades com o Appwrite: ${title}, ${message}`);
    }
  }
};
