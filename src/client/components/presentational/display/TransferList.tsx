import React, { Component } from "react";
import {
	Grid,
	List,
	Card,
	CardHeader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Button,
	Divider,
	Theme,
	withStyles,
	createStyles,
	WithStyles
} from "@material-ui/core";

export interface TransferListProps<T = any> {
	items: T[];
	comparator: (a: T, b: T) => boolean;
	right: T[];
	listMapper: (
		item: T
	) => {
		id: string | number;
		primaryLabel: string;
		secondaryLabel?: string;
	};
	onSubmit: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		data: T[]
	) => void;
	onChange: (right: T[]) => void;
	loading?: boolean;
}

interface TransferListState<T> {
	checked: T[];
	left: T[];
}

interface HasId {
	id: number;
}

export default class<T extends HasId> extends Component<TransferListProps<T>> {
	private readonly C = this.wrapperFunc();

	render() {
		return <this.C {...this.props} />;
	}

	private wrapperFunc() {
		type t = new () => TransferList<T>;
		return withStyles(styles)(TransferList as t);
	}
}

class TransferList<T extends HasId> extends Component<
	TransferListProps<T> & WithStyles<typeof styles>,
	TransferListState<T>
> {
	leftChecked: T[] = [];
	rightChecked: T[] = [];

	constructor(props) {
		super(props);

		const { items, right } = props;
		this.state = {
			checked: [],
			left: this.not(items, right)
		};
	}

	componentDidUpdate = prevProps => {
		if (this.props.items !== prevProps.items) {
			this.setState({ left: this.not(this.props.items, this.props.right) });
		}
	};

	not = (a: T[], b: T[]) =>
		a.filter(
			valueA =>
				b.findIndex(valueB => this.props.comparator(valueA, valueB)) === -1
		);

	intersection = (a: T[], b: T[]) =>
		a.filter(
			valueA =>
				b.findIndex(valueB => this.props.comparator(valueA, valueB)) !== -1
		);

	union = (a: T[], b: T[]) => [...a, ...this.not(b, a)];

	handleToggle = (value: T) => () => {
		const { checked } = this.state;
		const currentIndex = checked.findIndex(checked =>
			this.props.comparator(checked, value)
		);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({ checked: newChecked });
	};

	numberOfChecked = (items: T[]) =>
		this.intersection(this.state.checked, items).length;

	handleToggleAll = (items: T[]) => () => {
		const { checked } = this.state;

		if (this.numberOfChecked(items) === items.length) {
			this.setState({ checked: this.not(checked, items) });
		} else {
			this.setState({ checked: this.union(checked, items) });
		}
	};

	handleCheckedRight = () => {
		const { left, checked } = this.state;
		const { right, onChange } = this.props;

		this.setState({ left: this.not(left, this.leftChecked) });
		onChange(right.concat(this.leftChecked));
		this.setState({ checked: this.not(checked, this.leftChecked) });
	};

	handleCheckedLeft = () => {
		const { left, checked } = this.state;
		const { right, onChange } = this.props;

		onChange(this.not(right, this.rightChecked));
		this.setState({ left: left.concat(this.rightChecked) });
		this.setState({ checked: this.not(checked, this.rightChecked) });
	};

	customList = (title: React.ReactNode, items: T[]) => (
		<Card>
			<CardHeader
				className={this.props.classes.cardHeader}
				avatar={
					<Checkbox
						onClick={this.handleToggleAll(items)}
						checked={
							this.numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							this.numberOfChecked(items) !== items.length &&
							this.numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${this.numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List
				className={this.props.classes.list}
				dense
				component="div"
				role="list"
			>
				{items.map(value => {
					const item = this.props.listMapper(value);
					return (
						<ListItem
							key={item.id}
							role="listitem"
							button
							onClick={this.handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={
										this.state.checked.findIndex(checked =>
											this.props.comparator(value, checked)
										) !== -1
									}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": String(item.id) }}
								/>
							</ListItemIcon>
							<ListItemText
								id={String(item.id)}
								primary={item.primaryLabel}
								secondary={item.secondaryLabel}
							/>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);
	render() {
		const { checked, left } = this.state;
		const { classes, onSubmit, right } = this.props;
		this.leftChecked = this.intersection(checked, left);
		this.rightChecked = this.intersection(checked, right);

		return (
			<Grid
				container
				spacing={2}
				justify="center"
				alignItems="center"
				className={classes.root}
			>
				<Grid item>{this.customList("Choices", left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={this.handleCheckedRight}
							disabled={this.leftChecked.length === 0}
							aria-label="move selected right"
						>
							&gt;
						</Button>
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={this.handleCheckedLeft}
							disabled={this.rightChecked.length === 0}
							aria-label="move selected left"
						>
							&lt;
						</Button>
					</Grid>
				</Grid>
				<Grid item>{this.customList("Chosen", right)}</Grid>
				<Button
					color="primary"
					variant="contained"
					size="large"
					disabled={this.props.loading}
					onClick={e => onSubmit(e, right)}
				>
					Done
				</Button>
			</Grid>
		);
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: "auto"
		},
		cardHeader: {
			padding: theme.spacing(1, 2)
		},
		list: {
			width: 200,
			height: 230,
			backgroundColor: theme.palette.background.paper,
			overflow: "auto"
		},
		button: {
			margin: theme.spacing(0.5, 0)
		}
	});
