import React, { FC, ReactNode } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	withStyles,
	createStyles,
	WithStyles
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const styles = createStyles({
	logo: {
		marginBottom: "-41px",
		cursor: "pointer"
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between"
	}
});

export interface AppBarProps extends WithStyles<typeof styles> {
	title?: string;
	renderActions?: () => ReactNode;
	onMenuClick?: () => void;
	onLogoClick?: () => void;
}

const ButtonAppBar: FC<AppBarProps> = props => {
	const { classes, title, renderActions, onMenuClick, onLogoClick } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<div>
						<img
							src="/static/images/logo-navigation.png"
							className={classes.logo}
							alt="LeasePlan Logo"
							onClick={() => onLogoClick && onLogoClick()}
						/>
						{title && (
							<Typography variant="h6" color="inherit" className={classes.grow}>
								{title}
							</Typography>
						)}
					</div>
					<div>
						{renderActions && renderActions()}
						{onMenuClick && (
							<IconButton
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
								onClick={onMenuClick}
							>
								<Menu />
							</IconButton>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withStyles(styles)(ButtonAppBar);
