import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation, useMatch } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPriceInfo } from "../api";

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
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  font-weight: 600;
`;

const Main = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #202020;
  border-radius: 15px;
`;

const Logo = styled.img`
  height: 15vh;
  width: 15vh;
  margin: 0 20px;
`;

const PriceDesc = styled.div`
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
  width: 100%;
  margin: 30px 0;
  font-size: 14px;
`;

const DescRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 25px;
  background-color: #202020;
  border-radius: 10px;
  font-size: 14px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
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
    USD: {
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
  };
}

const Coin = () => {
  // const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location as ILocation;
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();

  // const [info, setInfo] = useState("");
  // const [priceInfo, setPriceInfo] = useState("");

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // const getCoinData = async () => {
  //   const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
  //   const price = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
  //   setInfo(res.data);
  //   setPriceInfo(price.data);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getCoinData();
  // }, [coinId]);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));

  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinPriceInfo(coinId));
  const loading = infoLoading || priceLoading;
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
            <Logo src={infoData?.logo}></Logo>
            <PriceDesc>
              <span>1 {infoData?.symbol} =</span>
              <p>$ {String(priceData?.quotes.USD.price).substring(0, 9)}</p>
            </PriceDesc>
            {/* <Logo src={""}></Logo> */}
            {/* <PriceDesc>
              <span>{infoData}</span>
              <p>{priceData}</p>
            </PriceDesc> */}
          </Main>
          <Description>
            <DescRow>
              <span>Rank : </span>
              <span>{infoData?.rank}</span>
            </DescRow>
            <DescRow>
              <span>Total Supply : </span>
              <span>{priceData?.total_supply}</span>
            </DescRow>
            <DescRow>
              <span>Max Supply : </span>
              <span>{priceData?.max_supply}</span>
            </DescRow>
            <DescRow>
              <span>Volumn (24H) : </span>
              <span>{priceData?.quotes.USD.volume_24h}</span>
            </DescRow>
            <DescRow>
              <span>Change (24H) : </span>
              <span>{priceData?.quotes.USD.percent_change_24h} %</span>
            </DescRow>
          </Description>

          <Tabs>
            <Link to={`/${coinId}/chart`} state={state}>
              <Tab isActive={chartMatch !== null}>CHART</Tab>
            </Link>
            <Link to={`/${coinId}/price`} state={state}>
              <Tab isActive={priceMatch !== null}>PRICE</Tab>
            </Link>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;
