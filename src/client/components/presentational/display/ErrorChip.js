import React from "react";
import { Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import classnames from "classnames";

function ErrorChip({ label, classes, className }) {
	return <Chip label={label} className={classnames(classes.chip, className)} />;
}

const styles = {
	chip: {
		backgroundColor: red[500],
		color: "white"
	}
};

ErrorChip.propTypes = {
	label: PropTypes.string
};

export default withStyles(styles)(ErrorChip);
