import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div``;

const Header = styled.header`
	display: flex;
	justify-content: center;
	margin-top: 18px;
`;

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
		display: flex;
		align-items: center;
		padding: 5px;
		transition: color 0.1s ease-in;
		&:hover {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Img = styled.img`
	margin-right: 10px;
	width: 24px;
	height: 24px;
`;

const Title = styled.div`
	color: ${(props) => props.theme.titleColor};
	font-size: 42px;
`;

const Loading = styled.div`
	text-align: center;
`;
interface ICoin {
	id: string;
	is_active: boolean;
	is_new: boolean;
	name: string;
	rank: number;
	symbol: string;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	return (
		<Container>
			<Helmet>
				<title>Coins</title>
			</Helmet>
			<Header>
				<Title>Coins</Title>
			</Header>
			{isLoading ? (
				<Loading>Now Loading...</Loading>
			) : (
				<CoinsList>
					{data?.slice(0, 20).map((info) => (
						<Coin key={info.id}>
							<Link
								to={`/${info.id}`}
								state={{ name: info.name }}
							>
								<Img
									src={`https://cryptocurrencyliveprices.com/img/${info.id}.png`}
								/>
								{info.name}
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
