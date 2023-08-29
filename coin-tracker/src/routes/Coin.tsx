import { Link, Outlet, useParams, useLocation, useMatch } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPriceInfo } from "../api";
import { Helmet } from "react-helmet";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding: 0 1.5vw;
  max-width: 50vw;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 7vw;
  padding-right: 0.8vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 2vw;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2.5vw;
  font-weight: 600;
`;

const Main = styled.div`
  width: 100%;
  height: 13vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #202020;
  border-radius: 1.5vw;
`;

const Logo = styled.img`
  height: 15vh;
  width: 15vh;
  margin: 0 1.5vw;
`;

const PriceDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 7vw;
  span {
    font-size: 1.3vw;
  }
  p {
    font-size: 4.5vw;
    font-weight: 800;
    color: #5d5ddd;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 3vw 0;
  font-size: 1.4vw;
`;

const DescRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vw;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23vw;
  height: 2.5vw;
  background-color: #202020;
  border-radius: 1vw;
  font-size: 1.2vw;
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
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location as ILocation;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () =>
    fetchCoinInfo(coinId)
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinPriceInfo(coinId)
  );
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name || "Loading..."}</title>
      </Helmet>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
        <Link to={"/"}>
          <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
        </Link>
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

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
};

export default Coin;
