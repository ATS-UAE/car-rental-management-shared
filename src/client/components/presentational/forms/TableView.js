import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "../display/TableWithPagination";
function TableView({
	tableData,
	open,
	onClose,
	children,
	editable,
	classes,
	filter,
	sort,
	exclude
}) {
	return (
		<Fragment>
			<Table data={tableData} filter={filter} sort={sort} exclude={exclude} />
			{editable && (
				<Dialog open={open} onClose={onClose}>
					<Paper className={classes.paper}>{children}</Paper>
				</Dialog>
			)}
		</Fragment>
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

const styles = theme => ({
	paper: {
		padding: theme.spacing(1) * 3
	}
});

export default withStyles(styles)(TableView);
