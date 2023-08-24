import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

interface ILocation {
  state: {
    name: string;
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location as ILocation;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  const getCoinData = async () => {
    const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    const price = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);

    setInfo(res);
    setPriceInfo(price);
    setLoading(false);
  };

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <h1>Coin: {coinId}</h1>}
    </Container>
  );
};

export default Coin;
