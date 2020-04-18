import React, { Component, ReactNode } from "react";
import classNames from "classnames";
import {
	Grid,
	withStyles,
	TextField,
	InputAdornment,
	TablePagination,
	GridProps,
	WithStyles,
	createStyles,
	Theme
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { debounce } from "debounce";
import { search } from "../../utils/helpers";
import { CardListItem, CardListItemProps } from ".";

export interface CardListProps extends WithStyles<typeof styles> {
	cards: Array<
		{
			id: string | number;
			GridProps?: GridProps;
		} & CardListItemProps
	>;
	GridProps?: GridProps;
	showAll?: boolean;
	details?: (paginatedCardList: CardListProps["cards"]) => ReactNode;
}

interface CardListState {
	filter: string;
	page: number;
	count: number;
	rowsPerPageOptions: number[];
	rowsPerPage: number;
}

class CardListBase extends Component<CardListProps, CardListState> {
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

	private searchCardList = (keyword: string) => {
		const { cards } = this.props;
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

	private getPaginatedList = (cards: CardListProps["cards"]) => {
		const { rowsPerPage, page } = this.state;
		return cards.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	};

	render() {
		const { cards, GridProps, classes, showAll, details } = this.props;

		const cardList = [...cards];
		let filteredCardList = cardList;
		let paginatedCardList = filteredCardList;

		if (!showAll) {
			filteredCardList = this.searchCardList(this.state.filter);
			paginatedCardList = this.getPaginatedList(filteredCardList);
		}
		const hasSelectedItem = cardList.some(card => Boolean(card.selected));
		return (
			<div className={classes.root}>
				{details && (
					<Grid item xs={12}>
						{details(paginatedCardList)}
					</Grid>
				)}
				{!showAll && (
					<Grid container justify="space-between" className={classes.options}>
						<Grid item xs={12} md={6}>
							<TextField
								className={classes.textField}
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

						<Grid item xs={12} md={6}>
							<TablePagination
								classes={{
									selectRoot: classes.selectRoot,
									actions: classes.actions
								}}
								labelRowsPerPage={"Cards per page:"}
								rowsPerPage={this.state.rowsPerPage}
								rowsPerPageOptions={this.state.rowsPerPageOptions}
								count={filteredCardList.length}
								page={this.state.page}
								onChangeRowsPerPage={e =>
									this.setState({ rowsPerPage: parseInt(e.target.value) })
								}
								onChangePage={(e, page) => this.setState({ page })}
								component="div"
							/>
						</Grid>
					</Grid>
				)}
				<Grid
					container
					spacing={1}
					{...GridProps}
					className={classNames(classes.cardContainer, {
						[classes.selected]: hasSelectedItem
					})}
				>
					{paginatedCardList.map(({ GridProps, id, ...cardProps }) => (
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							key={id}
							{...GridProps}
							classes={{ root: classes.gridItem }}
						>
							<CardListItem {...cardProps} />
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(1)
		},
		gridItem: { "&&": { overflow: "visible" } },
		cardContainer: {
			transition: theme.transitions.create(["transform"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		selected: {
			transform: "scale(0.9)"
		},
		options: {
			marginBottom: theme.spacing(1)
		},
		textField: {
			[theme.breakpoints.down("md")]: { width: "100%" }
		},
		selectRoot: {
			[theme.breakpoints.down("xs")]: { margin: 0 }
		},
		actions: {
			[theme.breakpoints.down("xs")]: { margin: 0 }
		}
	});

export const CardList = withStyles(styles)(CardListBase);
