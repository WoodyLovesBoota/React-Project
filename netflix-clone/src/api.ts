const API_KEY = "5bffb8ca99dbfae576ba658a895078ee";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
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

export const getMovies = async () => {
  return (await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)).json();
};
