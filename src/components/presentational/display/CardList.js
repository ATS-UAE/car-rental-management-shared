import React, { useState, Component } from "react";
import {
	Grid,
	withStyles,
	TextField,
	InputAdornment,
	TablePagination
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { debounce } from "debounce";
import { search } from "../../../utils";
import Card from "./Card";

class CardList extends Component {
	constructor(props) {
		super(props);
		const rowsPerPageOptions = [4, 10, 20, 50, 100];
		this.state = {
			filter: "",
			page: 0,
			count: 0,
			rowsPerPageOptions,
			rowsPerPage: rowsPerPageOptions[0]
		};
	}

	filterChangeHandler = debounce(e => this.setState({ filter: e }), 200);

	render() {
		const { cards, gridProps, classes, theme } = this.props;

		const filteredData = filterData(cards, this.state.filter);

		const reducedData = reduceData(
			filteredData,
			this.state.page,
			this.state.rowsPerPage
		);

		return (
			<div className={classes.root}>
				<Grid container justify="space-between" className={classes.options}>
					<Grid item xs={12} sm={6}>
						<TextField
							onChange={e => this.filterChangeHandler(e.target.value)}
							label="Search"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TablePagination
							classes={classes.pagination}
							rowsPerPage={this.state.rowsPerPage}
							rowsPerPageOptions={this.state.rowsPerPageOptions}
							count={filteredData.length}
							page={this.state.page}
							onChangeRowsPerPage={e =>
								this.setState({ rowsPerPage: e.target.value })
							}
							onChangePage={(e, page) => this.setState({ page })}
							component="div"
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={theme.breakpoints.down("sm") ? 1 : 3}
					{...gridProps}
				>
					{reducedData.map(
						({
							id,
							title,
							descriptions,
							controls,
							imgSrc,
							props,
							gridItemProps
						}) => (
							<Grid item xs={12} sm={12} md={6} key={id} {...gridItemProps}>
								<Card
									id={id}
									title={title}
									descriptions={descriptions}
									controls={controls}
									imgSrc={imgSrc}
									{...props}
								/>
							</Grid>
						)
					)}
				</Grid>
			</div>
		);
	}
}

const filterData = (cards, keyword) => {
	return cards.filter(({ descriptions, title }) => {
		let passFilter = false;
		if (descriptions) {
			for (let text of descriptions) {
				let pass = search(keyword, text);
				if (pass) {
					passFilter = true;
					break;
				}
			}
		}

		if (title) {
			let pass = search(keyword, title);
			if (pass) passFilter = true;
		}
		return passFilter;
	});
};

const reduceData = (cards, start, limit) => cards.slice(start, start + limit);

const styles = theme => ({
	root: {
		padding: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		}
	},
	options: {
		marginBottom: theme.spacing(1)
	},
	pagination: {
		...theme.mixins.toolbar
	}
});

export default withStyles(styles, { withTheme: true })(CardList);
