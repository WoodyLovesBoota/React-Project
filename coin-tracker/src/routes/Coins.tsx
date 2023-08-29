import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding: 0 1.5vw;
  max-width: 50vw;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  height: 6vw;
  transition: height 0.3s ease-in-out;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 1vw;
  border-radius: 1.2vw;
  a {
    height: 100%;
    padding: 1.6vw;
    transition: background-color 0.5s ease-in-out;
    display: flex;
    align-items: center;
    border-radius: 1.2vw;
  }

  &:hover {
    height: 7vw;
    a {
      background-color: #d0bfff;
      border: 2px solid transparent;
      span {
        font-size: 1.6vw;
      }
      img {
        width: 3.5vw;
        height: 3.5vw;
      }
    }
  }
`;

const CoinName = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  span {
    transition: font-size 0.3s ease-in-out;
    font-size: 1.4vw;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 4vw;
  font-weight: 600;
`;

const Img = styled.img`
  width: 3vw;
  height: 3vw;
  margin-right: 1vw;
  transition: all 0.3s ease-in-out;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <Header>
        <Title>DashBoard</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 30).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                <CoinName>
                  <span>{coin.name}</span>
                  <span>
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </span>
                </CoinName>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
