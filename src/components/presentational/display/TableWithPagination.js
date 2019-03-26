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

function renderRow(row, key, options = {}) {
	let cells = row.values.map((cell, index) => {
		let value = "";
		let colSpan = 1;
		if (typeof cell === "object") {
			value = cell.value || "";
			colSpan = cell.colSpan || colSpan;
		} else {
			value = cell || "";
		}
		return (
			<TableCell colSpan={colSpan} key={index}>
				{value}
			</TableCell>
		);
	});
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

function renderHeader(rows) {
	return (
		<TableHead>
			{rows.map((header, index) => {
				return renderRow(header, index);
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

function TableWithPagination(props) {
	const { data, pagination, classes } = props;
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
		<Table className="table">
			{renderHeader(data.headers)}
			{renderBody(data.body, currentPage, rowsPerPage, {
				classes
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
	);
}

TableWithPagination.propTypes = {
	data: PropTypes.shape({
		headers: PropTypes.arrayOf(
			PropTypes.shape({
				values: PropTypes.arrayOf(
					PropTypes.shape({
						value: PropTypes.string,
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
						value: PropTypes.string,
						colSpan: PropTypes.number
					}).isRequired
				),
				metadata: PropTypes.any,
				onClick: PropTypes.func
			})
		)
	}),
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
	data: { headers: [], body: [] }
};

const styles = {
	rows: {
		"&:hover": {
			cursor: "pointer"
		}
	}
};

export default withStyles(styles)(TableWithPagination);
