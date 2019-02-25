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

import TablePaginationActions from "./TablePaginationActions";

function renderRow(row, className, key) {
	let cells = row.map((cell, index) => {
		let value = "";
		let colSpan = 1;
		if (typeof cell === "object") {
			value = cell.value || "";
			colSpan = cell.colSpan || colSpan;
		} else {
			value = cell || "";
		}
		return (
			<TableCell colSpan={colSpan} className={`${className}__cell`} key={index}>
				{value}
			</TableCell>
		);
	});
	return (
		<TableRow className={className} key={key}>
			{cells}
		</TableRow>
	);
}

function renderHeader(rows) {
	return (
		<TableHead className="table-head">
			{rows.map((header, index) => {
				return renderRow(header, "table-head__row", index);
			})}
		</TableHead>
	);
}

function renderBody(rows, currentPage, rowsPerPage) {
	return (
		<TableBody className="table-body">
			{rows
				.slice(
					currentPage * rowsPerPage,
					currentPage * rowsPerPage + rowsPerPage
				)
				.map((row, index) => {
					return renderRow(row, "table-body__row", index);
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
		<TableFooter className="table-footer">
			<TableRow className="table-footer__row">
				<TablePagination
					className="pagination"
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
	const { data, pagination } = props;
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
			{renderBody(data.body, currentPage, rowsPerPage)}
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
			PropTypes.arrayOf(
				PropTypes.shape({
					value: PropTypes.node.isRequired,
					colSpan: PropTypes.number
				})
			)
		),
		body: PropTypes.arrayOf(
			PropTypes.arrayOf(
				PropTypes.shape({
					value: PropTypes.node.isRequired,
					colSpan: PropTypes.number
				})
			)
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

export default TableWithPagination;
