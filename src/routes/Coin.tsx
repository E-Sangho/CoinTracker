import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import IPriceData from "./IPriceData";
import IInfoData from "./IInfoData";

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.div`
	color: ${(props) => props.theme.titleColor};
	font-size: 42px;
`;

const Loading = styled.div`
	text-align: center;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.dominantColor};
	border-radius: 12px;
	margin: 20px 10px;
	padding: 10px 20px;
	margin-bottom: 18px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span {
		font-size: 20px;
		font-weight: 500;
	}
	span:first-child {
		font-size: 12px;
		font-weight: 400;
		margin-bottom: 6px;
	}
`;

const Description = styled.p`
	font-size: 24px;
	margin: 20px 10px;
`;

interface StateInterface {
	state: {
		name: string;
	};
}

function Coin() {
	const { coinId } = useParams();
	const [loading, setLoading] = useState(true);
	const { state } = useLocation() as StateInterface;
	const [info, setInfo] = useState<IInfoData>();
	const [priceInfo, setPriceInfo] = useState<IPriceData>();
	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
	}, []);
	return (
		<Container>
			<Header>
				<Title>{state?.name || "Loading"}</Title>
			</Header>
			{loading ? (
				<Loading>Now Loading...</Loading>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank</span>
							<span>{info?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price</span>
							<span>${priceInfo?.quotes.USD.price}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Price</span>
							<span>${priceInfo?.quotes.USD.ath_price}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>Total Supply</span>
							<span>{priceInfo?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply</span>
							<span>{priceInfo?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>percent change 1h</span>
							<span>
								{priceInfo?.quotes.USD.percent_change_1h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 6h</span>
							<span>
								{priceInfo?.quotes.USD.percent_change_6h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 12h</span>
							<span>
								{priceInfo?.quotes.USD.percent_change_12h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 24h</span>
							<span>
								{priceInfo?.quotes.USD.percent_change_24h}%
							</span>
						</OverviewItem>
					</Overview>
					<Description>{info?.description}</Description>
				</>
			)}
		</Container>
	);
}

export default Coin;
