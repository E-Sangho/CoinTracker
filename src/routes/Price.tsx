import { fetchCoinPrice } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import IPriceData from "./IPriceData";

const CurPrice = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 100px;
	color: ${({ theme }) => theme.accentColor};
	font-size: 32px;
	font-weight: bold;
`;
const PricePercent = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	div {
		margin: 8px 0;
	}
`;

const PricePercentTitle = styled.div``;

const PricePercentContent = styled.div``;

const PriceContainer = styled.div`
	margin: 0px auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 800px;
	height: 300px;
	background-color: ${({ theme }) => theme.dominantColor};
	border-radius: 16px;
`;

interface ICoinId {
	coinId: string;
}

function Price({ coinId }: ICoinId) {
	const { isLoading, data } = useQuery<IPriceData>(["ticker", coinId], () =>
		fetchCoinPrice(coinId)
	);
	const isDark = useRecoilValue(isDarkAtom);
	return (
		<PriceContainer>
			{isLoading ? (
				"Loading Price"
			) : (
				<>
					<CurPrice>{`Current Price: $${data?.quotes.USD.price.toFixed(
						3
					)}`}</CurPrice>
					<PricePercent>
						<PricePercentTitle>Percent Change</PricePercentTitle>
						<PricePercentContent>
							<div>{`15m: ${data?.quotes.USD.percent_change_15m}`}</div>
							<div>{`30m: ${data?.quotes.USD.percent_change_30m}`}</div>
							<div>{`1h: ${data?.quotes.USD.percent_change_1h}`}</div>
							<div>{`6h: ${data?.quotes.USD.percent_change_6h}`}</div>
							<div>{`12h: ${data?.quotes.USD.percent_change_12h}`}</div>
							<div>{`24h: ${data?.quotes.USD.percent_change_24h}`}</div>
							<div>{`7d: ${data?.quotes.USD.percent_change_7d}`}</div>
							<div>{`30d: ${data?.quotes.USD.percent_change_30d}`}</div>
							<div>{`1y: ${data?.quotes.USD.percent_change_1y}`}</div>
						</PricePercentContent>
					</PricePercent>
				</>
			)}
		</PriceContainer>
	);
}

export default Price;
