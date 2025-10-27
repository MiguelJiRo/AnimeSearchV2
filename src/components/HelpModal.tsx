import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Cómo usar Anime Lens
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-pink-400 text-3xl transition-colors"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6 text-gray-200">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-pink-300">
              1. Sube una imagen
            </h3>
            <p className="leading-relaxed">
              Haz clic en el área de carga o arrastra y suelta una imagen de cualquier escena de anime.
              La imagen puede ser un screenshot, un fotograma o cualquier captura de pantalla de un anime.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-pink-300">
              2. Espera los resultados
            </h3>
            <p className="leading-relaxed">
              Nuestra IA analizará la imagen usando trace.moe y buscará coincidencias en una base de datos
              de miles de animes. El proceso suele tardar solo unos segundos.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-pink-300">
              3. Descubre información
            </h3>
            <p className="leading-relaxed">
              Verás el anime detectado, el episodio específico, el momento exacto de la escena,
              una vista previa en video, y toda la información relevante del anime desde AniList.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-pink-300">
              Consejos
            </h3>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Usa imágenes claras y sin marcas de agua para mejores resultados</li>
              <li>La precisión es mayor con escenas distintivas del anime</li>
              <li>Formatos soportados: JPG, PNG, GIF, WebP</li>
              <li>Tamaño máximo recomendado: 10MB</li>
            </ul>
          </section>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold hover-glow transition-all duration-300 hover:scale-105"
        >
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
