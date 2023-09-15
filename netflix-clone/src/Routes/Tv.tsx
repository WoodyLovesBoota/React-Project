import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IGenreResult,
  IGetMoviesResult,
  getMovieGenre,
  getMovies,
  IGetTvsResult,
  getTopRatedTvs,
  getTrendingTvs,
  getUpcomingMovies,
  getPopularTvs,
} from "../api";
import TvRow from "../Components/TvRow";
import MainTvPoster from "../Components/MainTvPoster";
import MovieDesc from "../Components/MovieDesc";
import { useRecoilState } from "recoil";
import { movieGenreState } from "../atom";

// Styled Components
const Wrapper = styled.div`
  background-color: black;
  height: 150vh;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  margin-top: -50px;
  position: relative;
`;

const Tv = () => {
  const { data: trendTv, isLoading: trendTvLoading } = useQuery<IGetTvsResult>(
    ["tvs", "trendTv"],
    getTrendingTvs
  );

  const { data: topRatedTv, isLoading: topRatedTvLoading } = useQuery<IGetTvsResult>(
    ["topTvs", "topRatedTv"],
    getTopRatedTvs
  );

  const { data: popularTv, isLoading: popularTvLoading } = useQuery<IGetTvsResult>(
    ["popTvs", "popularTv"],
    getPopularTvs
  );

  return (
    <Wrapper>
      {trendTvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainTvPoster data={trendTv} />
          <Slider>
            <TvRow data={trendTv} title="Trending" />
          </Slider>
          <Slider>
            <TvRow data={topRatedTv} title="Top Rated" />
          </Slider>
          <Slider>
            <TvRow data={popularTv} title="Popular" />
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
