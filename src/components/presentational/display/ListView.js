import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import {
	withStyles,
	Drawer,
	IconButton,
	AppBar,
	Toolbar
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import classNames from "classnames";

function ListView({ classes, list, body, header }) {
	const [open, setOpen] = useState(true);
	return (
		<Paper className={classes.root}>
			<Drawer
				className={classes.drawer}
				SlideProps={{
					classes: {
						root: classes.slide
					}
				}}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				{list}
			</Drawer>
			<div
				className={classNames(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							className={classes.toggleButton}
							onClick={() => setOpen(!open)}
						>
							{open ? <ChevronLeft /> : <ChevronRight />}
						</IconButton>
						{header}
					</Toolbar>
				</AppBar>
				<main className={classes.body}>{body}</main>
			</div>
		</Paper>
	);
}

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex",
		overflowY: "auto",
		height: "100%"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	toggleButton: {
		marginRight: theme.spacing.unit * 3
	},
	body: {
		padding: theme.spacing.unit * 3,
		overflowY: "auto"
	},
	content: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	slide: {
		height: "100%",
		overflowY: "auto",
		position: "static"
	}
});

export default withStyles(styles, { withTheme: true })(ListView);
