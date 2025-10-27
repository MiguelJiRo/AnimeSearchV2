// Traducciones de géneros de anime
const genreTranslations: Record<string, string> = {
  'Action': 'Acción',
  'Adventure': 'Aventura',
  'Comedy': 'Comedia',
  'Drama': 'Drama',
  'Ecchi': 'Ecchi',
  'Fantasy': 'Fantasía',
  'Horror': 'Terror',
  'Mahou Shoujo': 'Chicas Mágicas',
  'Mecha': 'Mecha',
  'Music': 'Música',
  'Mystery': 'Misterio',
  'Psychological': 'Psicológico',
  'Romance': 'Romance',
  'Sci-Fi': 'Ciencia Ficción',
  'Slice of Life': 'Recuentos de la Vida',
  'Sports': 'Deportes',
  'Supernatural': 'Sobrenatural',
  'Thriller': 'Thriller',
};

// Traducciones de formatos
const formatTranslations: Record<string, string> = {
  'TV': 'Serie de TV',
  'TV_SHORT': 'Serie Corta',
  'MOVIE': 'Película',
  'SPECIAL': 'Especial',
  'OVA': 'OVA',
  'ONA': 'ONA',
  'MUSIC': 'Musical',
};

// Traducciones de estados
const statusTranslations: Record<string, string> = {
  'FINISHED': 'Finalizado',
  'RELEASING': 'En emisión',
  'NOT_YET_RELEASED': 'Próximamente',
  'CANCELLED': 'Cancelado',
  'HIATUS': 'En pausa',
};

// Traducciones de temporadas
const seasonTranslations: Record<string, string> = {
  'WINTER': 'Invierno',
  'SPRING': 'Primavera',
  'SUMMER': 'Verano',
  'FALL': 'Otoño',
};

export const translateGenre = (genre: string): string => {
  return genreTranslations[genre] || genre;
};

export const translateFormat = (format: string): string => {
  return formatTranslations[format] || format;
};

export const translateStatus = (status: string): string => {
  return statusTranslations[status] || status;
};

export const translateSeason = (season: string): string => {
  return seasonTranslations[season] || season;
};

// Función para dividir texto en fragmentos por oraciones
const splitIntoSentences = (text: string): string[] => {
  // Divide por puntos, pero mantiene algunos casos especiales
  return text.match(/[^.!?]+[.!?]+/g) || [text];
};

// Función auxiliar para traducir usando Lingva Translate (sin CORS issues)
const translateWithLingva = async (text: string, targetLang: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://lingva.ml/api/v1/en/${targetLang}/${encodeURIComponent(text)}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.translation || null;
  } catch (error) {
    console.error('Lingva translation error:', error);
    return null;
  }
};

// Función auxiliar para traducir usando MyMemory
const translateWithMyMemory = async (text: string, targetLang: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return null;
  } catch (error) {
    console.error('MyMemory translation error:', error);
    return null;
  }
};

// Función principal para traducir texto con múltiples fallbacks
export const translateText = async (text: string, targetLang: string = 'es'): Promise<string> => {
  try {
    // Eliminar tags HTML antes de traducir
    let cleanText = text.replace(/<[^>]*>/g, '').trim();

    if (!cleanText) return '';

    console.log(`Traduciendo texto de ${cleanText.length} caracteres...`);

    // Para textos cortos, intentar traducción directa con fallbacks
    if (cleanText.length <= 400) {
      // Intentar con Lingva primero
      let translated = await translateWithLingva(cleanText, targetLang);
      if (translated) {
        console.log('Traducción exitosa con Lingva');
        return translated;
      }

      // Si falla, intentar con MyMemory
      translated = await translateWithMyMemory(cleanText, targetLang);
      if (translated) {
        console.log('Traducción exitosa con MyMemory');
        return translated;
      }

      // Si ambos fallan, devolver texto original
      console.warn('Ambas APIs fallaron, devolviendo texto original');
      return cleanText;
    }

    // Para textos largos, dividir en oraciones y traducir por fragmentos
    console.log('Texto largo detectado, dividiendo en fragmentos...');
    const sentences = splitIntoSentences(cleanText);
    const translatedSentences: string[] = [];
    let currentChunk = '';

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];

      // Si agregar esta oración excede el límite, traducir el chunk actual
      if (currentChunk.length + sentence.length > 400 && currentChunk.length > 0) {
        console.log(`Traduciendo fragmento ${i}/${sentences.length}...`);

        // Intentar con Lingva primero
        let translated = await translateWithLingva(currentChunk, targetLang);

        // Si falla, intentar con MyMemory
        if (!translated) {
          translated = await translateWithMyMemory(currentChunk, targetLang);
        }

        translatedSentences.push(translated || currentChunk);

        // Pequeña pausa para no saturar las APIs
        await new Promise(resolve => setTimeout(resolve, 300));

        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }

    // Traducir el último chunk
    if (currentChunk.length > 0) {
      console.log('Traduciendo último fragmento...');

      let translated = await translateWithLingva(currentChunk, targetLang);

      if (!translated) {
        translated = await translateWithMyMemory(currentChunk, targetLang);
      }

      translatedSentences.push(translated || currentChunk);
    }

    const finalTranslation = translatedSentences.join(' ');
    console.log('Traducción completa finalizada');

    return finalTranslation;
  } catch (error) {
    console.error('Error general en traducción:', error);
    return text.replace(/<[^>]*>/g, '');
  }
};
