import { useState } from 'react';
import Header from './components/Header';
import HelpModal from './components/HelpModal';
import UploadZone from './components/UploadZone';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { searchAnimeByImage, getAnimeInfo } from './services/animeApi';
import { AnimeResult, AnimeInfo } from './types';
import { translateText } from './utils/translations';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnimeResult | null>(null);
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setAnimeInfo(null);

    try {
      // Search anime by image using trace.moe
      const searchResult = await searchAnimeByImage(file);

      if (searchResult.result && searchResult.result.length > 0) {
        const topResult = searchResult.result[0];
        setResult(topResult);

        // Fetch detailed anime info from AniList
        try {
          const info = await getAnimeInfo(topResult.anilist);

          // Translate description to Spanish if it exists
          if (info.description) {
            console.log('Original description:', info.description.substring(0, 100));
            const translatedDescription = await translateText(info.description, 'es');
            console.log('Translated description:', translatedDescription.substring(0, 100));
            info.description = translatedDescription;
          }

          setAnimeInfo(info);
        } catch (err) {
          console.error('Error fetching anime details:', err);
          // Continue even if AniList fails
        }
      } else {
        setError('No se encontraron coincidencias. Intenta con otra imagen.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el anime');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    setAnimeInfo(null);
    setError(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header onHelpClick={() => setIsHelpOpen(true)} />

      <main className="flex-1 overflow-hidden">
        {error && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="glass-effect rounded-3xl p-8 max-w-md text-center">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold mb-4 text-red-400">Oops...</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={handleNewSearch}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold hover-glow transition-all duration-300 hover:scale-105"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        )}

        {!error && !result && (
          <UploadZone onImageSelect={handleImageSelect} isLoading={isLoading} />
        )}

        {!error && result && (
          <ResultsDisplay
            result={result}
            animeInfo={animeInfo}
            onNewSearch={handleNewSearch}
          />
        )}
      </main>

      <Footer />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
