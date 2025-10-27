export interface AnimeResult {
  anilist: number;
  filename: string;
  episode: number | null;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}

export interface TraceMoeResponse {
  frameCount: number;
  error: string;
  result: AnimeResult[];
}

export interface AnimeInfo {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  description: string;
  genres: string[];
  averageScore: number | null;
  episodes: number | null;
  season: string | null;
  seasonYear: number | null;
  format: string | null;
  status: string | null;
}
