# AnimeSearch V2

Una aplicación web moderna para buscar y identificar animes a partir de imágenes o capturas de pantalla.

## Características

- Búsqueda de anime por imagen usando la API de trace.moe
- Información detallada del anime desde AniList
- Interfaz moderna con diseño glassmorphism
- Traducciones automáticas al español
- Vista previa de video de la escena identificada
- Drag & drop para subir imágenes

## Tecnologías utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP
- **trace.moe API** - Búsqueda de anime por imagen
- **AniList API** - Información detallada de anime

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/MiguelJiRo/AnimeSearchV2.git
cd AnimeSearchV2
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## Cómo usar

1. Arrastra y suelta una imagen de anime en la zona de carga o haz clic para seleccionar un archivo
2. Espera mientras se analiza la imagen
3. Revisa los resultados con información detallada del anime, episodio y momento específico

## Estructura del proyecto

```
src/
├── components/       # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HelpModal.tsx
│   ├── UploadZone.tsx
│   └── ResultsDisplay.tsx
├── services/        # Servicios y APIs
│   └── animeApi.ts
├── utils/          # Utilidades
│   └── translations.ts
├── types.ts        # Definiciones de tipos TypeScript
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
└── index.css       # Estilos globales
```

## APIs utilizadas

- [trace.moe](https://trace.moe) - Búsqueda de anime por imagen
- [AniList](https://anilist.co) - Base de datos de anime

## Créditos

Creado por [MiguelJiRo](https://github.com/MiguelJiRo)

## Licencia

MIT License
