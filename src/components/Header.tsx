import React from 'react';

interface HeaderProps {
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between glass-effect">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Anime Lens Logo" className="w-12 h-12" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Anime Lens
        </h1>
      </div>

      <button
        onClick={onHelpClick}
        className="group relative px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 overflow-hidden help-button-pulse"
        aria-label="Ayuda"
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full transform" style={{ transition: 'transform 0.6s ease-in-out' }}></div>

        <div className="relative flex items-center gap-2">
          {/* Ícono de ayuda con animación */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-md">
              <span className="text-pink-600 font-bold text-lg">?</span>
            </div>
            {/* Anillo de pulso */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></div>
          </div>

          <span className="text-white">Ayuda</span>
        </div>
      </button>
    </header>
  );
};

export default Header;
