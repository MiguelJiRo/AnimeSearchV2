import React, { useCallback, useState } from 'react';

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          onImageSelect(file);
        }
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
        isDragging ? 'scale-105' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        className={`cursor-pointer w-full max-w-2xl h-96 glass-effect rounded-3xl flex flex-col items-center justify-center hover-glow transition-all duration-300 ${
          isDragging ? 'border-4 border-pink-400 bg-pink-400 bg-opacity-20' : 'border-2 border-dashed border-white border-opacity-30'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xl font-semibold">Buscando anime...</p>
            <p className="text-sm text-gray-400">Esto puede tardar unos segundos</p>
          </div>
        ) : (
          <>
            <svg
              className="w-24 h-24 mb-4 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-2xl font-bold mb-2 text-center">
              Arrastra una imagen aquí
            </p>
            <p className="text-lg text-gray-300 mb-4 text-center">
              o haz clic para seleccionar
            </p>
            <div className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold">
              Seleccionar imagen
            </div>
          </>
        )}
      </label>
    </div>
  );
};

export default UploadZone;
