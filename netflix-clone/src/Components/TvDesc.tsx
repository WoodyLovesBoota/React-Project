import styled from "styled-components";
import {
  IGenreResult,
  ICreditResult,
  IGetMoviesResult,
  getCredit,
  getMovieGenre,
  IGetTvsResult,
} from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { movieGenreState } from "../atom";

const DescContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Column = styled.div`
  &:first-child {
    width: 70%;
  }
  &:last-child {
    width: 30%;
  }
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 35vw;
  height: 90vh;
  top: 5vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  overflow: hidden;
  border-radius: 15px;
  z-index: 100;
`;

const BigCover = styled.div`
  width: 100%;
  height: 21.6vw;
  background-position: center center;
  background-size: cover;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 36px;
  position: relative;
  top: -70px;
  padding-left: 40px;
  font-weight: 400;
`;

const Rating = styled.p`
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 20px;
`;

const BigOverview = styled.p`
  padding: 0 40px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.7;
`;

const Genre = styled.p`
  width: 100%;
  color: ${(props) => props.theme.white.darker};
  padding-right: 40px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 98;
`;

const TvDesc = ({ data, title }: { data: IGetTvsResult | undefined; title: string }) => {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:title/:movieId");

  const { data: movieGenre, isLoading: isLoadingGenreMovie } = useQuery<IGenreResult>(
    ["genre", "moviegenre"],
    getMovieGenre
  );

  const onOverlayClick = () => {
    navigate("/");
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === Number(bigMovieMatch.params.movieId));

  // const { data: credit, isLoading } = useQuery<ICreditResult>(["member", "credit"], () =>
  //   getCredit(Number(bigMovieMatch?.params.movieId))
  // );
  return (
    <AnimatePresence>
      {!isLoadingGenreMovie && bigMovieMatch && bigMovieMatch.params.title === title && (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></Overlay>
          <BigMovie layoutId={bigMovieMatch.params.movieId + "" + title}>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.name}</BigTitle>
                <DescContainer>
                  <Column>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                  </Column>
                  <Column>
                    <Rating>평점: {clickedMovie.vote_average}</Rating>
                    <Genre>
                      장르:
                      {clickedMovie.genre_ids.map((id) =>
                        movieGenre?.genres.map((genre) =>
                          genre.id === id ? <span> {genre.name} </span> : null
                        )
                      )}
                    </Genre>
                  </Column>
                </DescContainer>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
};

export default TvDesc;
