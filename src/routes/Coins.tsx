import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 1080px;
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	justify-content: center;
	margin-top: 18px;
	margin-bottom: 15px;
`;

const CoinsList = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, minmax(64px, 1fr));
	gap: 10px;
`;

const Coin = styled.li`
	font-size: 24px;
	background-color: ${(props) => props.theme.dominantColor};
	border-radius: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
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
	width: 48px;
	height: 48px;
	margin-bottom: 6px;
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

const Navbar = styled.div`
	padding: 12px 12px;
	display: flex;
	justify-content: space-between;
	a {
		font-size: 18px;
	}
`;

const Button = styled.button`
	color: ${(props) => props.theme.textColor};
	background-color: transparent;
	border: none;
	font-size: 18px;
	&:hover {
		color: ${(props) => props.theme.accentColor};
	}
`;

const LinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((state) => !state);
	return (
		<Container>
			<Helmet>
				<title>Coins</title>
			</Helmet>
			<Navbar>
				<Link to="/">Home</Link>
				<Button onClick={toggleDarkAtom}>Change Theme</Button>
			</Navbar>
			<Header>
				<Title>Coins</Title>
			</Header>
			{isLoading ? (
				<Loading>Now Loading...</Loading>
			) : (
				<CoinsList>
					{data?.slice(0, 40).map((info) => (
						<Coin key={info.id}>
							<Link
								to={`/${info.id}`}
								state={{ name: info.name }}
							>
								<LinkContainer>
									<Img
										src={`https://cryptocurrencyliveprices.com/img/${info.id}.png`}
									/>
									{info.name}
								</LinkContainer>
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
