import { useLocation } from "react-router-dom";
import {
  getSearchMovieResult,
  getSearchTvResult,
  IGetMoviesSearchResult,
  IGetTvsSearchResult,
} from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  padding: 40px;
`;

const Container = styled.div`
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled.div<{ bgPhoto: string }>`
  height: 200px;
  background-color: gray;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: movie, isLoading: movieLoading } = useQuery<IGetMoviesSearchResult>(
    ["searchMovie", keyword],
    () => getSearchMovieResult(keyword || "")
  );

  const { data: tv, isLoading: tvLoading } = useQuery<IGetTvsSearchResult>(
    ["searchTv", keyword],
    () => getSearchTvResult(keyword || "")
  );

  const [movieResult, tvResult] = [movie?.results, tv?.results];

  return (
    <Wrapper>
      <Container>
        <Title>Movies</Title>
        <Row>
          {movieResult?.map((movie) => (
            <Box bgPhoto={makeImagePath(movie.backdrop_path, "w500" || "")} key={movie.id}>
              <h2>{movie.title}</h2>
            </Box>
          ))}
        </Row>
      </Container>
      <Container>
        <Title>TV Shows</Title>
        <Row>
          {tvResult?.map((tv) => (
            <Box bgPhoto={makeImagePath(tv.backdrop_path, "w500" || "")} key={tv.id}>
              <h2>{tv.name}</h2>
            </Box>
          ))}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Search;
