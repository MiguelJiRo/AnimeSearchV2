import axios from 'axios';
import { TraceMoeResponse, AnimeInfo } from '../types';

const TRACE_MOE_API = 'https://api.trace.moe';
const ANILIST_API = 'https://graphql.anilist.co';

export const searchAnimeByImage = async (imageFile: File): Promise<TraceMoeResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(`${TRACE_MOE_API}/search`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw new Error('No se pudo buscar el anime. Intenta de nuevo.');
  }
};

export const getAnimeInfo = async (anilistId: number): Promise<AnimeInfo> => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        description
        genres
        averageScore
        episodes
        season
        seasonYear
        format
        status
      }
    }
  `;

  try {
    const response = await axios.post(ANILIST_API, {
      query,
      variables: { id: anilistId },
    });
    return response.data.data.Media;
  } catch (error) {
    console.error('Error fetching anime info:', error);
    throw new Error('No se pudo obtener información del anime.');
  }
};
