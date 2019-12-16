import React, { Component } from "react";
import { Column } from "material-table";
import {
	Button,
	Grid,
	Select,
	Paper,
	MenuItem,
	withStyles,
	WithStyles,
	createStyles,
	Theme,
	FormControl,
	InputLabel
} from "@material-ui/core";

import { MaterialTable } from "./";

export interface ReportAreaProps<T extends object>
	extends WithStyles<typeof styles> {
	reportList: Array<{
		label: string;
		value: string | number;
	}>;
	columns?: Array<Column<T>>;
	loading?: boolean;
	data?: T[];
	value?: string | number;
	onSelect?: (value: string | number) => void;
	onClick?: (value: string | number) => void;
}
class ReportAreaBase<T extends object> extends Component<ReportAreaProps<T>> {
	renderTable() {
		const { columns, data } = this.props;
		if (columns && data) {
			return <MaterialTable data={data} columns={columns} />;
		}
		return null;
	}

	render() {
		const {
			value,
			loading,
			onClick,
			onSelect,
			reportList,
			classes
		} = this.props;

		return (
			<>
				<Grid container direction="row" className={classes.root} spacing={1}>
					<Grid item xs={3}>
						<Paper className={classes.sidebarPaper}>
							<Grid container direction="column" spacing={2}>
								<Grid item>
									<FormControl required fullWidth>
										<InputLabel htmlFor="report">Report</InputLabel>
										<Select
											value={value === undefined || value === null ? "" : value}
											fullWidth
											onChange={e =>
												onSelect && onSelect(e.target.value as number | string)
											}
											id="report"
										>
											{reportList.map(item => (
												<MenuItem value={item.value} key={item.value}>
													{item.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item>
									<Button
										disabled={!Boolean(value) || loading}
										onClick={e => value && onClick && onClick(value)}
										fullWidth
									>
										Generate
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid container item xs={9}>
						<div className={classes.tableContainer}>{this.renderTable()}</div>
					</Grid>
				</Grid>
			</>
		);
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			height: "100%"
		},
		sidebarPaper: {
			padding: theme.spacing(1),
			height: "100%"
		},
		tableContainer: { height: "100%", width: "100%" }
	});

export const ReportArea = withStyles(styles)(ReportAreaBase);
