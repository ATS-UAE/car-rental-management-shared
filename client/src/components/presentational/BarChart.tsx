import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import {
	BarChart as BarChartRechart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import tinygradient from "tinygradient";

const gradients = ["#FF8E53", "#ffd400", "#FE6B8B", "#a500ff", "#0072ff"];

interface BarChartData {
	name: string;
}

export interface BarChartProps<T extends BarChartData> {
	title?: string;
	xAxis?: boolean;
	data: Array<T>;
	bars: Array<Extract<keyof T, string>>;
}

export class BarChart<T extends BarChartData> extends Component<
	BarChartProps<T>
> {
	render() {
		const { title, data, bars, xAxis } = this.props;

		const legendColors = tinygradient(
			gradients.slice(0, Math.max(2, bars.length))
		).rgb(Math.max(2, bars.length));

		return (
			<>
				{title && (
					<Typography align="center" variant="h6" component="h1">
						{title}
					</Typography>
				)}
				<ResponsiveContainer width="100%" height={300}>
					<BarChartRechart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						{bars.map((bar, index) => (
							<Bar
								key={index}
								dataKey={bar}
								label={false}
								fill={`#${legendColors[index].toHex()}`}
							/>
						))}
					</BarChartRechart>
				</ResponsiveContainer>
			</>
		);
	}
}
