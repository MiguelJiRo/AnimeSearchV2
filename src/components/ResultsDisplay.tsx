import React from 'react';
import { AnimeResult, AnimeInfo } from '../types';
import { translateGenre, translateFormat, translateStatus, translateSeason } from '../utils/translations';

interface ResultsDisplayProps {
  result: AnimeResult;
  animeInfo: AnimeInfo | null;
  onNewSearch: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, animeInfo, onNewSearch }) => {
  const similarity = (result.similarity * 100).toFixed(2);
  const timeFrom = formatTime(result.from);
  const timeTo = formatTime(result.to);

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }


  return (
    <div className="w-full h-full overflow-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect rounded-3xl p-8 space-y-6">
          {/* Header with similarity */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Resultado encontrado
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">Similitud</p>
                <p className="text-2xl font-bold text-green-400">{similarity}%</p>
              </div>
              <button
                onClick={onNewSearch}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold hover-glow transition-all duration-300 hover:scale-105"
              >
                Nueva búsqueda
              </button>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column - Video preview and scene info */}
            <div className="space-y-4">
              <div className="aspect-video glass-effect rounded-2xl overflow-hidden">
                <video
                  src={result.video}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="glass-effect rounded-2xl p-6 space-y-3">
                <h3 className="text-xl font-bold text-pink-300 mb-4">Información de la escena</h3>
                <div className="space-y-2">
                  <InfoRow label="Episodio" value={result.episode?.toString() || 'Desconocido'} />
                  <InfoRow label="Tiempo" value={`${timeFrom} - ${timeTo}`} />
                  <InfoRow label="Archivo" value={result.filename} small />
                </div>
              </div>
            </div>

            {/* Right column - Anime info */}
            <div className="space-y-4">
              {animeInfo ? (
                <>
                  <div className="flex gap-4">
                    <img
                      src={animeInfo.coverImage.large}
                      alt={animeInfo.title.romaji}
                      className="w-32 h-48 object-cover rounded-xl shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{animeInfo.title.romaji}</h3>
                      {animeInfo.title.english && animeInfo.title.english !== animeInfo.title.romaji && (
                        <p className="text-lg text-gray-300 mb-1">{animeInfo.title.english}</p>
                      )}
                      <p className="text-md text-gray-400 mb-3">{animeInfo.title.native}</p>
                      {animeInfo.genres && animeInfo.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {animeInfo.genres.map((genre, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-sm"
                            >
                              {translateGenre(genre)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="glass-effect rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {animeInfo.averageScore && (
                        <InfoRow label="Puntuación" value={`${animeInfo.averageScore}/100`} />
                      )}
                      {animeInfo.episodes && (
                        <InfoRow label="Episodios" value={animeInfo.episodes.toString()} />
                      )}
                      {animeInfo.format && (
                        <InfoRow label="Formato" value={translateFormat(animeInfo.format)} />
                      )}
                      {animeInfo.status && (
                        <InfoRow label="Estado" value={translateStatus(animeInfo.status)} />
                      )}
                      {animeInfo.season && animeInfo.seasonYear && (
                        <InfoRow label="Emisión" value={`${translateSeason(animeInfo.season)} ${animeInfo.seasonYear}`} />
                      )}
                    </div>

                    {animeInfo.description && (
                      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                        <h4 className="font-bold text-pink-300 mb-2">Sinopsis</h4>
                        <p className="text-sm text-gray-300 leading-relaxed max-h-48 overflow-y-auto">
                          {animeInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center glass-effect rounded-2xl p-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-semibold text-gray-300">Cargando información detallada...</p>
                    <p className="text-sm text-gray-400">Traduciendo contenido</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  small?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, small }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className={`font-semibold ${small ? 'text-xs break-all' : 'text-base'}`}>{value}</p>
  </div>
);

export default ResultsDisplay;
