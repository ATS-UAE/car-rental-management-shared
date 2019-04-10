import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	logo: {
		marginBottom: "-37px",
		cursor: "pointer"
	}
};

function ButtonAppBar(props) {
	const { classes, title, renderActions, onMenuClick, onLogoClick } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<img
						src="/static/images/logo-navigation.png"
						className={classes.logo}
						alt="LeasePlan Logo"
						onClick={onLogoClick}
					/>
					{title && (
						<Typography variant="h6" color="inherit" className={classes.grow}>
							{title}
						</Typography>
					)}
					{renderActions()}
					{onMenuClick && (
						<IconButton
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
							onClick={onMenuClick}
						>
							<MenuIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	renderActions: PropTypes.func,
	onMenuClick: PropTypes.func,
	onLogoClick: PropTypes.func
};

ButtonAppBar.defaultProps = {
	title: "",
	renderActions: () => null
};

export default withStyles(styles)(ButtonAppBar);
