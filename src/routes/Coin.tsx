import {
	useParams,
	useLocation,
	Routes,
	Route,
	Link,
	useMatch,
} from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import IPriceData from "./IPriceData";
import IInfoData from "./IInfoData";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 1080px;
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 18px;
`;

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

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 24px 12px;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 24px;
	font-weight: 400;
	background-color: ${(props) => props.theme.dominantColor};
	padding: 6px 0px;
	border-radius: 12px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;

interface StateInterface {
	state: {
		name: string;
	};
}

interface RouteParams {
	coinId: string;
}

function Coin() {
	const { coinId } = useParams<keyof RouteParams>() as RouteParams;
	const { state } = useLocation() as StateInterface;
	const priceMatch = useMatch("/:coinId/price");
	const chartMatch = useMatch("/:coinId/chart");
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickersLoading, data: tickersData } =
		useQuery<IPriceData>(["ticker", coinId], () => fetchCoinPrice(coinId));
	const loading = infoLoading || tickersLoading;
	return (
		<Container>
			<Header>
				<Title>
					{state ? state.name : loading ? "Loading" : infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loading>Now Loading...</Loading>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price</span>
							<span>${tickersData?.quotes.USD.price}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Price</span>
							<span>${tickersData?.quotes.USD.ath_price}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>Total Supply</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>percent change 1h</span>
							<span>
								{tickersData?.quotes.USD.percent_change_1h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 6h</span>
							<span>
								{tickersData?.quotes.USD.percent_change_6h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 12h</span>
							<span>
								{tickersData?.quotes.USD.percent_change_12h}%
							</span>
						</OverviewItem>
						<OverviewItem>
							<span>percent change 24h</span>
							<span>
								{tickersData?.quotes.USD.percent_change_24h}%
							</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Tabs>
						<Tab isActive={priceMatch !== null}>
							<Link to="price">Price</Link>
						</Tab>
						<Tab isActive={chartMatch !== null}>
							<Link to="chart">Chart</Link>
						</Tab>
					</Tabs>
					<Routes>
						<Route path="price" element={<Price />} />
						<Route path="chart" element={<Chart />} />
					</Routes>
				</>
			)}
		</Container>
	);
}

export default Coin;
