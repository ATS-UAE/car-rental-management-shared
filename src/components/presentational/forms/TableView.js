import React from "react";
import PropTypes from "prop-types";
import { Dialog, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "../display/TableWithPagination";
function TableView({
	classes,
	tableData,
	open,
	onClose,
	children,
	editable
}) {
	return (
		<Paper className={classes.paper}>
			<Table
                data={tableData}
			/>
			{editable && (
				<Dialog open={open} onClose={onClose}>
					{children}
				</Dialog>
			)}
		</Paper>
	);
}

TableView.propTypes = {
	onSubmit: PropTypes.func,
	isDialogOpen: PropTypes.bool,
	setIsDialogOpen: PropTypes.func,
	onTableRowClick: PropTypes.func,
	editable: PropTypes.bool
};

TableView.defaultProps = {
	editable: false
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(TableView);
