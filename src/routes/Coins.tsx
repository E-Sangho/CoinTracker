import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div``;

const Header = styled.header``;

const CoinsList = styled.ul``;

const Coin = styled.li`
  height: 36px;
  font-size: 24px;
  background-color: ${(props) => props.theme.dominantColor};
  border-radius: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  a {
    padding: 5px;
    transition: color 0.1s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.titleColor};
  font-size: 42px;
`;

const Loading = styled.div`
  text-align: center;
`;
interface CoinInterface {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const [Coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      let response = await fetch("https://api.coinpaprika.com/v1/coins");
      let json = await response.json();
      json = json.slice(0, 10);
      setCoins(json);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loading>Now Loading...</Loading>
      ) : (
        <CoinsList>
          {Coins.map((info) => (
            <Coin key={info.id}>
              <Link to={`/${info.id}`}>{info.name}</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
