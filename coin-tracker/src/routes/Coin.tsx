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
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.5px solid lightgray;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
`;

const Main = styled.div`
  width: 100%;
  height: 20vh;
  background-color: purple;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.5px solid lightgray;
`;

const Logo = styled.img`
  height: 15vh;
  width: 15vh;
  margin-right: 20px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 13vh;
  span {
    font-size: 16px;
  }
  p {
    font-size: 48px;
    font-weight: 800;
    color: blue;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20vh;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid lightgray;
  font-size: 12px;
`;

const DescRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ILocation {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location as ILocation;
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const [info, setInfo] = useState("");
  const [priceInfo, setPriceInfo] = useState("");

  const getCoinData = async () => {
    // const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    // const price = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    setInfo("res.data");
    setPriceInfo("price.data");
    setLoading(false);
  };

  useEffect(() => {
    getCoinData();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Main>
            {/* <Logo src={info?.logo}></Logo>
            <Price>
                <p>1 {info?.symbol} =</p>
                <p>$ {priceInfo?.quotes.price}</p>
            </Price> */}
            <Logo src={""}></Logo>
            <Price>
              <span>{info}</span>
              <p>{priceInfo}</p>
            </Price>
          </Main>
          <Description>
            <DescRow>
              <span>Rank : </span>
              <span></span>
            </DescRow>
            <DescRow>
              <span>Total Supply : </span>
              <span></span>
            </DescRow>
            <DescRow>
              <span>Volumn (24H) : </span>
              <span></span>
            </DescRow>
            <DescRow>
              <span>Change (24H) : </span>
              <span></span>
            </DescRow>
          </Description>
        </>
      )}
    </Container>
  );
};

export default Coin;
