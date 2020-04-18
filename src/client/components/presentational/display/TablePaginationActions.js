import React from "react";
import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
	LastPage,
	FirstPage,
	KeyboardArrowRight,
	KeyboardArrowLeft
} from "@material-ui/icons";

function TablePaginationActions(props) {
	function handleFirstPageButtonClick(event) {
		props.onChangePage(event, 0);
	}

	function handleBackButtonClick(event) {
		props.onChangePage(event, props.page - 1);
	}

	function handleNextButtonClick(event) {
		props.onChangePage(event, props.page + 1);
	}

	function handleLastPageButtonClick(event) {
		props.onChangePage(
			event,
			Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
		);
	}

	const { classes, count, page, rowsPerPage } = props;

	return (
		<div className={classes.root}>
			<IconButton
				className="pagination__button pagination__button-first"
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="First Page"
			>
				<FirstPage />
			</IconButton>
			<IconButton
				className="pagination__button pagination__button-prev"
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="Previous Page"
			>
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton
				className="pagination__button pagination__button-next"
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Next Page"
			>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				className="pagination__button pagination__button-last"
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Last Page"
			>
				<LastPage />
			</IconButton>
		</div>
	);
}

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5)
	}
});

export default withStyles(actionsStyles, {
	withTheme: true
})(TablePaginationActions);
