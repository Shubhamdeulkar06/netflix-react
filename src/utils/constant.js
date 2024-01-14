export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const CDN_IMG_URL = "https://image.tmdb.org/t/p/w300/";

export const OPEN_AI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
