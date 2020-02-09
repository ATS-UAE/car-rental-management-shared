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
	let pass = true;
	if (keyWord && word) {
		pass = Boolean(
			keyWord.split(" ").every(key => new RegExp(key, "i").test(word))
		);
	}
	return pass;
}

function renderRow(row, key, options = {}) {
	let cells = row.values.reduce((acc, cell, index) => {
		let value = "";
		let colSpan = 1;
		if (typeof cell.map === "function") {
			value = cell.map(cell.value);
		} else if (typeof cell === "object") {
			value = cell.value || "";
			colSpan = cell.colSpan || colSpan;
		} else {
			value = cell || "";
		}

		if (options.exclude && !options.exclude.includes(index)) {
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
	const body = rows
		.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
		.map((row, index) => renderRow(row, index, options));
	return <TableBody className="table-body">{body}</TableBody>;
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
	const { rowsPerPageOptions, colSpan, SelectProps } = pagination;
	const [currentPage, setCurrentPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	function onChangePage(event, page) {
		setCurrentPage(page);
	}

	function onChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	let rows = data.body.reduce((acc, row) => {
		let passFilter = row.values.every((cell, index) => {
			let included = true;
			let value = cell.value ? cell.value : cell;

			if (filter) {
				if (filter instanceof String && typeof value === "string") {
					included = search(filter, value);
				} else if (typeof filter === "function") {
					included = filter(value);
				} else if (filter.global || filter.index) {
					if (filter.global) {
						if (typeof filter.global === "function") {
							included = filter.global(value);
						} else if (typeof value === "string") {
							included = search(filter.global, value);
						}
					}

					if (filter.index[index]) {
						if (typeof filter.index[index] === "function") {
							included = filter.index[index](value);
						} else if (typeof value === "string") {
							included = search(filter.index[index], value);
						}
					}
				}
			}

			return included;
		});

		if (passFilter) {
			acc.push(row);
		}

		return acc;
	}, []);

	return (
		<div className={classes.root}>
			<Table className="table" size="small">
				{renderHeader(data.headers, { sort, exclude })}
				{renderBody(rows, currentPage, rowsPerPage, {
					classes,
					filter,
					sort,
					exclude
				})}
				{renderFooter({
					rowsPerPageOptions,
					colSpan,
					count: rows.length,
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

				metadata: PropTypes.any,
				onClick: PropTypes.func
			})
		),
		body: PropTypes.arrayOf(
			PropTypes.shape({
				values: PropTypes.arrayOf(
					PropTypes.shape({
						value: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
						colSpan: PropTypes.number
					}).isRequired
				),
				metadata: PropTypes.any,
				onClick: PropTypes.func
			})
		)
	}),

	exclude: PropTypes.array,
	filter: PropTypes.oneOfType([
		PropTypes.shape({
			global: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
			index: PropTypes.arrayOf(
				PropTypes.oneOfType([PropTypes.string, PropTypes.func])
			)
		}),
		PropTypes.string,

		PropTypes.func
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
	data: { headers: [], body: [] }
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