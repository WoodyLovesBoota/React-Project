import styled from "styled-components";
import { IGetMoviesResult, IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";

const Banner = styled.div<{ bgPhoto: string }>`
  height: 62.5vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  padding-bottom: 250px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const MainPoster = ({ data }: { data: IGetMoviesResult | undefined }) => {
  return (
    <Banner bgPhoto={makeImagePath(data?.results[0].poster_path || "")}>
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
    </Banner>
  );
};

export default MainPoster;
