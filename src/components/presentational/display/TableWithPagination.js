import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import TablePaginationActions from "./TablePaginationActions";

function search(keyWord, word) {
	let pass = keyWord.split(" ").every(key => new RegExp(key).test(word));

	return Boolean(pass);
}

function renderRow(row, key, options = {}) {
	let cells = row.values.reduce((acc, cell, index) => {
		let value = "";
		let colSpan = 1;
		if (typeof cell === "object") {
			value = cell.value || "";
			colSpan = cell.colSpan || colSpan;
		} else {
			value = cell || "";
		}
		let passFilter = true;
		if (options.filter) {
			let { filter } = options;
			if (filter instanceof Array) {
				passFilter = filter.every(word => search(word, value));
			} else if (filter instanceof String) {
				passFilter = search(filter, value);
			} else if (filter.global || filter.index) {
				passFilter =
					search(filter.global, value) ||
					filter.index.every(word => search(word, value));
			}
		}

		if (options.exclude && !options.exclude.includes(index) && passFilter) {
			acc.push(
				<TableCell colSpan={colSpan} key={index}>
					{value}
				</TableCell>
			);
		}
		return acc;
	}, []);
	let className = "";
	if (options.classes && options.classes.rows && row.onClick) {
		className = options.classes.rows;
	}
	return (
		<TableRow
			className={className}
			key={key}
			onClick={() => row.onClick && row.onClick(row.metadata)}
		>
			{cells}
		</TableRow>
	);
}

function renderHeader(rows, options) {
	return (
		<TableHead>
			{rows.map((header, index) => {
				return renderRow(header, index, options);
			})}
		</TableHead>
	);
}

function renderBody(rows, currentPage, rowsPerPage, options) {
	return (
		<TableBody className="table-body">
			{rows
				.slice(
					currentPage * rowsPerPage,
					currentPage * rowsPerPage + rowsPerPage
				)
				.map((row, index) => {
					return renderRow(row, index, options);
				})}
		</TableBody>
	);
}

function renderFooter(options = {}) {
	const {
		rowsPerPageOptions,
		colSpan,
		count,
		rowsPerPage,
		currentPage,
		SelectProps,
		onChangePage,
		onChangeRowsPerPage
	} = options;
	return (
		<TableFooter>
			<TableRow>
				<TablePagination
					rowsPerPageOptions={rowsPerPageOptions}
					colSpan={colSpan}
					count={count}
					rowsPerPage={rowsPerPage}
					page={currentPage}
					SelectProps={SelectProps}
					onChangePage={onChangePage}
					onChangeRowsPerPage={onChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableRow>
		</TableFooter>
	);
}

function TableWithPagination({
	data,
	pagination,
	classes,
	filter,
	sort,
	exclude
}) {
	const count = data.body.length;
	const { rowsPerPageOptions, colSpan, SelectProps } = pagination;
	const [currentPage, setCurrentPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	function onChangePage(event, page) {
		setCurrentPage(page);
	}

	function onChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className={classes.root}>
			<Table className="table" size="small">
				{renderHeader(data.headers, { sort, exclude })}
				{renderBody(data.body, currentPage, rowsPerPage, {
					classes,
					filter,
					sort,
					exclude
				})}
				{renderFooter({
					rowsPerPageOptions,
					colSpan,
					count,
					rowsPerPage,
					currentPage,
					SelectProps,
					onChangePage,
					onChangeRowsPerPage
				})}
			</Table>
		</div>
	);
}

TableWithPagination.propTypes = {
	data: PropTypes.shape({
		headers: PropTypes.arrayOf(
			PropTypes.shape({
				values: PropTypes.arrayOf(
					PropTypes.shape({
						value: PropTypes.node,
						colSpan: PropTypes.number
					}).isRequired
				),
				showFilter: PropTypes.bool,
				metadata: PropTypes.any,
				onClick: PropTypes.func
			})
		),
		body: PropTypes.arrayOf(
			PropTypes.shape({
				values: PropTypes.arrayOf(
					PropTypes.shape({
						value: PropTypes.node,
						colSpan: PropTypes.number
					}).isRequired
				),
				metadata: PropTypes.any,
				onClick: PropTypes.func
			})
		)
	}),
	showFilter: PropTypes.bool,
	exclude: PropTypes.array,
	filter: PropTypes.oneOfType([
		PropTypes.shape({
			global: PropTypes.string,
			index: PropTypes.arrayOf(PropTypes.string)
		}),
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string
	]),
	pagination: PropTypes.shape({
		rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
		colSpan: PropTypes.number,
		SelectProps: PropTypes.object
	})
};

TableWithPagination.defaultProps = {
	pagination: {
		rowsPerPageOptions: [5, 10, 20, 50, 100]
	},
	exclude: [],
	data: { headers: [], body: [] },
	showFilter: false
};

const styles = {
	rows: {
		"&:hover": {
			cursor: "pointer"
		}
	},
	root: {
		overflowX: "auto"
	}
};

export default withStyles(styles)(TableWithPagination);
