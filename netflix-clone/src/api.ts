import axios from "axios";

const API_KEY = "5bffb8ca99dbfae576ba658a895078ee";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export interface IGetMoviesSearchResult {
  results: IMovie[];
}

export interface IGetTvsSearchResult {
  results: ITv[];
}

export const getMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getPopularMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/popular?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getTopRatedMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/top_rated?language=ko-KR&api_key=${API_KEY}`)).json();
};

export const getSearchMovieResult = async (keyword: string | undefined) => {
  return await axios
    .get(`${BASE_URL}/search/movie?query=${keyword}&language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};

export const getSearchTvResult = async (keyword: string | undefined) => {
  return await axios
    .get(`${BASE_URL}/search/tv?query=${keyword}&language=ko-KR&api_key=${API_KEY}`)
    .then((res) => res.data);
};
