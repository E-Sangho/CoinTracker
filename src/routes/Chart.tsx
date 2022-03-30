import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface ICoinId {
	coinId: string;
}

interface IChart {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

var options = {
	chart: {
		type: "candlestick",
		height: 350,
	},
	title: {
		text: "CandleStick Chart",
		align: "left",
	},
	xaxis: {
		type: "datetime",
	},
	yaxis: {
		tooltip: {
			enabled: true,
		},
	},
};

interface tsChart {
	isLoading: boolean;
	data: IChart[];
}

function Chart({ coinId }: ICoinId) {
	const { isLoading, data } = useQuery<IChart[]>(["chart", coinId], () =>
		fetchCoinHistory(coinId)
	) as tsChart;
	return (
		<ChartContainer>
			{isLoading ? (
				"Loading chart"
			) : (
				<ApexChart
					type="candlestick"
					width="800"
					height="500"
					series={[
						{
							data: data?.map((info) => {
								return {
									x: new Date(info.time_close).getTime(),
									y: [
										info.open,
										info.high,
										info.low,
										info.close,
									],
								};
								/*
									new Date(info.time_open).getTime(),
									[
										Number(info.open.toFixed(3)),
										Number(info.high.toFixed(3)),
										Number(info.low.toFixed(3)),
										Number(info.close.toFixed(3)),
									],
									*/
							}) as {
								x: any;
								y: any;
							}[],
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						plotOptions: {
							candlestick: {
								colors: {
									upward: "#EF403C",
									downward: "#008FFB",
								},
							},
						},
						title: {
							text: `${coinId}`,
							align: "left",
							style: {
								color: "white",
								fontSize: "24",
							},
						},
						xaxis: {
							axisBorder: { show: true },
							axisTicks: { show: false },
							type: "datetime",
							labels: {
								show: false,
							},
						},
						yaxis: {
							forceNiceScale: true,
							decimalsInFloat: 2,
							labels: {
								style: {
									colors: "white",
								},
							},
						},
						tooltip: {
							x: {
								format: "MMM d",
							},
						},
					}}
				/>
			)}
		</ChartContainer>
	);
}

export default Chart;
