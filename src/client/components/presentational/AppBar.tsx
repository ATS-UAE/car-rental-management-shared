import React, { FC, ReactNode } from "react";
import {
	AppBar as MuiAppBar,
	Toolbar,
	Typography,
	IconButton,
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const styles = (theme: Theme) =>
	createStyles({
		logo: {
			cursor: "pointer",
			padding: "5px",
			...theme.mixins.toolbar
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
	logoSrc: string;
	logoAlt: string;
}

const ButtonAppBar: FC<AppBarProps> = ({
	classes,
	title,
	renderActions,
	onMenuClick,
	onLogoClick,
	logoSrc,
	logoAlt
}) => {
	return (
		<div>
			<MuiAppBar position="static">
				<Toolbar className={classes.toolbar}>
					<div>
						<img
							src={logoSrc}
							className={classes.logo}
							alt={logoAlt}
							onClick={() => onLogoClick && onLogoClick()}
						/>
						{title && (
							<Typography variant="h6" color="inherit">
								{title}
							</Typography>
						)}
					</div>
					<div>
						{renderActions && renderActions()}
						{onMenuClick && (
							<IconButton
								color="inherit"
								aria-label="Menu"
								onClick={onMenuClick}
							>
								<Menu />
							</IconButton>
						)}
					</div>
				</Toolbar>
			</MuiAppBar>
		</div>
	);
};

export const AppBar = withStyles(styles)(ButtonAppBar);
